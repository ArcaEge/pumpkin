<script lang="ts">
	import Sidebar from './Sidebar.svelte';
	let { children, data } = $props();
</script>

<div class="box-border flex h-[100svh] flex-row">
	<Sidebar user={data.user} />
	<div class="grow overflow-auto">
		{@render children?.()}
	</div>
</div>
