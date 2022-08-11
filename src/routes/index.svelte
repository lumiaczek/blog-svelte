<script context="module">
    import { goto } from '$app/navigation';
</script>

<script>
    
    import { onMount, onDestroy } from 'svelte';
    import Card from "../components/utils/Card.svelte";
    import Navbar from "../components/main/Navbar.svelte";

    let posts = [];
    let id;



    onMount(() => {
        fetch("http://localhost:5000/").then(res => {
            res.json().then(res => {
                posts = res;
                console.log(posts);
            });
            }).catch(err => {
                console.error(err);
        });

    });

</script>

<main>
    <Navbar/>
    <section class="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-between">
        {#each posts as post}
            <article>
                <Card class="h-full">
                    <img src="{post.url}" alt="Obrazek posta" class="w-full">
                    <h2 class="p-4 text-2xl">{post.name}</h2>
                    <p class="text-md p-4">{post.description}</p>
                    <div class="p-4 flex justify-between">
                        <p class="text-sm text-gray-500">{post.date}</p>
                        <a href={`/blog/${post._id}`} class="text-sm text-blue-600 hover:underline hover:text-blue-700 cursor-pointer">Czytaj więcej...</a>
                    </div>
                </Card>
            </article>
        {/each}
    </section>
</main>


