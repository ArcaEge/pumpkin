<script lang="ts">
	import relativeDate from 'tiny-relative-date';
	import { Calendar } from '@lucide/svelte';

	let { data } = $props();
</script>

<div class="flex flex-row gap-10">
	<div class="flex w-1/4 flex-col gap-5">
		<div
			class="flex flex-col items-center gap-2 border-3 border-dashed border-amber-900 bg-amber-950 p-5 shadow-lg/20"
		>
			<img
				src={data.requestedUser.profilePicture}
				alt="User profile pic"
				class="aspect-square h-30 border-3 border-amber-800"
			/>
			<h1 class="text-2xl font-bold">{data.requestedUser.name}</h1>
			<Calendar class="" />
			<div class="items-center text-center">
				<p>
					Joined <abbr title={`${data.requestedUser.createdAt.toUTCString()}`}
						>{relativeDate(data.requestedUser.createdAt)}</abbr
					>
				</p>
				{#if data.requestedUser.lastLoginAt}
					<p>
						Last login <abbr title={`${data.requestedUser.lastLoginAt.toUTCString()}`}>
							{relativeDate(data.requestedUser.lastLoginAt)}
						</abbr>
					</p>
				{/if}
			</div>
		</div>
		<div
			class="flex flex-col items-center gap-2 border-3 border-dashed border-amber-900 bg-amber-950 p-5 shadow-lg/20"
		>
			<h1 class="text-xl font-semibold">Projects</h1>
			<p>
				No projects yet <img
					src="https://emoji.slack-edge.com/T0266FRGM/heavysob/55bf09f6c9d93d08.png"
					alt="heavysob"
					class="inline h-5.5"
				/>
			</p>
		</div>
	</div>
	<div class="mt-5 flex flex-col gap-5">
		<h1 class="font-hero text-2xl font-medium">Activity</h1>
		<div>
            <p>Nothing yet :(</p>
        </div>
	</div>
</div>
