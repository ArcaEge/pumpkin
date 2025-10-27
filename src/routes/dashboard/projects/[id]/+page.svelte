<script lang="ts">
	import { ExternalLink, Trash } from '@lucide/svelte';
	import relativeDate from 'tiny-relative-date';

	let { data } = $props();
</script>

<h1 class="mt-5 mb-2 font-hero text-3xl font-medium">{data.project.name}</h1>
<p class="text-sm">
	Created <abbr title={`${data.project.createdAt.toUTCString()}`}>
		{relativeDate(data.project.createdAt)}
	</abbr>
</p>
<div class="my-2 flex">
	<a
		class="relative z-2 flex flex-row gap-1 bg-amber-800 p-2 text-sm outline-amber-50 transition-colors hover:bg-amber-700 hover:outline-2"
		href={data.project.url}
		target="_blank"
	>
		<ExternalLink size={20} />
		Link to project
	</a>
</div>
<p class="mt-1">{data.project.description}</p>

{#if data.project.userId === data.user.id}
	<div class="flex">
		<a
			href={`/dashboard/projects/${data.project.id}/delete`}
			class="mt-3 text-sm flex cursor-pointer flex-row gap-1 bg-red-900 p-2 outline-red-50 transition-colors hover:bg-red-800 hover:outline-2"
		>
			<Trash size={20} />
			Delete
		</a>
	</div>
{/if}
