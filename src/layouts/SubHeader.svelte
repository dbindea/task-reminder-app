<script lang="ts">
  import { appType, filterValue, langStore, totalEarnings, totalReminders } from '../services/store.service';
  import { isLoggedIn } from '../services/store.service';
  import { _ } from 'svelte-i18n';
  import { onMount, onDestroy } from 'svelte';
  import { AppType } from '../model/AppType.svelte';
  import { formatNumber } from '../services/utils.service.svelte';

  let filterInput;
  const scrollNavBar = 60;
  let show = false;

  onMount(() => {
    window.onscroll = () => {
      show = window.scrollY > scrollNavBar;
    };
  });

  const showFilter = () => filterInput.focus();
  const filterChange = () => ($filterValue = filterInput.value);
  const deleteFilterValue = () => {
    filterInput.value = null;
    $filterValue = filterInput.value;
    filterInput.focus();
  };

  onDestroy(() => {
    window.onscroll = () => {};
  });
</script>

<nav class={$isLoggedIn ? 'subheader sticky' : 'disabled'} class:scrolled={show} class:disabled={!$isLoggedIn}>
  <div class="section">
    {#if $appType === AppType.Earnings}
      {$_($filterValue ? `app.${$appType}.subheader.search` : `app.${$appType}.subheader.total`, {
        values: { number: formatNumber($totalEarnings, $langStore) },
      })}
    {/if}
    {#if $appType === AppType.Reminders}
      {$_($filterValue ? `app.${$appType}.subheader.search` : `app.${$appType}.subheader.total`, { values: { number: $totalReminders } })}
    {/if}
  </div>
  <div class="field-container" class:field-container--active={$filterValue}>
    <div class="field-subcontainer value-display" class:field-subcontainer--active={$filterValue}>
      <span class="icon-filter field-icon" on:click={showFilter} />
      <input
        class="field-input"
        type="text"
        name="filter"
        bind:this={filterInput}
        on:input={() => filterChange()}
        id="filter"
        placeholder={$_(`app.${$appType}.subheader.filter`)}
        spellcheck="false"
        autocomplete="off"
      />
      <span class="icon-delete field-icon delete" class:delete--active={$filterValue} on:click={deleteFilterValue} />
    </div>
  </div>
</nav>

<style type="scss">
  .subheader {
    padding: 4px;
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
    z-index: 1;
  }

  .section {
    margin: auto;
    padding: 0 8px;
  }

  .field-container {
    padding: 2px;
    margin-right: 4px;
    caret-color: var(--color-text);
    border-radius: 8px;
    background: var(--color-border);
    cursor: text;

    &:hover {
      background: -webkit-gradient(linear, left top, left bottom, from(var(--color-turq)), to(var(--color-fucs)));
      background: -moz-linear-gradient(top, var(--color-turq) 0, var(--color-fucs) 100%);
      background: linear-gradient(180deg, var(--color-turq), var(--color-fucs));
    }

    &--active {
      background: -webkit-gradient(linear, left top, left bottom, from(var(--color-turq)), to(var(--color-fucs)));
      background: -moz-linear-gradient(top, var(--color-turq) 0, var(--color-fucs) 100%);
      background: linear-gradient(180deg, var(--color-turq), var(--color-fucs));
    }

    .field-subcontainer {
      background: var(--color-dark);
      border-radius: 8px;
      display: flex;
      align-items: center;
      height: 48px;
      width: 48px;
      transition: width 0.4s;

      &--active {
        width: 240px;
      }

      .field-icon {
        color: var(--color-placeholder);
        font-size: 24px;
        padding: 0 8px;
        margin-left: 4px;
        cursor: unset;
      }
      .field-input {
        padding: 8px 8px;
        width: 100%;
        outline: none;
        border: 0;
        font-size: 16px;
        line-height: 22px;
        text-shadow: var(--text-shadow);

        background-clip: text;
        -webkit-background-clip: text;

        &::placeholder {
          color: var(--color-placeholder);
        }
      }
    }
  }

  .delete {
    display: none;
    &--active {
      display: inline;
      cursor: pointer;
    }
  }

  .field-container:hover .field-subcontainer {
    width: 240px;

    .delete {
      display: inline;
      cursor: pointer;
    }
  }
</style>
