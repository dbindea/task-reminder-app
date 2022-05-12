<script lang="ts">
  import 'toastify-js/src/toastify.css';
  import Header from './layouts/Header.svelte';
  import Main from './layouts/Main.svelte';
  import Footer from './layouts/Footer.svelte';
  import Subheader from './layouts/Subheader.svelte';
  import { setupI18n, isLocaleLoaded } from './services/i18n.service';

  $: if (!$isLocaleLoaded) {
    const lang = localStorage.getItem('lang') || 'es';
    setupI18n({ withLocale: lang });
  }
</script>

<main>
  {#if $isLocaleLoaded}
    <Header />
    <Subheader />
    <Main />
    <Footer />
  {:else}
    <p class="loading">Loading...</p>
  {/if}
</main>

<style>
  .loading {
    padding: 16px;
  }
  @media screen and (min-width: 800px) {
    main {
      max-width: 30%;
      margin: auto;
      min-width: 360px;
    }
  }
</style>
