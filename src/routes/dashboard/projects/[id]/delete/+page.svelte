<script lang="ts">
	import Project from '$lib/components/Project.svelte';
	import type { PageProps } from './$types';
	import { Trash } from '@lucide/svelte';

	let { data }: PageProps = $props();
</script>

<h1 class="mt-5 mb-3 font-hero text-2xl font-medium">Delete project</h1>
<Project
	id={data.project.id}
	name={data.project.name}
	description={data.project.description}
	url={data.project.url}
	timeSpent={data.project.timeSpent}
	createdAt={data.project.createdAt}
	status={data.project.status}
	clickable={false}
/>
<p class="mt-3">Are you sure you want to delete "{data.project.name}"? This is permanent.</p>
<form method="POST" class="flex flex-row gap-2 mt-2">
	<a href={`/dashboard/projects/${data.project.id}`} class="button sm amber">Cancel</a>
	<button class="button sm dark-red">
		<Trash size={20} />
		Delete
	</button>
</form>
