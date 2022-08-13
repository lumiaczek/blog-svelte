<script context="module">
  import { goto } from "$app/navigation";
</script>

<script>
  let isVisible = false;
  let menuVisible = false;

  export let name = "";
  export let forename = "";

  const toogleMenu = () => (isVisible = !isVisible);
  const toogleLogin = () => (menuVisible = !menuVisible);
  const logOf = () => {
    document.cookie = "token" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    goto("/");
  };
</script>

<nav
  class="flex w-full h-12 flex-row  justify-between items-center bg-blue-600 p-8"
>
  <div class="">
    <h1 class="text-white text-2xl font-bold">Panel administratora</h1>
  </div>
  <div class="block md:hidden" on:click={toogleMenu}>
    <i class="fa-solid fa-bars text-white text-2xl" />
  </div>
  <div
    class="hidden md:flex md:flex-row gap-6 items-center text-gray-200 text-xl"
  >
    <a class="hover:underline" href="/dashboard">Zarządzaj</a>
    <a class="hover:underline" href="/dashboard/add">Dodaj</a>
    <a class="hover:underline" href="/">Statystyki</a>
    <button on:click={toogleLogin} class="btn bg-red-600"
      >{`${name} ${forename}`}</button
    >
  </div>

  <div
    class="absolute top-[270px] z-50 md:top-14 right-[30px] bg-white shadow rounded-lg p-4 flex flex-col justify-center text-center"
    class:hidden={menuVisible === false}
  >
    <a class="hover:underline" href="/">Ustawienia</a>
    <div class="border-b-2 w-32 border-black my-3 inline-block" />
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      class="text-red-500 font-bold hover:underline cursor-pointer"
      on:click={logOf}>Wyloguj się</a
    >
  </div>

  <div
    class="absolute flex flex-col top-[48px] right-5 bg-blue-700 p-4 shadow rounded z-30 md:hidden gap-6 items-center text-gray-200 text-lg"
    class:hidden={isVisible === false}
  >
    <a class="hover:underline" href="/dashboard">Zarządzaj</a>
    <a class="hover:underline" href="/dashboard/add">Dodaj</a>
    <a class="hover:underline" href="/">Statystyki</a>
    <button on:click={toogleLogin} class="btn bg-red-600"
      >{`${name} ${forename}`}</button
    >
  </div>
</nav>
