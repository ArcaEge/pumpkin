<script lang="ts">
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<h1 class="mt-5 mb-3 font-hero text-2xl font-medium">Edit project</h1>
<form method="POST" class="flex flex-col gap-3">
	<div>
		<label class="flex flex-col gap-1">
			Project name*
			<input
				type="text"
				name="name"
				placeholder="Come up with an interesting name"
				required
				value={form?.fields?.name ?? data.project.name}
				class="themed-box ring-amber-900 placeholder:text-amber-900 active:ring-3"
			/>
		</label>
		{#if form?.invalid_name}
			<p class="text-sm">Invalid name, must be between 1 and 80 characters</p>
		{/if}
	</div>
	<div>
		<label class="flex flex-col gap-1">
			Description
			<textarea
				name="description"
				placeholder="A couple sentences to describe your project"
				class="themed-box ring-amber-900 placeholder:text-amber-900 active:ring-3"
				>{form?.fields?.description ?? data.project.description}</textarea
			>
		</label>
		{#if form?.invalid_description}
			<p class="text-sm">Invalid description, must be at most 1000 characters</p>
		{/if}
	</div>
	<div>
		<label class="flex flex-col gap-1">
			URL
			<input
				type="text"
				name="url"
				placeholder="A link to your design"
				value={form?.fields?.url ?? data.project.url}
				class="themed-box ring-amber-900 placeholder:text-amber-900 active:ring-3"
			/>
		</label>
		{#if form?.invalid_url}
			<p class="text-sm">Invalid URL</p>
		{/if}
	</div>
	<button
		type="submit"
		class="mt-3 button md amber"
	>
		Update project
	</button>
</form>
