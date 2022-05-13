<script lang="ts">
  import { hiddenOptionsByTipology, Reminder } from '../model/Reminder.model.svelte';
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import { ActionType } from '../model/ActionType.model.svelte';
  import { format_DDMMYYYY } from '../services/utils.service.svelte';

  export let reminder: Reminder;
  const formatDate = format_DDMMYYYY;

  const dispatch = createEventDispatcher();

  const update = (reminder: Reminder) => {
    dispatch(ActionType.UPDATE, reminder);
  };

  const remove = (id: string) => {
    dispatch(ActionType.REMOVE, id);
  };

  const formatNumber = (number: number): string => {
    if (number) return Number(number).toLocaleString("es", {minimumFractionDigits: 2})
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
        <span class="field-title">{$_('app.main.card.tipology')}</span><span class="field-text capitalize">{$_(`app.main.form.${reminder.tipology}`)}</span>
      </div>
      <!-- DROPDOWN -->
      <span class="icon-actions rotate dropdown">
        <div class="dropdown-content">
          <div class="dropdown-actions">
            <ul>
              <li class="action-item" on:click={() => update(reminder)}><span class="icon-edit" />{$_('app.main.card.update')}</li>
              <li class="action-item" on:click={() => remove(reminder.id)}><span class="icon-delete" />{$_('app.main.card.remove')}</li>
            </ul>
          </div>
        </div>
      </span>
    </div>
    <div class="field">
      <span class="field-title">{$_('app.main.form.alias')}</span><span class="capitalize field-text">{reminder.alias}</span>
    </div>
    <div class="field" class:disabled={hiddenOptionsByTipology[reminder.tipology]?.provider}>
      <span class="field-title">{$_('app.main.form.provider')}</span>
      <span class="field-text capitalize">{reminder.provider}</span>
    </div>
    <div class="field" class:disabled={hiddenOptionsByTipology[reminder.tipology]?.locatorId}>
      <span class="field-title">{$_('app.main.form.locatorId')}</span><span class="field-text uppercase">{reminder.locatorId}</span>
    </div>
    <div class="field">
      <span class="field-title">{$_('app.main.form.date')}</span><span class="field-text field-title">{formatDate(reminder.date, '/')}</span>
      <span class="colours">{$_(getTranslation(getDiffDays(reminder.date)), { values: { number: getDiffDays(reminder.date) } })}</span>
    </div>
    <div class="field" class:disabled={hiddenOptionsByTipology[reminder.tipology]?.amount}>
      <span class="field-title">{$_('app.main.form.amount')}</span><span class="field-text">{formatNumber(reminder.amount)} €</span>
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
    padding: 12px 12px 12px 0;
    border-radius: 8px;
    background-color: var(--color-dark);
    margin: 2px;

    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding-left: 24px;
      padding-right: 24px;

      li {
        cursor: pointer;
        display: flex;
        gap: 8px;
      }
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

  .action-item {
    cursor: pointer;
    user-select: none;
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
