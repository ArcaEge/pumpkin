<script lang="ts">
	let { text, ...other } = $props();
</script>

<a
	href="https://forms.fillout.com/t/bw4iNBzcETus"
	class="offset my-1 mb-5 block text-center lg:inline-block bg-amber-600 p-2 text transition-all hover:ring-amber-50 hover:ring-2 {other.class
		? other.class
		: ''}">{text}</a
>
