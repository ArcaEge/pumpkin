<script lang="ts">
	import trafficLight from '$lib/assets/traffic-light.png';

	import Button from '$lib/components/Button.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import Rules from './Rules.svelte';
	import Prizes from './Prizes.svelte';
</script>

<div
	class="mt-40 flex w-full flex-col items-center justify-center px-10 md:mt-24 lg:mt-16 lg:flex-row"
>
	<div>
		<h1 class="font-hero text-5xl sm:text-6xl md:text-7xl">Traffic</h1>
		<p class="my-3 text-xl font-medium">
			You ship: traffic light design<br />
			We ship: cool traffic light
		</p>
		<Button text="RSVP Now" href="#" />
		<Button text="Submit" bgcolor="bg-amber-800" disabled />
		<p>(coming soon)</p>
	</div>
	<img
		src={trafficLight}
		alt="Traffic light CAD model"
		class="h-100 drop-shadow-md transition-all hover:drop-shadow-2xl hover:drop-shadow-amber-600/10 active:hover:drop-shadow-amber-600/20 lg:ml-20"
	/>
</div>

<div class="mt-24 flex flex-col items-center justify-center px-10">
	<h1 class="mb-3 text-center text-3xl font-bold sm:text-4xl">What is this?</h1>
	<div class="w-full max-w-2xl">
		<p class="mt-3 max-w-2xl">
			<strong>Ever wanted to own a traffic light?</strong> Now, you can do so! All you need to do is
			spend 10 hours designing a traffic light in CAD and we'll send it to you, for free.
		</p>
		<p class="mt-3 max-w-2xl">
			Once you submit, you'll be enrolled in the 2nd stage of the YSWS (coming sometime later),
			where you'll design a control board for your traffic light using KiCAD.
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
		<Accordion text="cool accordion part 2">
			<p>
				Unde eligendi explicabo ex qui officiis minus. Dolores doloremque vel officia fugit. Est
				error aperiam voluptatibus. Modi sed voluptatibus nobis doloribus et. Et et doloribus dolor
				rerum ullam ipsum. Harum possimus quas dolor culpa impedit
			</p>
		</Accordion>
	</div>
</div>
