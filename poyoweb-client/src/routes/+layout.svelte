<script lang="ts">
	let { children } = $props();
</script>
<h1>The PoyoWeb!</h1>
<nav>
	<a href="/">home</a>
	<a href="/auth">auth</a>
</nav>

{@render children()}