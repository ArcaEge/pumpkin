<script lang="ts">
	import { SquarePen, ExternalLink, Trash } from '@lucide/svelte';
	import relativeDate from 'tiny-relative-date';
	import type { PageProps } from './$types';
	import Devlog from '../Devlog.svelte';

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
	∙ {Math.floor(data.project.timeSpent/60)}h {data.project.timeSpent % 60}min
</p>
{#if data.project.url && data.project.url.length > 0}
	<div class="my-2 flex">
		<a
			class="relative z-2 flex flex-row gap-1 bg-amber-800 p-2 text-sm outline-amber-50 transition-colors hover:bg-amber-700 hover:outline-2"
			href={data.project.url}
			target="_blank"
		>
			<ExternalLink size={20} />
			Link to project
		</a>
	</div>
{/if}
<p class="mt-6">{data.project.description}</p>

{#if data.project.userId === data.user.id}
	<div class="flex gap-2">
		<a
			href={`/dashboard/projects/${data.project.id}/edit`}
			class="mt-3 flex cursor-pointer flex-row gap-1 bg-amber-800 p-2 text-sm outline-amber-50 transition-colors hover:bg-amber-700 hover:outline-2"
		>
			<SquarePen size={20} />
			Edit
		</a>
		<a
			href={`/dashboard/projects/${data.project.id}/delete`}
			class="mt-3 flex cursor-pointer flex-row gap-1 bg-red-900 p-2 text-sm outline-red-50 transition-colors hover:bg-red-800 hover:outline-2"
		>
			<Trash size={20} />
			Delete
		</a>
	</div>

	<h3 class="mt-6 mb-1 text-xl font-semibold">Add entry</h3>
	{#if data.validationConstraints.timeSpent.currentMax >= data.validationConstraints.timeSpent.min}
		<form method="POST" class="flex flex-col gap-3">
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
								class="w-25 border-3 border-dashed border-amber-900 bg-amber-950 ring-amber-900 placeholder:text-amber-900 active:ring-3"
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
						class="border-3 border-dashed border-amber-900 bg-amber-950 ring-amber-900 placeholder:text-amber-900 active:ring-3"
						>{form?.fields?.description ?? ''}</textarea
					>
				</label>
				{#if form?.invalid_description}
					<p class="mt-1 text-sm">Invalid description, must be between 20 and 1000 characters</p>
				{/if}
			</div>
			<button
				type="submit"
				class="cursor-pointer bg-amber-800 p-2 outline-amber-50 transition-colors hover:bg-amber-700 hover:outline-3"
			>
				Add journal entry!
			</button>
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
					class="border-3 border-dashed border-amber-900 bg-amber-950 fill-amber-50 text-sm ring-amber-900 placeholder:text-amber-900 active:ring-3"
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
