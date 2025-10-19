<script lang="ts">
	import trafficLight from '$lib/assets/traffic-light.png';
	import Button from '$lib/components/Button.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
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
		<Button text="RSVP Now" />
	</div>
	<img src={trafficLight} alt="Traffic light CAD model" class="h-100 drop-shadow-md lg:ml-20" />
</div>

<div class="mt-24 flex flex-col items-center justify-center px-10">
	<h1 class="mb-3 text-3xl font-bold sm:text-4xl">What is this?</h1>
	<div class="w-full max-w-2xl">
		<p class="mt-3 mb-5 max-w-2xl font-medium">
			Odio aut neque maxime doloribus qui id in. Quia libero dolorum distinctio. Similique nemo ad
			sed molestias aperiam velit. Aut accusantium voluptatem vitae est quos in voluptates ipsa. Hic
			fugiat optio ipsum vel. Est nulla omnis ullam. Reiciendis aut hic enim fuga facilis dolorem.
			Dicta pariatur voluptate sit aperiam fugit. Unde eligendi explicabo ex qui officiis minus.
			Dolores doloremque vel officia fugit. Est error aperiam voluptatibus. Modi sed voluptatibus
			nobis doloribus et. Et et doloribus dolor rerum ullam ipsum. Harum possimus quas dolor culpa
			impedit.
		</p>
		<Accordion text="cool accordion">
			<p>
				Unde eligendi explicabo ex qui officiis minus. Dolores doloremque vel officia fugit. Est
				error aperiam voluptatibus. Modi sed voluptatibus nobis doloribus et. Et et doloribus dolor
				rerum ullam ipsum. Harum possimus quas dolor culpa impedit
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
