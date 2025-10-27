<script lang="ts">
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<h1 class="mt-5 mb-3 font-hero text-2xl font-medium">Create project</h1>
<form method="POST" class="flex flex-col gap-3">
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
	<label class="flex flex-col gap-1">
		Description
		<textarea
			name="description"
			placeholder="A couple sentences to describe your project"
			class="border-3 border-dashed border-amber-900 bg-amber-950 ring-amber-900 placeholder:text-amber-900 active:ring-3"
			>{form?.fields?.description ?? ''}</textarea
		>
	</label>
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
	<button class="bg-amber-800 p-2 mt-3 cursor-pointer hover:outline-3 hover:bg-amber-700 outline-amber-50 transition-colors">Create!</button>
</form>
