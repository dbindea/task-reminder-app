<script lang="ts">
  import { filterValue, totalReminders } from '../services/store.service';
  import { isLoggedIn } from '../services/store.service';
  import { _ } from 'svelte-i18n';
  import { onMount, onDestroy } from 'svelte';

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
  <div class="section">{$_($filterValue ? 'app.subheader.search' : 'app.subheader.total', { values: { number: $totalReminders } })}</div>
  <div class="field-container">
    <div class="field-subcontainer">
      <span class="icon-filter field-icon" on:click={showFilter} />
      <input
        class="field-input"
        type="text"
        name="filter"
        bind:this={filterInput}
        on:input={() => filterChange()}
        id="filter"
        placeholder={$_('app.subheader.filter')}
        spellcheck="false"
        autocomplete="off"
      />
      <span class="icon-delete field-icon delete" on:click={deleteFilterValue} />
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

  span.icon {
    font-size: 24px;
    vertical-align: middle;
  }

  .filter {
    cursor: pointer;
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

    .field-subcontainer {
      background: var(--color-dark);
      border-radius: 8px;
      display: flex;
      align-items: center;
      height: 48px;
      width: 48px;
      transition: width 0.4s;

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
  }
  .field-container:hover .field-subcontainer {
    width: 240px;

    .delete {
      display: inline;
      cursor: pointer;
    }
  }
</style>
