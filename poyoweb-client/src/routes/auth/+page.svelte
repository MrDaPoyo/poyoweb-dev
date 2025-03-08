<h1>PAPERS, PLEASE!</h1>
<p>Nah you're not getting thru TSA, katanas aren't allowed :P</p>
<script>
    let email = "";
    let password = "";
    let registerEmail = "";
    let registerPassword = "";
    let registerUsername = "";
    let data = "";
    let registerData = "";

    async function submitForm(event) {
        event.preventDefault();

        const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        data = await res.json();
    }

    async function submitRegisterForm(event) {
        event.preventDefault();

        const res = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: registerEmail, password: registerPassword, name: registerUsername })
        });

        registerData = await res.json();
    }
</script>

<form on:submit={submitForm}>
    <input type="text" bind:value={email} placeholder="example@example.com" required />
    <input type="password" bind:value={password} required />
    <button type="submit">Submit</button>
</form>

{#if data}
    <p>{data.email}</p>
{/if}

<h2>Register</h2>
<form on:submit={submitRegisterForm}>
    <input type="text" bind:value={registerEmail} placeholder="example@example.com" required />
    <input type="text" bind:value={registerUsername} required placeholder="name.poyoweb.org" />
    <input type="password" bind:value={registerPassword} placeholder="*********" required />
    <button type="submit">Register</button>
</form>

{#if registerData}
    <p>{JSON.stringify(registerData)}</p>
{/if}