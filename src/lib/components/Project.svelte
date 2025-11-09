<script lang="ts">
	import { projectStatuses } from '$lib/utils';
	import { ExternalLink, Lock } from '@lucide/svelte';
	import relativeDate from 'tiny-relative-date';

	interface Props {
		id: number;
		name: string | null;
		description: string | null;
		url: string | null;
		createdAt: Date;
		timeSpent: number;
		status: keyof typeof projectStatuses;
	}

	let { id, name, description, url, createdAt, timeSpent, status }: Props = $props();
</script>

<div class="themed-box relative flex flex-col p-3 shadow-lg/20 transition-all hover:scale-102">
	<a class="absolute inset-0 z-1" href={`/dashboard/projects/${id}`} aria-label="project"></a>
	<h1 class="flex gap-1 text-xl font-semibold">
		<span>{name}</span>
		{#if !(status == 'building' || status == 'rejected')}
			<span
				title={!(
					status == ('building' as keyof typeof projectStatuses) ||
					status == ('rejected' as keyof typeof projectStatuses)
				)
					? 'This project is currently locked as it has been shipped'
					: null}
				class="relative z-2"
			>
				<Lock />
			</span>
		{/if}
	</h1>
	<p class="grow">{description}</p>
	{#if url && url.length > 0}
		<div class="my-2 flex">
			<a class="button sm amber relative z-2" href={url} target="_blank">
				<ExternalLink />
				Link to project
			</a>
		</div>
	{:else}
		<div class="mb-2"></div>
	{/if}
	<div class="flex flex-row gap-4">
		<p class="grow text-sm">
			Created <abbr title={`${createdAt.toUTCString()}`} class="relative z-2">
				{relativeDate(createdAt)}
			</abbr>
			∙ {Math.floor(timeSpent / 60)}h {timeSpent % 60}min
		</p>
		<p class="text-sm">{projectStatuses[status]}</p>
	</div>
</div>
