<h1>PAPERS, PLEASE!</h1>
<p>Nah you're not getting thru TSA, katanas aren't allowed :P</p>
<script>
    let email = "";
    let password = "";
    let responseMessage = "";

    async function submitForm(event) {
        event.preventDefault();

        const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        alert(JSON.stringify(await data));
    }
</script>

<form on:submit={submitForm}>
    <input type="text" bind:value={email} placeholder="example@example.com" required />
    <input type="password" bind:value={password} required />
    <button type="submit">Submit</button>
</form>

{#if responseMessage}
    <p>{responseMessage}</p>
{/if}