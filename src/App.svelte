<script lang="ts">
  import Header from './layouts/Header.svelte';
  import Main from './layouts/Main.svelte';
  import { setupI18n, isLocaleLoaded } from './services/i18n.service';
  import 'toastify-js/src/toastify.css';

  $: if (!$isLocaleLoaded) {
    const lang = localStorage.getItem('lang') || 'es';
    setupI18n({ withLocale: lang });
  }
</script>

<main>
  {#if $isLocaleLoaded}
    <Header />
    <Main />
  {:else}
    <p>Loading...</p>
  {/if}
</main>
