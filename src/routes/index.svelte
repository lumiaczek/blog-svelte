<script context="module">
  import { goto } from "$app/navigation";

  export async function load({ fetch }) {
    const res = await fetch("http://localhost:5000/");
    const posts = await res.json();

    if (res.ok) {
      return {
        props: {
          posts,
        },
      };
    }

    return {
      status: res.status,
      error: new Error("Could not fetch data"),
    };
  }
</script>

<script>
  import Card from "../components/utils/Card.svelte";
  import Navbar from "../components/main/Navbar.svelte";

  export let posts = [];
</script>

<main>
  <Navbar />
  <section
    class="w-full h-[400px] bg-gray-400 flex flex-row items-center justify-center"
  >
    <p class="text-5xl text-gray-300">PLACEHOLDER</p>
  </section>
  <div class="flex flex-col justify-center items-center">
    <section
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-5/6 p-4 gap-4 "
    >
      {#each posts as post}
        <article>
          <Card class="h-full">
            <img src={post.url} alt="Obrazek posta" class="w-full" />
            <h2 class="p-4 text-2xl">{post.name}</h2>
            <p class="text-md p-4">{post.description}</p>
            <div class="p-4 flex justify-between">
              <p class="text-sm text-gray-500">{post.date}</p>
              <a
                href={`/blog/${post._id}`}
                class="btn text-sm text-blue-600 hover:text-white cursor-pointer"
                >Czytaj więcej...</a
              >
            </div>
          </Card>
        </article>
      {/each}
    </section>
  </div>
</main>
