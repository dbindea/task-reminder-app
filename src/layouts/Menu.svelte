<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { AppType } from '../model/AppType.svelte';
  import { appType, isVisibleMenu, resetOperation } from '../services/store.service';

  const changeApp = (type: AppType) => {
    localStorage.setItem('AppType', type);
    $isVisibleMenu = false;
    $appType = type;
    $resetOperation = true;
  };

  const goBackOffice = () => {
    window.location.replace('https://secure.gate2fly.com');
  };
</script>

<div class={$isVisibleMenu ? 'menu' : 'menu menu--toggle'}>
  {#if $isVisibleMenu}
    <div class="menu-close" on:click={() => ($isVisibleMenu = false)}>
      <span class="icon-chevron icon" />
      <span class="icon-chevron icon" />
    </div>

    <div class="item-block">
      <span class="item item-header uppercase">{$_(`app.${$appType}.menu.app_type`)}</span>
      <span class="item item-option" on:click={() => changeApp(AppType.Reminders)}
        ><span class="icon-checklist item-icon" /><span class="item-text">{$_(`app.menu.reminder`)}</span></span
      >
      <span class="item item-option" on:click={() => changeApp(AppType.Earnings)}
        ><span class="icon-euro item-icon" /><span class="item-text">{$_(`app.menu.earning`)}</span></span
      >
      <span class="item item-option" on:click={() => goBackOffice()}
        ><span class="icon-new-tab item-icon" /><span class="item-text">{$_(`app.menu.back_office`)}</span></span
      >
    </div>
    <!-- <div class="item-block">
      <span class="item item-header uppercase">Settings</span>
      <span class="item item-option" on:click={settings}><span class="icon-checklist item-icon" />Manage Tipologies</span>
    </div> -->
  {/if}
</div>

<style type="scss">
  .menu {
    background-image: linear-gradient(-110deg, var(--color-dark) 30%, var(--color-light) 70%);
    box-shadow: 0 0 2px 1px #244974;
    position: fixed;
    height: calc(100% - 11vh);
    width: 32vh;
    padding: 16px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    z-index: 2;
    visibility: visible;
    transition: width 200ms, visibility 200ms;
    border-left-color: var(--color-placeholder);
    border-left-style: solid;
    border-left-width: 1px;
    &--toggle {
      width: 0;
      padding: 0;
      visibility: hidden;
    }
  }

  .menu-close {
    float: right;
    display: flex;
    flex-direction: column;
    transform: rotate(90deg);
    font-size: 18px;
    cursor: pointer;
    & :first-child {
      margin-bottom: -12px;
    }
    .icon {
      animation: MoveUpDown 1.4s linear infinite;
    }
  }

  @keyframes MoveUpDown {
    0%,
    100% {
      transform: translateY(2px);
    }
    50% {
      transform: translateY(-2px);
    }
  }

  .item-block {
    padding: 32px 16px;
    position: fixed;
    display: flex;
    flex-flow: column;
    gap: 8px;
  }

  .item {
    &-header {
      opacity: 0.4;
      padding-bottom: 16px;
    }
    &-option {
      visibility: visible;
      padding: 8px 16px 16px 0;
      transition: all 0.2s ease-in;
      user-select: none;
      cursor: pointer;
      &:hover {
        background-color: var(--color-placeholder);
        border-radius: 8px;
      }
    }
    &-icon {
      margin-right: 12px;
      font-size: 18px;
      vertical-align: bottom;
    }
    &-text {
      vertical-align: middle;
    }
  }
</style>
