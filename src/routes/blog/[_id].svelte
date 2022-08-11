<script context="module">
    import { page } from '$app/stores';
</script>

<script>
    import { onMount } from "svelte";
    import Navbar from "../../components/main/Navbar.svelte";
    import Card from '../../components/utils/Card.svelte'

    let post = [];

    onMount(() => {

        let route = $page.url.pathname;
        let request = route.replace('/blog/', '');

        fetch(`http://localhost:5000/blog/${request}`,)
        .then(res => {
            res.json().then(res => {
                post = res[0];
            });
            }).catch(err => {
                console.error(err);
        });
    });


</script>

<article>
    <Navbar/>
    <section class="flex p-4">
        <Card class="p-4">
            <div class="grid grid-cols-2 gap-2">
                <img src={post.url} alt="Obrazek artykułu" class="w-full h-auto">
                <div class="m-2">
                    <h1 class="text-3xl font-bold mb-3">{post.name}</h1>
                    {@html post.content}
                </div>
            </div>
            <div class="m-2">
                {@html post.content}
            </div>
        </Card>
    </section>
</article>