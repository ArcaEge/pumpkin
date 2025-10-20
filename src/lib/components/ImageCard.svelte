<script lang="ts">
	let { title, text, imgsrc, ...other } = $props();
</script>

<div {...other} class="flex flex-col {other.class ? other.class : ''} w-60 h-100 overflow-hidden border-2 bg-amber-800 hover:bg-amber-700 hover:-translate-y-1 transition-all">
	<img src={imgsrc} alt="traffic light" class="h-9/12 object-cover" />
	<div class="flex-1 p-3 shrink">
		<h1 class="text-lg font-semibold">{title}</h1>
		<p class="text-sm">
			{text}
		</p>
	</div>
</div>
