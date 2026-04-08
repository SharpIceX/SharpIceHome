<template>
	<div ref="root" class="code-container">
		<div class="code-header">
			<p v-if="filename" class="code-filename">{{ filename }}</p>
			<p class="code-lang">{{ language }}</p>
		</div>

		<button
			type="button"
			class="copy-btn"
			:class="{ 'is-success': copied }"
			:aria-label="copied ? '已复制代码' : '复制代码'"
			@click="handleCopy">
			{{ copied ? '已复制' : '复制' }}
		</button>

		<pre :class="$props.class" tabindex="0" :aria-label="`${language} 代码块`"><slot /></pre>
	</div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'BlogContentPre' });

defineProps({
	code: { type: String, default: '' },
	language: { type: String, default: '纯文本' },
	filename: { type: String, default: null },
	highlights: { type: Array as () => number[], default: () => [] },
	meta: { type: String, default: null },
	class: { type: String, default: null },
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

<style lang="less" src="./pre.less" scoped></style>
