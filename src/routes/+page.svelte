<script lang="ts">
	import leaf from '$lib/assets/leaf.png';

	import Button from '$lib/components/Button.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import Rules from './Rules.svelte';
	import Prizes from './Prizes.svelte';
	import Footer from './Footer.svelte';

	let { data } = $props();
</script>

<a href="https://hackclub.com/">
	<img
		class="transition-transform hover:rotate-6"
		style="
					transform-origin: top left;
					position: absolute;
					top: -5px;
					left: 10px;
					border: 0;
					width: 128px;
					z-index: 999;
				"
		src="https://assets.hackclub.com/flag-orpheus-top.svg"
		alt="Hack Club"
	/>
</a>

<div
	class="mt-40 flex w-full flex-col items-center justify-center px-10 md:mt-24 lg:mt-16 lg:flex-row"
>
	<div>
		<h1 class="font-hero text-5xl sm:text-6xl md:text-7xl">Leaf</h1>
		<p class="my-3 text-xl font-medium">
			You ship: leaf design<br />
			We ship: cool leaf from Hack Club HQ
		</p>
		{#if data.loggedIn}
			<Button text="Go to dashboard" href="/dashboard" />
		{:else}
			<Button text="Login with Slack" href="/auth/slack" />
		{/if}
	</div>
	<img
		src={leaf}
		alt="Leaf CAD model"
		class="h-100 drop-shadow-md transition-all hover:drop-shadow-2xl hover:drop-shadow-amber-600/10 active:hover:drop-shadow-amber-600/20 lg:ml-20"
	/>
</div>

<div class="mt-24 flex flex-col items-center justify-center px-10">
	<h1 class="mb-3 text-center text-3xl font-bold sm:text-4xl">What is this?</h1>
	<div class="w-full max-w-2xl">
		<p class="mt-3 max-w-2xl">
			<strong>Ever wanted to own a cool leaf?</strong> Now, you can do so! All you need to do is spend
			10 hours designing a leaf in CAD and we'll one to you from HQ Vermont, for free.
		</p>
		<p class="mt-3 max-w-2xl">
			Once you submit, you'll be enrolled in the 2nd stage of the YSWS (coming sometime later),
			where you'll genetically modify a tree to produce your exact leaf.
		</p>
	</div>
</div>

<Prizes />

<Rules />

<div class="mt-20 flex flex-col items-center justify-center px-10">
	<h1 class="mb-3 text-center text-2xl font-bold sm:text-4xl">Frequently asked questions</h1>
	<div class="w-full max-w-2xl">
		<Accordion text="Is this free?">
			<p>
				Yes! This program is entirely funded by <a href="https://hackclub.com" class="underline">
					Hack Club
				</a>.
			</p>
		</Accordion>
		<Accordion text="What can I make?">
			<p>Any sort of reasonable autumn leaf design is fine, get creative!</p>
		</Accordion>
		<Accordion text="What are the requirements?">
			<p>
				You must spend at least 10 hours on your design, which must be made in Onshape using
				Onshape-Wakatime.
			</p>
		</Accordion>
		<Accordion text="Where did you get these leaves from?">
			<p>
				We briefly stop cheesing, go outside, collect a few leaves, shove them in an envelope and
				mail them to you.
			</p>
		</Accordion>
	</div>
</div>

<Footer />
