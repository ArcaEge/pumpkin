<script lang="ts">
	import Button from "$lib/components/Button.svelte";


</script>

<div class="flex h-full flex-col">
    <div class="flex flex-row mt-5">
        <h1 class="font-hero text-3xl font-medium grow">Projects</h1>
        <a href="/dashboard/projects/create" class="h-full flex items-center px-3 bg-amber-900 transition-colors hover:bg-amber-800 hover:ring-2 ring-amber-50">Create project</a>
    </div>
	<div class="flex grow items-center justify-center">
		<div>
			<p class="border-3 border-dashed border-amber-900 bg-amber-950 p-3 shadow-lg/20">
				No projects yet <img
					src="https://emoji.slack-edge.com/T0266FRGM/heavysob/55bf09f6c9d93d08.png"
					alt="heavysob"
					class="inline h-5.5"
				/>
			</p>
		</div>
	</div>
</div>
