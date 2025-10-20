<script lang="ts">
	let { title, text, imgsrc, ...other } = $props();
</script>

<div
	{...other}
	class="flex flex-col {other.class
		? other.class
		: ''} h-100 w-60 overflow-hidden border-2 bg-amber-800 transition-all hover:-translate-y-1 hover:bg-amber-700"
>
	<img src={imgsrc} alt="traffic light" class="h-9/12 object-cover" />
	<div class="flex-1 shrink p-3">
		<h1 class="text-lg font-semibold">{title}</h1>
		<p class="text-sm">
			{text}
		</p>
	</div>
</div>
