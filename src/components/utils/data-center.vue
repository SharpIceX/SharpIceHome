<template>
	<ClientOnly>
		<p v-if="dataCenter">
			你目前访问于
			<span class="text-nord15">{{ dataCenter }}</span>
			数据中心
		</p>
	</ClientOnly>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import cfDataCentersRaw from 'LufsX/Cloudflare-Data-Center-IATA-Code-list/cloudflare-iata-zh.json';

const dataCenter = ref<string | undefined>(undefined);
if (import.meta.browser) {
	onMounted(async () => {
		// 获取 Cloudflare 提供的 trace 信息
		try {
			const response = await fetch(`${useSiteConfig().url}/cdn-cgi/trace`);
			if (response.headers.get('content-type') === 'text/plain') {
				const text = await response.text();

				// 以每行查找，找到开头为`colo=`的行然后转化为对应的中文名称
				const lines = text.split('\n');
				for (const line of lines) {
					if (line.startsWith('colo=')) {
						const colo = line.slice(5).trim();
						dataCenter.value = (cfDataCentersRaw as Record<string, string>)[colo] || colo;
						break;
					}
				}
			}
		} catch {
			/** 忽略错误 */
		}
	});
}
</script>
