<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	// Define the form properties
	interface FormData {
		loginSuccess?: boolean;
		incorrect?: boolean;
		registerSuccess?: boolean;
		registerError?: string;
	}

	let { form }: { data: PageData; form: FormData } = $props();
</script>

<h1>PAPERS, PLEASE!</h1>
<p>Nah you're not getting thru TSA, katanas aren't allowed :P</p>

<form method="POST" action="?/login" use:enhance>
	{#if form?.incorrect}
		<p class="error">Wrong email or password!</p>
	{/if}
	<label>
		Email:
		<input type="email" name="email" required />
	</label>
	<label>
		Password:
		<input type="password" name="password" required />
	</label>

	<button type="submit">Login</button>
</form>

<form method="POST" action="?/register" use:enhance>
	<label>
		Username:
		<input type="text" name="username" required />
	</label>
	<label>
		Email:
		<input type="email" name="email" required />
	</label>
	<label>
		Password:
		<input type="password" name="password" required />
	</label>

	<button type="submit">Register</button>
	{#if form?.registerSuccess}
		<p class="success">Registration successful!</p>
	{/if}

	{#if form?.registerError}
		<p class="error">Registration error: {form.registerError}</p>
	{/if}
</form>

<style>
	.error {
		color: red;
	}
</style>
