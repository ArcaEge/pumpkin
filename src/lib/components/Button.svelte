<script lang="ts">
	let { text, ...other } = $props();
</script>

<a
	href="https://forms.fillout.com/t/bw4iNBzcETus"
	class="offset my-1 mb-5 block text-center lg:inline-block border-2 bg-amber-600 p-2 transition-all not-hover:border-transparent hover:border-amber-50 {other.class
		? other.class
		: ''}">{text}</a
>
