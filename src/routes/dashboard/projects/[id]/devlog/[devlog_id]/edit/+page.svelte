<script lang="ts">
	import Devlog from '../../../Devlog.svelte';
	import type { PageProps } from './$types';

	let { data, form, params }: PageProps = $props();
	let description = $state(form?.fields?.description ?? data.devlog.description);
</script>

<h1 class="mt-5 mb-3 font-hero text-2xl font-medium">Edit devlog</h1>
<Devlog
	devlog={{ ...data.devlog, description: description }}
	showModifyButtons={false}
	projectId={params.id}
/>
<form method="POST" class="mt-3 flex flex-col gap-3">
	<div class="flex flex-col gap-2">
		<label class="flex flex-col gap-1">
			Description
			<textarea
				name="description"
				placeholder="Describe what you changed"
				bind:value={description}
				class="themed-box ring-amber-900 placeholder:text-amber-900 active:ring-3"
				>{form?.fields?.description ?? data.devlog.description}</textarea
			>
		</label>
		{#if form?.invalid_description}
			<p class="mt-1 text-sm">Invalid description, must be between 20 and 1000 characters</p>
		{/if}
	</div>
	<button type="submit" class="button md amber">Update journal entry</button>
</form>
