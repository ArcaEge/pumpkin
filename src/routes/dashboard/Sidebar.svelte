<script lang="ts">
	import SidebarButton from './SidebarButton.svelte';
	import { House, PencilRuler, Compass, ShoppingCart, LogOut } from '@lucide/svelte';

	let { user } = $props();
</script>

<div class="m-5 flex w-60 flex-col gap-2 border-3 border-dashed border-amber-900 bg-amber-950 p-3 shadow-lg/20">
	<SidebarButton icon={House} href="/dashboard" exact>Home</SidebarButton>
	<SidebarButton icon={PencilRuler} href="/dashboard/projects">Projects</SidebarButton>
	<SidebarButton icon={Compass} href="/dashboard/explore">Explore</SidebarButton>
	<SidebarButton icon={ShoppingCart} href="/dashboard/shop">Shop</SidebarButton>
	<div class="grow"></div>
	<div class="flex h-15 flex-row gap-3 bg-amber-900 shadow-xl/3 border-2 border-amber-800">
		<div class="aspect-square">
			<img src={user.profilePicture} alt="User profile pic" class="h-full aspect-square" />
		</div>
		<div class="flex grow flex-col justify-center">
			<p>
				{user.name}
			</p>
			<p class="text-sm">0 coins</p>
		</div>
	</div>
	<SidebarButton icon={LogOut} href="/auth/logout">Log out</SidebarButton>
</div>
