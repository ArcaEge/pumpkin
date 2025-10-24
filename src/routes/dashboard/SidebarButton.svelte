<script lang="ts">
	import { page } from '$app/state';

	let { href, children, exact = false, icon = null } = $props();

	let isCurrentPage = $derived.by(() =>
		exact
			? page.url.pathname === href || page.url.pathname === href + '/'
			: page.url.pathname.startsWith(href)
	);
</script>

<a
	href={isCurrentPage ? null : href}
	class={`flex gap-1.5 h-12 items-center justify-center shadow-xl/3 transition-colors hover:bg-amber-700 hover:outline-amber-100 ${isCurrentPage ? 'bg-amber-700' : 'bg-amber-800 hover:outline-2'}`}
>
	{#if icon}
		{@const Icon = icon}
		<div>
			<Icon />
		</div>
	{/if}
	<div>
		{@render children?.()}
	</div>
</a>
