<script lang="ts">
  import { APP_TYPE } from '../model/AppType.model.svelte';
  import { appType, isVisibleMenu } from '../services/store.service';

  const changeApp = (type: APP_TYPE) => {
    localStorage.setItem('appType', type);
    $isVisibleMenu = false;
    $appType = type;
  };

  const settings = () => {
    // TODO
  };
</script>

<div class={$isVisibleMenu ? 'menu' : 'menu menu--toggle'}>
  {#if $isVisibleMenu}
    <div class="menu-close" on:click={() => ($isVisibleMenu = false)}>
      <span class="icon-chevron icon" />
      <span class="icon-chevron icon" />
    </div>

    <div class="item-block">
      <span class="item item--header uppercase">App Category</span>
      <span class="item item--option" on:click={() => changeApp(APP_TYPE.REMINDERS)}><span class="icon-checklist item--icon" />Task Reminder</span>
      <span class="item item--option" on:click={() => changeApp(APP_TYPE.EARNINGS)}><span class="icon-checklist item--icon" />Financial Earnings</span>
    </div>
    <div class="item-block">
      <span class="item item--header uppercase">Settings</span>
      <span class="item item--option" on:click={settings}><span class="icon-checklist item--icon" />Manage Tipologies</span>
    </div>
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
    transition: width 0.4s, visibility 0.4s;
    border-left-color: var(--color-placeholder);
    border-left-style: solid;
    border-left-width: 2px;
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
    display: grid;
  }

  .item {
    &--header {
      opacity: 0.4;
      padding-bottom: 8px;
    }
    &--option {
      padding: 16px;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
      &:hover {
        background-color: var(--color-placeholder);
        border-radius: 8px;
      }
    }
    &--icon {
      margin-right: 12px;
    }
  }
</style>
