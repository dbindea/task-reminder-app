<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { ActionType } from '../model/ActionType.svelte';
  import type { AppType } from '../model/AppType.svelte';
  import type { Earning } from '../model/Earning.svelte';
  import { langStore } from '../services/store.service';
  import { formatNumber, format_DDMMYYYY } from '../services/utils.service.svelte';

  export let collectionName: AppType;
  export let earning: Earning;
  const formatDate = format_DDMMYYYY;

  const dispatch = createEventDispatcher();

  const handleEvent = (actionType: ActionType) => {
    dispatch(actionType, earning);
  };
</script>

<div class="card">
  <div class="reminder-card">
    <div class="first-item">
      <div class="field">
        <span class="field-title">{$_(`app.${collectionName}.main.card.product`)}</span><span class="field-text capitalize"
          >{$_(`app.${collectionName}.main.form.${earning.product}`)}</span
        >
      </div>
      <!-- DROPDOWN -->
      <span class="icon-actions rotate dropdown">
        <div class="dropdown-content">
          <div class="dropdown-actions">
            <ul>
              <li class="action-item" on:click={() => handleEvent(ActionType.UPDATE)}>
                <span class="icon-edit" />{$_(`app.${collectionName}.main.card.update`)}
              </li>
              <li class="action-item" on:click={() => handleEvent(ActionType.REMOVE)}>
                <span class="icon-delete" />{$_(`app.${collectionName}.main.card.remove`)}
              </li>
            </ul>
          </div>
        </div>
      </span>
    </div>
    <div class="field">
      <span class="field-title">{$_(`app.${collectionName}.main.form.alias`)}</span><span class="capitalize field-text">{earning.alias}</span>
    </div>
    <div class="field">
      <span class="field-title">{$_(`app.${collectionName}.main.form.provider`)}</span>
      <span class="field-text capitalize">{earning.provider}</span>
    </div>
    <div class="field">
      <span class="field-title">{$_(`app.${collectionName}.main.form.locatorId`)}</span><span class="field-text uppercase">{earning.locatorId}</span>
    </div>
    <div class="field">
      <span class="field-title">{$_(`app.${collectionName}.main.form.date`)}</span><span class="field-text field-title">{formatDate(earning.date, '/')}</span>
    </div>
    <div class="field">
      <span class="field-title">{$_(`app.${collectionName}.main.form.amount`)}</span><span class="field-text">{formatNumber(earning.amount, $langStore)}</span>
    </div>
  </div>
</div>

<style type="scss">
  .dropdown {
    rotate: initial;
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
  .dropdown-content {
    transform: translateY(12px) rotate(-90deg);
    display: none;
    position: absolute;
    box-shadow: var(--bg-shadow);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-size: 16px;
    background: linear-gradient(180deg, var(--color-turq), var(--color-fucs));
    border-radius: 8px;
  }

  .dropdown-actions {
    padding: 4px 16px;
    border-radius: 8px;
    background-color: var(--color-dark);
    margin: 2px;

    ul {
      list-style-type: none;
      padding-left: 0;
      li {
        cursor: pointer;
        display: flex;
        gap: 8px;
      }
    }
  }

  .action-item {
    cursor: pointer;
    user-select: none;
    padding: 16px 32px 16px 24px;
    &:hover {
      border-radius: 8px;
      background: var(--color-border);
      box-shadow: inset -1px 1px 16px 4px rgb(0 0 0 / 20%);
    }
  }

  .card {
    padding: 2px;
    border-radius: 8px;
    margin-bottom: 16px;
    box-shadow: 0px 2px 12px 4px rgb(0 0 0 / 40%);
    &:hover {
      background: linear-gradient(180deg, var(--color-turq), var(--color-fucs));
      box-shadow: none;
    }
  }
  .reminder-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px 16px;
    border-radius: 8px;
    background-color: var(--color-light);
    &:hover {
      background: var(--color-dark);
    }
  }

  .first-item {
    display: flex;
    justify-content: space-between;
  }

  .field {
    display: flex;
    align-items: center;
  }
  .field-title {
    font-weight: 600;
    font-size: 16px;
    min-width: 120px;
  }

  .field-text {
    font-weight: 300;
  }

  .rotate {
    transform: rotate(90deg);
    font-size: 28px;
  }
</style>
