<script>

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

<form on:submit|preventDefault>
    <input type="text" name="name" id="name" bind:value={post.name} class="input"/>
    <textarea name="content" id="content" rows="10" bind:value={post.content} class="input"></textarea>
    <input type="text" name="date" id="date" bind:value={post.date} class="input"/>
    <button on:click={addPost}>Wyślij</button>
</form>