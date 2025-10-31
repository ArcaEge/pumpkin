<script lang="ts">
	import Devlog from '../../../../Devlog.svelte';
	import type { PageProps } from './$types';
	import { Trash } from '@lucide/svelte';

	let { data, params }: PageProps = $props();
</script>

<h1 class="mt-5 mb-3 font-hero text-2xl font-medium">Delete devlog</h1>
<Devlog devlog={data.devlog} showModifyButtons={false} projectId={params.id} />
<p class="mt-3">Are you sure you want to delete this devlog? You can't undo this action.</p>
<form method="POST" class="flex flex-row gap-2 mt-2">
	<a
		href={`/dashboard/projects/${data.devlog.id}`}
		class="flex cursor-pointer flex-row gap-1 bg-amber-800 p-2 text-sm outline-amber-50 transition-colors hover:bg-amber-700 hover:outline-2"
	>
		Cancel
	</a>
	<button
		class="flex cursor-pointer flex-row gap-1 bg-red-900 p-2 text-sm outline-red-50 transition-colors hover:bg-red-800 hover:outline-2"
	>
		<Trash size={20} />
		Delete
	</button>
</form>
