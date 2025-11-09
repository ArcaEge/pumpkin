<script lang="ts">
	import { SquarePen, ExternalLink, Trash, Ship } from '@lucide/svelte';
	import relativeDate from 'tiny-relative-date';
	import type { PageProps } from './$types';
	import Devlog from './Devlog.svelte';
	import { ALLOWED_IMAGE_TYPES, ALLOWED_MODEL_EXTS, MAX_UPLOAD_SIZE } from './config';

	const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

	let { data, form }: PageProps = $props();
	let sortDropdownValue = $state('descending');
	let sortDevlogsAscending = $derived.by(() => sortDropdownValue == 'ascending');

	let timeSpent = $state(
		form?.fields?.timeSpent?.toString()
			? (parseInt(form?.fields?.timeSpent?.toString()) ?? data.validationConstraints.timeSpent.min)
			: data.validationConstraints.timeSpent.min
	);

	function onchange() {
		timeSpent = clamp(
			timeSpent,
			data.validationConstraints.timeSpent.min,
			data.validationConstraints.timeSpent.currentMax
		);
	}
</script>

<h1 class="mt-5 mb-2 font-hero text-3xl font-medium">{data.project.name}</h1>
<p class="text-sm">
	Created <abbr title={`${data.project.createdAt.toUTCString()}`}>
		{relativeDate(data.project.createdAt)}
	</abbr>
	∙ Updated
	<abbr title={`${new Date(data.project.lastUpdated).toUTCString()}`}>
		{relativeDate(data.project.lastUpdated)}
	</abbr>
	∙ {Math.floor(data.project.timeSpent / 60)}h {data.project.timeSpent % 60}min
</p>
{#if data.project.url && data.project.url.length > 0}
	<div class="my-2 flex">
		<a class="button sm amber" href={data.project.url} target="_blank">
			<ExternalLink />
			Link to project
		</a>
	</div>
{/if}
<p class="mt-6">{data.project.description}</p>

{#if data.project.userId === data.user.id}
	<div class="flex gap-2">
		<a href={`/dashboard/projects/${data.project.id}/edit`} class="button sm amber mt-3">
			<SquarePen />
			Edit
		</a>
		<a href={`/dashboard/projects/${data.project.id}/ship`} class="button sm orange mt-3">
			<Ship />
			Ship
		</a>
		<a href={`/dashboard/projects/${data.project.id}/delete`} class="button sm dark-red mt-3">
			<Trash />
			Delete
		</a>
	</div>

	<h3 class="mt-6 mb-1 text-xl font-semibold">Add entry</h3>
	{#if data.validationConstraints.timeSpent.currentMax >= data.validationConstraints.timeSpent.min}
		<form method="POST" class="flex flex-col gap-3" enctype="multipart/form-data">
			<div class="flex flex-col gap-2">
				<label class="flex flex-col gap-1">
					Time spent (minutes)
					<div class="flex gap-5">
						<div>
							<input
								name="timeSpent"
								type="number"
								bind:value={timeSpent}
								step="1"
								min={data.validationConstraints.timeSpent.min}
								max={data.validationConstraints.timeSpent.currentMax}
								{onchange}
								class="themed-box w-25 ring-amber-900 placeholder:text-amber-900 active:ring-3"
							/>
						</div>
						<input
							name="timeSpent"
							type="range"
							class="grow accent-amber-500"
							bind:value={timeSpent}
							step="1"
							min="0"
							{onchange}
							max={data.validationConstraints.timeSpent.max}
						/>
					</div>
					<p class="text-sm">
						The minimum journal time is {data.validationConstraints.timeSpent.min} minutes, the maximum
						is
						{data.validationConstraints.timeSpent.max ==
						data.validationConstraints.timeSpent.currentMax
							? ''
							: 'currently'}
						{data.validationConstraints.timeSpent.currentMax}
					</p>
				</label>
				<label class="flex flex-col gap-1">
					Description
					<textarea
						name="description"
						placeholder="Describe what you changed"
						class="themed-box ring-amber-900 placeholder:text-amber-900 active:ring-3"
						>{form?.fields?.description ?? ''}</textarea
					>
					{#if form?.invalid_description}
						<p class="mt-1 text-sm">Invalid description, must be between 20 and 1000 characters</p>
					{/if}
				</label>
				<div class="mt-1 flex flex-row gap-2">
					<label class="flex grow flex-col gap-1">
						Image
						<input
							type="file"
							name="image"
							accept={ALLOWED_IMAGE_TYPES.join(', ')}
							class="themed-box p-1 outline-amber-900 focus:outline-1"
						/>
						{#if form?.invalid_image_file}
							<p class="mt-1 text-sm">
								Invalid file, must be a PNG or JPEG file under {MAX_UPLOAD_SIZE / 1024 / 1024} MiB
							</p>
						{:else}
							<p class="mt-1 text-sm">
								Must be a PNG or JPEG file under {MAX_UPLOAD_SIZE / 1024 / 1024} MiB
							</p>
						{/if}
					</label>
					<label class="flex grow flex-col gap-1">
						3D model (optional)
						<input
							type="file"
							name="model"
							accept={ALLOWED_MODEL_EXTS.join(', ')}
							class="themed-box p-1 outline-amber-900 focus:outline-1"
						/>
						{#if form?.invalid_model_file}
							<p class="mt-1 text-sm">
								Invalid file, must be a STL, 3MF or OBJ file under {MAX_UPLOAD_SIZE / 1024 / 1024} MiB
							</p>
						{:else}
							<p class="mt-1 text-sm">
								Must be a STL, 3MF (recommended) or OBJ file under {MAX_UPLOAD_SIZE / 1024 / 1024} MiB
							</p>
						{/if}
					</label>
				</div>
			</div>
			<button type="submit" class="button md amber">Add journal entry!</button>
		</form>
	{:else}
		<p>
			You must work for at least {data.validationConstraints.timeSpent.min -
				data.validationConstraints.timeSpent.currentMax} more minutes to journal! [insert orpheus drawing]
		</p>
	{/if}
{/if}

<div class="mt-6 mb-5 flex flex-col gap-3">
	<div>
		<h2 class="text-2xl font-semibold">Journal entries</h2>
		{#if data.devlogs.length > 0}
			<div class="mt-1.5 flex">
				<select
					bind:value={sortDropdownValue}
					class="themed-box fill-amber-50 text-sm ring-amber-900 placeholder:text-amber-900 active:ring-3"
				>
					<option value="descending">New to old</option>
					<option value="ascending">Old to new</option>
				</select>
			</div>
		{/if}
	</div>

	{#if data.devlogs.length == 0}
		<div>
			No devlogs yet <img
				src="https://emoji.slack-edge.com/T0266FRGM/heavysob/55bf09f6c9d93d08.png"
				alt="heavysob"
				class="inline h-5.5"
			/>
		</div>
	{:else}
		{#each sortDevlogsAscending ? [...data.devlogs].reverse() : data.devlogs as devlog}
			<Devlog
				{devlog}
				projectId={data.project.id}
				showModifyButtons={data.project.userId == data.user.id}
			/>
		{/each}
	{/if}
</div>
