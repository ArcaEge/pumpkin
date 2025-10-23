<script lang="ts">
	let { user } = $props();
</script>

<div class="m-5 p-5 w-60 bg-amber-950 border-amber-900 border-4 shadow-lg/20">
	<div class="flex flex-col gap-1">
		<div>
			{user.name}
		</div>
		<div>
			<a href="/auth/logout">Logout</a>
		</div>
	</div>
</div>
