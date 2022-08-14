<script context="module">
  import { goto } from "$app/navigation";
</script>

<script>
  $: dane = {
    email: "",
    password: "",
  };

  const handleLogin = async () => {
    document.cookie = "token" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify(dane),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json().then((res) => {
          document.cookie = `token=${res.token}`;
          goto("/dashboard");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
</script>

<section class="h-screen bg-blue-600 flex justify-center items-center">
  <div class="flex flex-col items-center space-y-4">
    <form
      on:submit|preventDefault
      class="overflow-hidden bg-white rounded-lg shadow-xl"
    >
      <div class=" px-10 pt-8 pb-6 text-center ">
        <h1 class="text-xl font-bold">Zaloguj się</h1>
        <h2 class="text-xl">
          w panelu <strong>administracyjnym</strong>
        </h2>
        <div class="sep" />
        <div class="flex flex-col space-y-4 text-left">
          <div>
            <label for="login" class="text-left">
              <span class="text-gray-600 text-sm mb-1 block ">Email</span>
            </label>
            <input
              type="email"
              bind:value={dane.email}
              class="input"
              id="login"
              name="login"
            />
          </div>
          <div>
            <label for="pass" class="text-left">
              <span class="text-gray-600 text-sm mb-1 block ">Password</span>
            </label>
            <input
              type="password"
              bind:value={dane.password}
              class="input"
              id="pass"
              name="pass"
            />
          </div>
          <!-- <Input label={"Login"} class={"border px-3 py-2 rounded-lg w-full "}/>
                        <Input label={"Hasło"} type={"password"} class={"border px-3 py-2 rounded-lg w-full "}/>
                        <Checkbox name={"rememberme"} label={"Zapamiętaj mnie"}/> -->
        </div>
      </div>
      <footer
        class=" flex items-center justify-center space-x-2 px-10 py-4 bg-gray-100 border-t border-gray-200"
      >
        <button class="btn w-full" on:click={handleLogin}>Zaloguj się</button>
      </footer>
    </form>
  </div>
</section>
