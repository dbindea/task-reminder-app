<script lang="ts">
  import { totalReminders } from '../services/store.service';
  import { isLoggedIn } from '../services/store.service';
  import { _ } from 'svelte-i18n';

  import { onMount, onDestroy } from 'svelte';
  import { format_DDMMYYYY } from '../services/utils.service.svelte';

  const scrollNavBar = 60;
  let isShowFilter: boolean = false;
  let show = false;

  onMount(() => {
    window.onscroll = () => {
      show = window.scrollY > scrollNavBar;
    };
  });

  const showFilter = () => {
    isShowFilter = !isShowFilter;
    // TODO: filter implement...
  };

  onDestroy(() => {
    window.onscroll = () => {};
  });
</script>

<nav class={$isLoggedIn ? 'subheader sticky' : 'disabled'} class:scrolled={show} class:disabled={!$isLoggedIn}>
  <div class="section">{$_('app.subheader.total', { values: { number: $totalReminders, date: format_DDMMYYYY(new Date(), '/') } })}</div>
  <!-- <div class="vertical-separator" />
  <div class="section filter" on:click={() => showFilter()}>{$_('app.subheader.filter')} <span class="icon-filter icon" /></div> -->
</nav>

<style type="scss">
  .subheader {
    padding: 8px 16px;
    background: var(--color-border);
    margin: 0 4px 16px;
    box-shadow: inset -1px 1px 16px 4px rgb(0 0 0 / 20%);
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
  }

  .scrolled {
    transform: translate(0, calc(100% - 32px));
  }

  nav {
    transition: 0.4s ease;
  }

  .section {
    margin: auto;
    padding: 0 8px;
  }

  .vertical-separator {
    border-left: solid 1px var(--color-text);
  }

  span.icon {
    font-size: 24px;
    vertical-align: middle;
  }

  .filter {
    cursor: pointer;
  }
</style>
