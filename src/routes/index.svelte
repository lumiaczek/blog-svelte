<script>
    
    import { onMount } from 'svelte';

    let posts = [];

    onMount(() => {
        fetch("http://localhost:5000/").then(res => {
            res.json().then(res => {
            posts = res;
            console.log(posts);
        });
        }).catch(err => {
            console.error(err);
        })
    })

</script>

<main>
    <section class="flex flex-row gap-4 justify-between">
        {#each posts as post}
            <article>
                <h1>{post.name}</h1>
                <p>{post.content}</p>
                <p>{post.date}</p>
            </article>
        {/each}
    </section>
</main>


