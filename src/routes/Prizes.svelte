<script lang="ts">
	import prize01 from '$lib/assets/prizes/pedestrian-crossing.jpg';
	import prize02 from '$lib/assets/prizes/london-car.jpg';
	import prize03 from '$lib/assets/prizes/nyc.jpg';

	import ImageCard from "$lib/components/ImageCard.svelte";
</script>

<div class="mt-16 flex flex-col items-center justify-center px-10">
	<h1 class="mb-5 text-center text-3xl font-bold sm:text-4xl">Prizes</h1>
	<p>You get one of these!</p>
	<div class="mt-5 flex flex-col md:flex-row gap-4">
		<ImageCard title="UK Pedestrian" text="Pedestrian crossing light, 1980" imgsrc={prize01} />
		<ImageCard title="London Car" text="Original London traffic light" imgsrc={prize02} />
		<ImageCard title="NYC Car" text="Car stop light, original" imgsrc={prize03} />
	</div>
</div>