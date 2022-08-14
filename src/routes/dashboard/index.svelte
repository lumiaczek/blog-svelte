<script context="module">
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
      error: new Error("Could not fetch"),
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import Navbar from "./Navbar.svelte";
  import TableWrapper from "../../components/table/TableWrapper.svelte";
  import Th from "../../components/table/Th.svelte";
  import Td from "../../components/table/Td.svelte";

  $: ok = false;
  $: loading = true;

  let user = {};
  export let posts = [];

  const getPosts = () => {
    fetch("http://localhost:5000/")
      .then((res) => {
        res.json().then((res) => {
          posts = res;
          console.log(posts);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  onMount(() => {
    let token = document.cookie.replace("token=", "");
    fetch("http://localhost:5000/verify", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        loading = false;
        if (res.ok) {
          ok = true;
          res.json().then((res) => {
            user = res.user;
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getPosts();
  });

  const deletePost = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        const index = posts.findIndex((x) => x._id === id);
        posts.splice(index, 1);

        posts = [...posts];
      })
      .catch((err) => {
        console.log(err);
      });
  };
</script>

<svelte:head>
  <script
    src="https://kit.fontawesome.com/0adb7c2a19.js"
    crossorigin="anonymous"></script>
</svelte:head>

<svelte:body class="min-h-screen" />

{#if loading}
  <div class="h-screen flex justify-center items-center bg-black opacity-75">
    <div
      class="flex justify-center items-center bg-white rounded-lg shadow flex-col p-10 space-y-4"
    >
      <h1 class="text-2xl font-bold">Trwa autoryzacja</h1>
      <div class="text-2xl text-blue-600 animate-spin">
        <i class="fa-solid fa-gear" />
      </div>
    </div>
  </div>
{/if}

{#if ok}
  <Navbar name={user.name} forename={user.forename} />
  <div class="p-4">
    <TableWrapper>
      <thead>
        <tr>
          <Th>Nazwa</Th>
          <Th>Opis</Th>
          <Th>URL obrazka</Th>
          <Th>Data dodania</Th>
          <Th />
        </tr>
      </thead>
      <tbody>
        {#each posts as post (post._id)}
          <tr>
            <Td>
              {post.name}
            </Td>
            <Td>
              {post.description}
            </Td>
            <Td>
              {post.url}
            </Td>
            <Td>
              {post.date}
            </Td>
            <Td class={"td-actions space-y-1"}>
              <a href={`/blog/${post._id}`} class="btn"> Zobacz </a>
              <btn class="btn btn-warning"> Edytuj </btn>
              <btn
                on:click={() => {
                  deletePost(post._id);
                }}
                class="btn btn-danger"
              >
                Usuń
              </btn>
            </Td>
          </tr>
        {/each}
      </tbody>
    </TableWrapper>
  </div>
{/if}

{#if !ok}
  <div class="h-screen flex justify-center items-center bg-black opacity-75">
    <div
      class="flex justify-center items-center bg-white rounded-lg shadow flex-col p-4 space-y-4"
    >
      <h1 class="text-2xl font-bold">Upss...</h1>
      <p class="text-lg">
        Wygląda na to że nie masz tu dostępu, zaloguj się aby uzyskać dostęp.
      </p>
    </div>
  </div>
{/if}
