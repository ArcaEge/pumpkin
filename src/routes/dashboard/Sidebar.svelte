<script lang="ts">
	import SidebarButton from './SidebarButton.svelte';
	import { House, PencilRuler, Compass, ShoppingCart, LogOut } from '@lucide/svelte';
	import { page } from '$app/state';

	let { user } = $props();

	let isOnOwnUserPage = $derived(
		page.url.pathname === `/dashboard/users/${user.id}` ||
			page.url.pathname === `/dashboard/users/${user.id}/`
	);
</script>

<div
	class="m-5 flex w-60 flex-col gap-2 border-3 border-dashed border-amber-900 bg-amber-950 p-3 shadow-lg/20"
>
	<SidebarButton icon={House} href="/dashboard" exact>Home</SidebarButton>
	<SidebarButton icon={PencilRuler} href="/dashboard/projects">Projects</SidebarButton>
	<SidebarButton icon={Compass} href="/dashboard/explore">Explore</SidebarButton>
	<SidebarButton icon={ShoppingCart} href="/dashboard/shop">Shop</SidebarButton>
	<div class="grow"></div>
	<a
		href={isOnOwnUserPage ? null : `/dashboard/users/${user.id}`}
		class={`flex h-15 flex-row gap-3 border-2 shadow-xl/3 transition-colors ${isOnOwnUserPage ? 'bg-amber-800 border-amber-700' : 'border-amber-800 bg-amber-900 hover:bg-amber-800 hover:outline-2 hover:outline-amber-100'}`}
	>
		<div class="aspect-square">
			<img src={user.profilePicture} alt="User profile pic" class="aspect-square h-full" />
		</div>
		<div class="flex grow flex-col justify-center">
			<p class="font-medium">
				{user.name}
			</p>
			<p class="text-sm">0 coins</p>
		</div>
	</a>
	<SidebarButton icon={LogOut} href="/auth/logout">Log out</SidebarButton>
</div>
