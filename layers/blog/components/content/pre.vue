<template>
	<div ref="root" class="code-container">
		<div class="code-header">
			<p v-if="filename" class="code-filename">{{ filename }}</p>
			<p class="code-lang">{{ language || '纯文本' }}</p>
		</div>

		<button
			type="button"
			class="copy-btn"
			:class="{ 'is-success': copied }"
			:aria-label="copied ? '已复制代码' : '复制代码'"
			@click="handleCopy">
			{{ copied ? '已复制' : '复制' }}
		</button>

		<pre :class="$props.class" tabindex="0" :aria-label="`${language} 代码块`">
            <slot />
        </pre>
	</div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'BlogContentPre' });

defineProps({
	code: {
		type: String,
		default: '',
	},
	language: {
		type: String,
		default: null,
	},
	filename: {
		type: String,
		default: null,
	},
	highlights: {
		type: Array as () => number[],
		default: () => [],
	},
	meta: {
		type: String,
		default: null,
	},
	class: {
		type: String,
		default: null,
	},
});

const root = ref<HTMLElement>();
const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

const handleCopy = async () => {
	const codeEl = root.value?.querySelector('code');
	const text = codeEl?.textContent ?? '';

	if (!text || copied.value) return;

	try {
		await navigator.clipboard.writeText(text);
		copied.value = true;

		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			copied.value = false;
			timer = null;
		}, 2000);
	} catch (error) {
		console.error('复制失败:', error);
	}
};

onScopeDispose(() => {
	if (timer) clearTimeout(timer);
});
</script>

<style lang="less" scoped>
@import (reference) '~/styles/color.less';

.code-container {
	display: block;
	position: relative;

	.code-header {
		display: flex;
		font-size: 1.3rem;
		align-items: center;
		padding: 0.5rem 1.25rem;
		justify-content: space-between;
		background-color: @fantasy-bg-tertiary;
		border-radius: 16px 16px 0px 0px / 14px 14px 0px 0px;

		.code-filename {
			margin: 0;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.code-lang {
			margin: 0;
			margin-left: auto;
			text-align: right;
			font-weight: bold;
		}

		// # 小屏幕
		@media (max-width: 1024px) {
			border-radius: 12px 12px 0px 0px / 10px 10px 0px 0px;
		}
	}

	.copy-btn {
		top: 45px;
		z-index: 1;
		right: 10px;
		opacity: 0.6;
		font-size: 12px;
		cursor: pointer;
		padding: 6px 12px;
		user-select: none;
		border-radius: 6px;
		position: absolute;
		backdrop-filter: blur(8px);
		color: @fantasy-text-muted;
		border: 1px solid @fantasy-line-dim;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		background-color: oklch(from @fantasy-bg-tertiary l c h / 70%);

		&:hover,
		&:focus-visible {
			opacity: 1;
			outline: none;
			color: @fantasy-text;
			border-color: @fantasy-accent;
			box-shadow: @fantasy-glow-line;
			background-color: @fantasy-bg-tertiary;
		}

		// 触摸屏（移动端）
		@media (pointer: coarse) {
			opacity: 0.8;
			background-color: @fantasy-bg-tertiary;
		}

		&:active {
			transform: scale(0.92);
			background-color: @fantasy-accent-active;
		}

		&.is-success {
			opacity: 1 !important;
			color: @fantasy-accent-soft;
			text-shadow: @fantasy-glow-text;
			border-color: @fantasy-accent-soft;
			background-color: oklch(from @fantasy-accent-soft l c h / 15%);
		}
	}

	&:hover .copy-btn {
		opacity: 0.9;
	}
}
</style>
