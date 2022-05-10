<script lang="ts">
  import Header from './layouts/Header.svelte';
  import Main from './layouts/Main.svelte';
  import { setupI18n, isLocaleLoaded } from './services/i18n.service';
  import 'toastify-js/src/toastify.css';
  import Footer from './layouts/Footer.svelte';

  $: if (!$isLocaleLoaded) {
    const lang = localStorage.getItem('lang') || 'es';
    setupI18n({ withLocale: lang });
  }
</script>

<main>
  {#if $isLocaleLoaded}
    <Header />
    <Main />
    <Footer />
  {:else}
    <p>Loading...</p>
  {/if}
</main>

<style>
  @media screen and (min-width: 800px) {
    main {
      max-width: 30%;
      margin: auto;
      min-width: 360px;
    }
  }
</style>
