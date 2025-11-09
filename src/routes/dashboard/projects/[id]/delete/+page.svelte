<script lang="ts">
	import type { PageProps } from './$types';
	import { Trash } from '@lucide/svelte';

	let { data }: PageProps = $props();
</script>

<h1 class="mt-5 mb-3 font-hero text-2xl font-medium">Delete project</h1>
<p>Are you sure you want to delete "{data.project.name}"? This is permanent.</p>
<form method="POST" class="flex flex-row gap-2">
	<a href={`/dashboard/projects/${data.project.id}`} class="button sm amber mt-3">Cancel</a>
	<button class="button sm red mt-3">
		<Trash size={20} />
		Delete
	</button>
</form>
