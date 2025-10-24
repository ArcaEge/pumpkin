<script lang="ts">
	import { page } from '$app/state';

	let { href, children } = $props();

	let isCurrentPage = $derived.by(() => page.url.pathname.startsWith(href));
</script>

<a
	{href}
	class={`flex h-12 items-center justify-center bg-amber-800 transition-colors hover:bg-amber-900 hover:ring-2 hover:ring-amber-100 ${isCurrentPage ? 'bg-amber-900' : ''}`}
>
	{@render children?.()}
</a>
