<script lang="ts">
	import SidebarButton from "./SidebarButton.svelte";

	let { user } = $props();
</script>

<div class="m-5 flex w-60 flex-col gap-2 border-4 border-amber-900 bg-amber-950 p-3 shadow-lg/20">
	<SidebarButton href="/dashboard" exact>Home</SidebarButton>
	<SidebarButton href="/dashboard/projects">Projects</SidebarButton>
	<SidebarButton href="/dashboard/explore">Explore</SidebarButton>
	<SidebarButton href="/dashboard/shop">Shop</SidebarButton>
	<div class="grow"></div>
	<div class="flex flex-row gap-3 bg-amber-900">
		<p>
			<img src={user.profilePicture} alt="User profile pic" class="h-12" />
		</p>
		<div class="flex items-center justify-center">
			<p>
				{user.name}
			</p>
		</div>
	</div>
	<SidebarButton href="/auth/logout">Log out</SidebarButton>
</div>
