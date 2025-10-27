<script lang="ts">
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<h1 class="mt-5 mb-3 font-hero text-2xl font-medium">Create project</h1>
<form method="POST" class="flex flex-col gap-3">
	<div>
		<label class="flex flex-col gap-1">
			Project name*
			<input
				type="text"
				name="name"
				placeholder="Come up with an interesting name"
				required
				value={form?.fields?.name ?? ''}
				class="border-3 border-dashed border-amber-900 bg-amber-950 ring-amber-900 placeholder:text-amber-900 active:ring-3"
			/>
		</label>
		{#if form?.invalid_name}
			<p>Invalid name, must be between 1 and 80 characters</p>
		{/if}
	</div>
	<div>
		<label class="flex flex-col gap-1">
			Description
			<textarea
				name="description"
				placeholder="A couple sentences to describe your project"
				class="border-3 border-dashed border-amber-900 bg-amber-950 ring-amber-900 placeholder:text-amber-900 active:ring-3"
				>{form?.fields?.description ?? ''}</textarea
			>
		</label>
        {#if form?.invalid_description}
			<p>Invalid description, must be at most 8000 characters</p>
		{/if}
	</div>
	<div>
		<label class="flex flex-col gap-1">
			URL
			<input
				type="text"
				name="url"
				placeholder="A link to your design"
				value={form?.fields?.url ?? ''}
				class="border-3 border-dashed border-amber-900 bg-amber-950 ring-amber-900 placeholder:text-amber-900 active:ring-3"
			/>
		</label>
        {#if form?.invalid_url}
			<p>Invalid URL</p>
		{/if}
	</div>
	<button
		class="mt-3 cursor-pointer bg-amber-800 p-2 outline-amber-50 transition-colors hover:bg-amber-700 hover:outline-3"
		>Create!</button
	>
</form>
