<script lang="ts">
	import prize01 from '$lib/assets/prizes/pumpkin-small.jpg';
	import prize02 from '$lib/assets/prizes/pumpkin-plastic.jpg';
	import prize03 from '$lib/assets/prizes/pumpkin-mystery.jpg';

	import ImageCard from '$lib/components/ImageCard.svelte';
</script>

<div class="mt-16 flex flex-col items-center justify-center px-10">
	<h1 class="mb-5 text-center text-3xl font-bold sm:text-4xl">Prizes</h1>
	<p>You'll get one of these pumpkins!</p>
	<div class="mt-5 flex flex-col gap-4 md:flex-row">
		<ImageCard
			title="Small one"
			text="Your typical pumpkin but it's pretty small ∙ 10 hours"
			imgsrc={prize01}
		/>
		<ImageCard
			title="Plastic"
			text="Reusable! Doesn't taste as nice though... ∙ 15 hours"
			imgsrc={prize02}
		/>
		<ImageCard
			title="Mystery!"
			text="It's a mystery!! ∙ 20 hours"
			imgsrc={prize03}
		/>
	</div>
</div>
