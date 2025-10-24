<script lang="ts">
	let {
		text,
		bgcolor = 'bg-amber-600',
		ringcolor = 'ring-amber-50',
		disabled = false,
		...other
	} = $props();
</script>

<a
	{...other}
	class="offset my-1 mb-5 block text-center lg:inline-block {bgcolor} text p-2 transition-colors {disabled
		? 'cursor-not-allowed'
		: `hover:${ringcolor} hover:ring-2`} {other.class ? other.class : ''}"
>
	{text}
</a>
