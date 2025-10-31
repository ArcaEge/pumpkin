<script lang="ts">
	import relativeDate from 'tiny-relative-date';
	import { SquarePen, Trash } from '@lucide/svelte';

	let { devlog, projectId, showModifyButtons } = $props();
</script>

<div
	class="relative flex flex-col border-3 border-dashed border-amber-900 bg-amber-950 p-3 shadow-lg/20 transition-all"
	id={`devlog-${devlog.id}`}
>
	<p class="mb-0.5 text-sm opacity-90">
		<abbr title={`${devlog.createdAt.toUTCString()}`}>
			{relativeDate(devlog.createdAt)}
		</abbr>
		∙ {devlog.timeSpent} minutes
	</p>
	<p>
		{devlog.description}
	</p>
	{#if showModifyButtons}
		<div class="mt-1 flex flex-row gap-1">
			<a
				href={`/dashboard/projects/${projectId}/devlog/${devlog.id}/edit`}
				class="flex cursor-pointer flex-row gap-1 bg-amber-800 p-1.5 text-xs outline-amber-50 transition-colors hover:bg-amber-700 hover:outline-2"
			>
				<SquarePen size={16} />
				Edit
			</a>
			<a
				href={`/dashboard/projects/${projectId}/devlog/${devlog.id}/delete`}
				class="flex cursor-pointer flex-row gap-1 bg-red-900 p-1.5 text-xs outline-red-50 transition-colors hover:bg-red-800 hover:outline-2"
			>
				<Trash size={16} />
				Delete
			</a>
		</div>
	{/if}
</div>
