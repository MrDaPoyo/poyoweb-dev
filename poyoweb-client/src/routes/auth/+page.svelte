<script lang="ts">
	import { goto } from '$app/navigation';
	let username = '';
	let password = '';
	let error = '';
	let email = '';

	async function login() {
		error = '';
        const mode = 'login';
		const response = await fetch('/auth', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mode, email, password })
		});

		const result = await response.json();

		if (response.ok) {
			goto('/dashboard'); // Redirect after successful login
		} else {
			error = result.error;
		}
	}

	async function register() {
		error = '';
        const mode = 'register';
		const response = await fetch('/auth', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mode, username, password, email })
		});

		const result = await response.json();

		if (response.ok) {
			goto('/dashboard'); // Redirect after successful login
		} else {
			error = result.error;
		}
	}
</script>

<h1>PAPERS, PLEASE!</h1>
<p>Nah you're not getting thru TSA, katanas aren't allowed :P</p>

{#if error}
	<p style="color: red;">{error}</p>
{/if}

<form on:submit|preventDefault={login}>
	<label>
		Email:
		<input type="email" bind:value={email} required />
	</label>

	<label>
		Password:
		<input type="password" bind:value={password} required />
	</label>

	<button type="submit">Login</button>
</form>

<form on:submit|preventDefault={register}>
	<label>
		Username:
		<input type="text" bind:value={username} required />
	</label>
	<label>
		Email:
		<input type="email" bind:value={email} required />
	</label>
	<label>
		Password:
		<input type="password" bind:value={password} required />
	</label>

	<button type="submit">Register</button>
</form>
