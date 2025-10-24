<script lang="ts">
	import { page } from '$app/state';

	let { href, children, exact = false } = $props();

	let isCurrentPage = $derived.by(() => exact ? (page.url.pathname === href || page.url.pathname === href + "/") : page.url.pathname.startsWith(href));
</script>

<a
	{href}
	class={`flex h-12 items-center justify-center shadow-xl/3 bg-amber-800 transition-colors hover:bg-amber-900 hover:ring-2 hover:ring-amber-100 ${isCurrentPage ? 'bg-amber-900' : ''}`}
>
	{@render children?.()}
</a>
