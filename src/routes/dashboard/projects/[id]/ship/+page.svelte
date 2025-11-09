<script lang="ts">
	import type { PageProps } from './$types';
	import { Ship } from '@lucide/svelte';

	let { data }: PageProps = $props();
</script>

<h1 class="mt-5 mb-3 font-hero text-2xl font-medium">Ship project</h1>
<p>
	Are you sure you want to ship "{data.project.name}"? You won't be able to edit it or journal again
	unless it gets rejected.
</p>
<form method="POST" class="flex flex-row gap-2">
	<a href={`/dashboard/projects/${data.project.id}`} class="button sm amber mt-3">Cancel</a>
	<button class="button sm orange mt-3">
		<Ship />
		Ship
	</button>
</form>
