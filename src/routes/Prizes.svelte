<script lang="ts">
	import prize01 from '$lib/assets/prizes/pedestrian-crossing.jpg';
	import prize02 from '$lib/assets/prizes/nyc.jpg';
	import prize03 from '$lib/assets/prizes/london-car.jpg';

	import ImageCard from '$lib/components/ImageCard.svelte';
</script>

<div class="mt-16 flex flex-col items-center justify-center px-10">
	<h1 class="mb-5 text-center text-3xl font-bold sm:text-4xl">Prizes</h1>
	<p>You'll get one of these!</p>
	<div class="mt-5 flex flex-col gap-4 md:flex-row">
		<ImageCard
			title="UK Pedestrian Light"
			text="Pedestrian crossing light, 1980 ∙ 10 hours"
			imgsrc={prize01}
		/>
		<ImageCard
			title="NYC Traffic Light"
			text="Car stop light, original ∙ 15 hours"
			imgsrc={prize02}
		/>
		<ImageCard
			title="London Traffic Light"
			text="The legendary original London traffic light ∙ 20 hours"
			imgsrc={prize03}
		/>
	</div>
</div>
