<script lang="ts">
	import prize01 from '$lib/assets/prizes/canada.jpg';
	import prize02 from '$lib/assets/prizes/canadaplusplus.jpg';
	import prize03 from '$lib/assets/prizes/mini-tree.jpg';

	import ImageCard from '$lib/components/ImageCard.svelte';
</script>

<div class="mt-16 flex flex-col items-center justify-center px-10">
	<h1 class="mb-5 text-center text-3xl font-bold sm:text-4xl">Prizes</h1>
	<p>You'll get a couple of these leaves!</p>
	<div class="mt-5 flex flex-col gap-4 md:flex-row">
		<ImageCard
			title="Canada!"
			text="Common Canada flag-looking leaf ∙ 10 hours"
			imgsrc={prize01}
		/>
		<ImageCard
			title="Canada++"
			text="Like the Canada one but with more points ∙ 15 hours"
			imgsrc={prize02}
		/>
		<ImageCard
			title="Mini tree"
			text="Not sure how else to describe it... ∙ 20 hours"
			imgsrc={prize03}
		/>
	</div>
</div>
