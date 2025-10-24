<script lang="ts">
	import SidebarButton from "./SidebarButton.svelte";

	let { user } = $props();
</script>

<div class="m-5 flex w-60 flex-col gap-2 border-4 border-amber-900 bg-amber-950 p-3 shadow-lg/20">
	<SidebarButton href="/dashboard">Home</SidebarButton>
	<SidebarButton href="/projects">Projects</SidebarButton>
	<SidebarButton href="/explore">Explore</SidebarButton>
	<SidebarButton href="/shop">Shop</SidebarButton>
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
	<a href="/auth/logout" class="flex h-12 items-center justify-center bg-amber-800 hover:bg-amber-900 hover:ring-2 hover:ring-amber-100 transition-colors">Log out</a>
</div>
