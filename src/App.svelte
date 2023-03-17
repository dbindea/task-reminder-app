<script lang="ts">
  import 'toastify-js/src/toastify.css';
  import Body from './layouts/Body.svelte';
  import Footer from './layouts/Footer.svelte';
  import Header from './layouts/Header.svelte';
  import Menu from './layouts/Menu.svelte';
  import SubHeader from './layouts/SubHeader.svelte';
  import { isLocaleLoaded, setupI18n } from './services/i18n.service';

  $: if (!$isLocaleLoaded) {
    const lang = localStorage.getItem('lang') || 'es';
    setupI18n({ withLocale: lang });
  }
</script>

<main>
  {#if $isLocaleLoaded}
    <Header />
    <Menu />
    <SubHeader />
    <Body />
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
