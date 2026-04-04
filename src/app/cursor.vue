<template>
	<div v-show="isEnabled" class="cursor-container-raw">
		<div ref="ringRef" class="cursor-ring-raw"></div>
		<div ref="dotRef" class="cursor-dot-raw"></div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

defineOptions({ name: 'AppCursor' });

const isEnabled = ref(false);
const dotRef = ref<HTMLElement | null>(null);
const ringRef = ref<HTMLElement | null>(null);

let moveDotX: gsap.QuickToFunc, moveDotY: gsap.QuickToFunc;
let moveRingX: gsap.QuickToFunc, moveRingY: gsap.QuickToFunc;

let shown = false;
let firstPos = true;

const INTERACT_SELECTOR = 'a, button, .interactive, input, [role="button"]';

/** 光标移动 */
const onMove = (e: PointerEvent) => {
	const { clientX: x, clientY: y } = e;

	// 第一次进入或重新进入页面时
	if (firstPos) {
		firstPos = false;
		gsap.set([dotRef.value, ringRef.value], { x, y });
	}

	// 如果处于隐藏状态，则改为显示
	if (!shown) {
		shown = true;
		gsap.to([dotRef.value, ringRef.value], { opacity: 1, duration: 0.2, overwrite: 'auto' });
	}

	moveDotX(x);
	moveDotY(y);
	moveRingX(x);
	moveRingY(y);
};

/** 光标悬停在交互元素上 */
const onOver = (e: PointerEvent) => {
	if ((e.target as HTMLElement | null)?.closest(INTERACT_SELECTOR)) {
		gsap.to(ringRef.value, {
			scale: 1.8,
			duration: 0.3,
			overwrite: 'auto',
			ease: 'back.out(1.7)',
			borderColor: 'oklch(0.78 0.16 245 / 0.6)',
			backgroundColor: 'oklch(0.78 0.16 245 / 0.1)',
		});
		gsap.to(dotRef.value, { opacity: 0.4, scale: 0.8, duration: 0.2, overwrite: 'auto' });
	}
};

/** 光标离开交互元素 */
const onOut = (e: PointerEvent) => {
	if ((e.target as HTMLElement | null)?.closest(INTERACT_SELECTOR)) {
		gsap.to(ringRef.value, {
			scale: 1,
			duration: 0.3,
			overwrite: 'auto',
			ease: 'power2.out',
			backgroundColor: 'transparent',
			borderColor: 'oklch(0.78 0.16 245 / 0.3)',
		});
		gsap.to(dotRef.value, { opacity: 1, scale: 1, duration: 0.2, overwrite: 'auto' });
	}
};

/** 光标按下 */
const onDown = (e: PointerEvent) => {
	const ripple = document.createElement('div');
	ripple.className = 'cursor-ripple-raw';
	document.body.appendChild(ripple);

	gsap.fromTo(
		ripple,
		{ x: e.clientX, y: e.clientY, xPercent: -50, yPercent: -50, scale: 0.5, opacity: 1 },
		{ scale: 4, opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: () => ripple.remove() },
	);
	gsap.to(dotRef.value, { scale: 0.6, duration: 0.1, overwrite: 'auto' });
};

/** 光标抬起 */
const onUp = () => {
	gsap.to(dotRef.value, { scale: 1, duration: 0.2, overwrite: 'auto' });
};

/** 光标离开页面视口或失焦 */
const onLeave = () => {
	shown = false;
	firstPos = true;
	gsap.to([dotRef.value, ringRef.value], { opacity: 0, duration: 0.3, overwrite: 'auto' });
};

onMounted(() => {
	// 触控设备或开启了“减少动态效果”则直接禁用
	if (matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const dot = dotRef.value;
	const ring = ringRef.value;
	if (!dot || !ring) return;

	isEnabled.value = true;

	// 初始状态
	gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

	// 初始化 QuickTo
	moveDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
	moveDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
	moveRingX = gsap.quickTo(ring, 'x', { duration: 0.25, ease: 'expo.out' });
	moveRingY = gsap.quickTo(ring, 'y', { duration: 0.25, ease: 'expo.out' });

	window.addEventListener('pointermove', onMove, { passive: true });
	window.addEventListener('pointerover', onOver, { passive: true });
	window.addEventListener('pointerout', onOut, { passive: true });
	window.addEventListener('pointerdown', onDown, { passive: true });
	window.addEventListener('pointerup', onUp, { passive: true });
	document.documentElement.addEventListener('pointerleave', onLeave);
	window.addEventListener('blur', onLeave);
});

onUnmounted(() => {
	window.removeEventListener('pointermove', onMove);
	window.removeEventListener('pointerover', onOver);
	window.removeEventListener('pointerout', onOut);
	window.removeEventListener('pointerdown', onDown);
	window.removeEventListener('pointerup', onUp);
	document.documentElement.removeEventListener('pointerleave', onLeave);
	window.removeEventListener('blur', onLeave);
});
</script>

<style lang="less" scoped>
@import (reference) '~/styles/color.less';

.cursor-container-raw {
	inset: 0;
	width: 0;
	height: 0;
	opacity: 0.8;
	position: fixed;
	z-index: 999999;
	pointer-events: none;

	.cursor-dot-raw,
	.cursor-ring-raw {
		position: absolute;
		border-radius: 50%;
		transition: background-color 0.3s ease;

		will-change: transform, opacity;
	}

	.cursor-dot-raw {
		z-index: 2;
		width: 8px;
		height: 8px;
		background-color: @fantasy-accent;
		box-shadow:
			0 0 10px @fantasy-accent,
			0 0 20px color-mix(in oklch, @fantasy-accent, transparent 50%);
	}

	.cursor-ring-raw {
		z-index: 1;
		width: 36px;
		height: 36px;
		mix-blend-mode: screen;
		background-color: transparent;
		border: 1.5px solid oklch(0.78 0.16 245 / 0.3);
		box-shadow: inset 0 0 8px oklch(0.78 0.16 245 / 0.1);
		transition:
			border-color 0.3s ease,
			background-color 0.3s ease;
	}
}
</style>

<style lang="less">
@import (reference) '~/styles/color.less';

.cursor-ripple-raw {
	top: 0;
	left: 0;
	width: 20px;
	height: 20px;
	position: fixed;
	z-index: 999998;
	border-radius: 50%;
	pointer-events: none;
	mix-blend-mode: plus-lighter;
	box-shadow: @fantasy-glow-line;
	border: 1px solid @fantasy-glow-color;
	border: 1px solid color-mix(in oklch, @fantasy-accent, transparent 70%);

	will-change: transform, opacity;
}
</style>
