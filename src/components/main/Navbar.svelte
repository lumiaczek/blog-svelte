<script>
    let isVisible = false;

    const toogleMenu = () => isVisible = !isVisible;
</script>

<nav class="flex w-full h-12 flex-row  justify-between items-center bg-blue-600 py-8 px-6">
    <div class="">
        <h1 class="text-white text-2xl font-bold">LumioBlog</h1>
    </div>
    <div class="block md:hidden" on:click={toogleMenu}>
        <i class="fa-solid fa-bars text-white text-2xl"></i>
    </div>
    <div class="hidden md:flex md:flex-row gap-6 items-center text-gray-200 text-xl">
        <a class="hover:underline" href="/">Strona główna</a>
        <a class="hover:underline" href="/">O mnie</a>
        <a class="hover:underline" href="/">Kontakt</a>
        <a class="btn" href="/auth">Zaloguj</a>
    </div>

    <div class="absolute flex flex-col top-[48px] right-5 bg-blue-600 p-4 shadow rounded z-30 md:hidden gap-6 items-center text-gray-200 text-lg" class:hidden = {isVisible === false}>
        <a class="hover:underline" href="/">Strona główna</a>
        <a class="hover:underline" href="/">O mnie</a>
        <a class="hover:underline" href="/">Kontakt</a>
        <a class="btn" href="/auth">Zaloguj</a>
    </div>
</nav>