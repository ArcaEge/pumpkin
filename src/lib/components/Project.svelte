<script lang="ts">
	import { ExternalLink } from '@lucide/svelte';
	import relativeDate from 'tiny-relative-date';

	let { id, name, description, url, createdAt } = $props();
</script>

<div
	class="relative border-3 border-dashed border-amber-900 bg-amber-950 p-3 shadow-lg/20 transition-all hover:scale-102"
>
	<a class="absolute inset-0 z-1" href={`/dashboard/projects/${id}`} aria-label="project"></a>
	<h1 class="text-xl font-semibold">{name}</h1>
	<p>{description}</p>
	{#if url && url.length > 0}
		<div class="my-2 flex">
			<a
				class="relative z-2 flex flex-row gap-1 bg-amber-800 p-2 text-sm outline-amber-50 transition-colors hover:bg-amber-700 hover:outline-2"
				href={url}
				target="_blank"
			>
				<ExternalLink size={20} />
				Link to project
			</a>
		</div>
	{:else}
		<div class="mb-2"></div>
	{/if}
	<p class="text-sm">
		Created <abbr title={`${createdAt.toUTCString()}`} class="relative z-2">
			{relativeDate(createdAt)}
		</abbr>
	</p>
</div>
