<template>
	<section class="blog-content">
		<MDCRenderer :body="render.body" />
	</section>
</template>

<script lang="ts" setup>
import { parseMarkdown } from '@nuxtjs/mdc/runtime';

defineOptions({ name: 'BlogContent' });

const { blogContent } = defineProps<{ blogContent: string }>();
const render = await parseMarkdown(blogContent);
</script>
