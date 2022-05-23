<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { hiddenOptionsByTipology } from '../model/AppObject.model.svelte';
  import { createEventDispatcher } from 'svelte';
  import { ActionType } from '../model/ActionType.model.svelte';
  import { format_DDMMYYYY } from '../services/utils.service.svelte';
  import type { AppObject } from '../model/AppObject.model.svelte';

  export let appObject: AppObject;
  const formatDate = format_DDMMYYYY;

  const dispatch = createEventDispatcher();

  const update = (reminder: AppObject) => {
    dispatch(ActionType.UPDATE, reminder);
  };

  const remove = (id: string) => {
    dispatch(ActionType.REMOVE, id);
  };

  const formatNumber = (number: number): string => {
    if (number) return Number(number).toLocaleString('es', { minimumFractionDigits: 2 });
  };

  const getDiffDays = (date: Date): number => {
    const difference = new Date(date).getTime() - new Date().getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  };

  const getTranslation = (numberDays: number) => {
    const mapDays = {
      0: 'app.main.card.count_days_today',
      1: 'app.main.card.count_days_sg',
      default: 'app.main.card.count_days_pl',
    };
    return mapDays[numberDays] ? mapDays[numberDays] : mapDays['default'];
  };
</script>

<div class="card">
  <div class="reminder-card">
    <div class="first-item">
      <div class="field">
        <span class="field-title">{$_('app.main.card.tipology')}</span><span class="field-text capitalize">{$_(`app.main.form.${appObject.tipology}`)}</span>
      </div>
      <!-- DROPDOWN -->
      <span class="icon-actions rotate dropdown">
        <div class="dropdown-content">
          <div class="dropdown-actions">
            <ul>
              <li class="action-item" on:click={() => update(appObject)}><span class="icon-edit" />{$_('app.main.card.update')}</li>
              <li class="action-item" on:click={() => remove(appObject.id)}><span class="icon-delete" />{$_('app.main.card.remove')}</li>
            </ul>
          </div>
        </div>
      </span>
    </div>
    <div class="field">
      <span class="field-title">{$_('app.main.form.alias')}</span><span class="capitalize field-text">{appObject.alias}</span>
    </div>
    <div class={!hiddenOptionsByTipology[appObject.tipology]?.provider ? 'field' : 'field--disabled'}>
      <span class="field-title">{$_('app.main.form.provider')}</span>
      <span class="field-text capitalize">{appObject.provider}</span>
    </div>
    <div class={!hiddenOptionsByTipology[appObject.tipology]?.locatorId ? 'field' : 'field--disabled'}>
      <span class="field-title">{$_('app.main.form.locatorId')}</span><span class="field-text uppercase">{appObject.locatorId}</span>
    </div>
    <div class="field">
      <span class="field-title">{$_('app.main.form.date')}</span><span class="field-text field-title">{formatDate(appObject.date, '/')}</span>
      <span class="colours">{$_(getTranslation(getDiffDays(appObject.date)), { values: { number: getDiffDays(appObject.date) } })}</span>
    </div>
    <div class={!hiddenOptionsByTipology[appObject.tipology]?.amount ? 'field' : 'field--disabled'}>
      <span class="field-title">{$_('app.main.form.amount')}</span><span class="field-text">{formatNumber(appObject.amount)} €</span>
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
    &--disabled {
      display: none;
    }
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

  .colours {
    background: linear-gradient(135deg, var(--color-turq), var(--color-fucs));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 16px;
    font-weight: 600;
  }
</style>
