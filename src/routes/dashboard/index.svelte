<script>
    import { onMount } from "svelte";
    import auth from '../auth/auth-store.js'

    let token = null;

    $: ok = false;

    onMount(() => {
        auth.subscribe(data => {
            token = data;
            console.log(token);
        });

        fetch("http://localhost:5000/verify",{
            method: 'GET',
            headers: {
               'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if(res.ok){
                ok = true;
            }
        }).catch(err => {
            console.log(err);
        })

    });

    $: post = {
        name: '',
        content: '',
        date: ''
    }
    
      const addPost = () => {
        fetch("http://localhost:5000/add",{
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
				'Content-Type': 'application/json'
			}
        }).then(res => {
            if(!res.ok){
                throw new Error("Dodawanie nie powiodło się!")
            }
            else {
                console.log("Zapisano post!");
            }
        }).catch(err => {
            console.log(err);
        })
    }
</script>

{#if ok}
<form on:submit|preventDefault>
    <input type="text" name="name" id="name" bind:value={post.name} class="input"/>
    <textarea name="content" id="content" rows="10" bind:value={post.content} class="input"></textarea>
    <input type="text" name="date" id="date" bind:value={post.date} class="input"/>
    <button on:click={addPost}>Wyślij</button>
</form>
{/if}

{#if !ok}
    <div class="h-screen flex justify-center items-center bg-black opacity-75">
        <div class="flex justify-center items-center bg-white rounded-lg shadow flex-col p-4 space-y-4">
            <h1 class="text-2xl font-bold">Upss...</h1>
            <p class="text-lg">Wygląda na to że nie masz tu dostępu, zaloguj się aby uzyskać dostęp.</p>
        </div>
    </div>
{/if}