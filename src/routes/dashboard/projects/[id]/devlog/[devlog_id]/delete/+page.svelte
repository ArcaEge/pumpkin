<script lang="ts">
	import Devlog from '../../../Devlog.svelte';
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
		class="button sm amber"
	>
		Cancel
	</a>
	<button
		class="button sm red"
	>
		<Trash />
		Delete
	</button>
</form>
