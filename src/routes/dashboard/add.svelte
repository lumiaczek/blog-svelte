<script>
  import { onMount, onDestroy } from "svelte";
  import Navbar from "./Navbar.svelte";
  import Card from "../../components/utils/Card.svelte";

  $: ok = false;
  $: loading = true;

  let [postStateSuccess, postStateFail] = [false, false];

  let user = {};

  onMount(() => {
    let token = document.cookie.replace("token=", "");
    fetch(`http://${location.hostname}:5000/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
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
  });

  $: post = {
    name: "",
    description: "",
    content: "",
    url: "",
    date: "",
  };

  const addPost = () => {
    if (
      post.name !== "" ||
      post.content !== "" ||
      post.date !== "" ||
      post.url !== "" ||
      post.description !== ""
    ) {
      fetch(`http://${location.hostname}:5000/add`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => {
          if (!res.ok) {
            postStateFail = false;
            throw new Error("Dodawanie nie powiodło się!");
          } else {
            postStateSuccess = true;
            setTimeout(() => {
              postStateSuccess = false;
            }, 3000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      postStateFail = true;
      setTimeout(() => {
        postStateFail = false;
      }, 3000);
    }
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
  <div class="grid grid-cols-1 md:grid-cols-2">
    <div class="flex flex-col p-8">
      <form on:submit|preventDefault class="space-y-4">
        <input
          type="text"
          name="name"
          id="name"
          bind:value={post.name}
          class="input"
          placeholder="Tytuł"
        />
        <input
          type="text"
          name="date"
          id="date"
          bind:value={post.date}
          class="input"
          placeholder="Data dodania"
        />
        <input
          type="text"
          name="url"
          id="url"
          bind:value={post.url}
          class="input"
          placeholder="URL obrazka"
        />
        <textarea
          name="description"
          id="description"
          rows="5"
          bind:value={post.description}
          class="input"
          placeholder="Krótki opis"
        />
        <textarea
          name="content"
          id="content"
          rows="10"
          bind:value={post.content}
          class="input"
          placeholder="HTML / TREŚĆ"
        />
        <button class="btn w-full" on:click={addPost}>Dodaj</button>
      </form>
    </div>

    <div class="w-full h-full rounded-lg shadow mt-4 mr-2">
      <section class="p-4">
        <Card class="flex flex-column justify-center items-center p-4 w-full">
          <div class="grid grid-cols-1 gap-2">
            <img src={post.url} alt="Obrazek artykułu" class="w-full h-auto" />
            <div class="m-2">
              <h1 class="text-3xl font-bold mb-3">{post.name}</h1>
              {@html post.content}
            </div>
          </div>
        </Card>
      </section>

      {#if postStateSuccess}
        <div
          class="absolute md:bottom-4 md:right-4 shadow rounded-lg border-2 border-green-600 w-fit m-6 p-3 z-30"
        >
          <div class="text-green-500 bg-green-100 p-2 rounded w-fit">
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              /></svg
            >
          </div>
          <h1 class="text-lg">Sukces!</h1>
          <span>Dodawanie posta powiodło się.</span>
        </div>
      {/if}
      {#if postStateFail}
        <div
          class="absolute md:bottom-4 md:right-4 shadow rounded-lg border-2 border-red-600 w-fit m-6 p-3 z-30"
        >
          <div class="text-red-500 bg-red-100 p-2 rounded w-fit">
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              /></svg
            >
          </div>
          <h1 class="text-lg">Błąd!</h1>
          <span>Dodawanie posta nie powiodło się.</span>
        </div>
      {/if}
    </div>
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
