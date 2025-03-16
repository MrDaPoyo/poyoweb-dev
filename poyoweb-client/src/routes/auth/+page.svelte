<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	// Define the form properties
	interface FormData {
		loginSuccess?: boolean;
		incorrect?: boolean;
		registerSuccess?: boolean;
		registerError?: string;
		redirect?: string;
	}

	interface UserData {
		id: number;
		name: string;
		email: string;
	}

	let { form, user }: { data: PageData; form: FormData, user: UserData } = $props();
</script>

<h1>PAPERS, PLEASE!</h1>
<p>Nah you're not getting thru TSA, katanas aren't allowed :P</p>

{#if user }
	<p>Welcome, {user.name}!</p>
	<p>Your email is {user.email}.</p>
	<p><a href="?/logout">Logout</a></p>
{:else}
	<p>You are not logged in.</p>
{/if}

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
	{#if form?.loginSuccess}
		<p class="success">Successfully logged in!</p>
		{#if form?.redirect}
			<p>Redirecting to "{form?.redirect}"...</p>
			<meta http-equiv="refresh" content="2;url={form?.redirect}" />
		{/if}
	{/if}
</form>

<style>
	.error {
		color: red;
	}
</style>
