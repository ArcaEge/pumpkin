<script lang="ts">
	import trafficLight from '$lib/assets/traffic-light.png';
	import Button from '$lib/components/Button.svelte';
</script>

<div
	class="mt-40 flex w-full flex-col items-center justify-center px-10 md:mt-24 lg:mt-16 lg:flex-row"
>
	<div>
		<h1 class="font-hero text-5xl sm:text-6xl md:text-7xl">Traffic</h1>
		<p class="mt-3 text-xl font-medium mb-5">
			You ship: traffic light design<br />
			We ship: cool traffic light
		</p>
		<Button text="RSVP Now!" />
		
	</div>
	<img src={trafficLight} alt="Traffic light CAD model" class="h-100 lg:ml-20" />
</div>

<div
	class="mt-24 flex w-full flex-col items-center justify-center px-10 lg:flex-row"
>
	<div>
		<h1 class="font-bold text-3xl sm:text-4xl md:text-5xl">What is this?</h1>
		<p class="mt-3 text-xl font-medium mb-5">
			cool ysws
		</p>
	</div>
</div>