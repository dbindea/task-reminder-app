<script lang="ts">
  import { db } from '../firebase';
  import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
  import { Reminder, Tipology } from '../model/Reminder.model.svelte';
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { ActionType } from '../model/ActionType.model.svelte';
  import { format_YYYYMMDD } from '../services/utils.service.svelte';
  import Toastify from 'toastify-js';
  import { isLoggedIn, user } from '../services/store.service';

  export let reminder: Reminder = getEmptyReminder();
  export let reminderOp: { action: ActionType };

  export let idToRemove: string;
  export let reminderToUpdate: Reminder;

  let inputAlias, divForm;
  let editStatus = false;
  let currentId = '';
  let validForm = false;
  const minDate: string = format_YYYYMMDD(new Date(), '-');

  onMount(() => {
    inputAlias.focus();
  });

  function getEmptyReminder(): Reminder {
    return {
      id: '',
      tipology: Tipology.CHECKIN,
      alias: '',
      provider: '',
      locatorId: '',
      date: null,
      amount: null
    };
  }

  $: {
    reminderOp, onAction();
  }

  $: {
    reminder, validateForm();
  }

  function onAction() {
    switch (reminderOp?.action) {
      case ActionType.REMOVE:
        removeReminder(idToRemove);
        break;

      case ActionType.UPDATE:
        editAction(reminderToUpdate);
        // divForm.focus();
        break;
    }
  }

  const validateForm = () => {
    const validation = {
      tipology: (data: string) => !!data,
      alias: (data: string) => !!data && data.length >= 3,
      provider: (data: string) => !!data && data.length >= 3,
      locatorId: (data: string) => !!data && data.length >= 5,
      date: (data: Date) => !!data,
      amount: (data: number, tipology: Tipology) => {
        if (tipology === Tipology.PAYMENT) {
          return !!data && data > 0;
        }
        return true;
      },
    };

    const validationArray = [
      validation.tipology(reminder.tipology),
      validation.alias(reminder.alias),
      validation.provider(reminder.provider),
      validation.locatorId(reminder.locatorId),
      validation.date(reminder.date),
      validation.amount(reminder.amount, reminder.tipology),
    ];

    validForm = validationArray.every((e) => e === true);
  };

  const addReminder = async () => {
    try {
      await addDoc(collection(db, 'Reminders'), {
        ...reminder,
        uid: $user['uid'],
        createdAt: Date.now(),
      });
      Toastify({
        text: 'Reminder task created',
        style: {
          background: 'linear-gradient(180deg, var(--color-fucs), var(--color-dark))',
        },
      }).showToast();
    } catch (error) {
      console.error(error);
    }
  };

  const updateReminder = async () => {
    try {
      await updateDoc(doc(db, 'Reminders', currentId), reminder);
      Toastify({
        text: 'Reminder task updated',
        style: {
          background: 'linear-gradient(180deg, var(--color-turq), var(--color-dark))',
        },
      }).showToast();
    } catch (error) {
      console.error(error);
    }
  };

  const removeReminder = async (id) => {
    try {
      await deleteDoc(doc(db, 'Reminders', id));
      Toastify({
        text: 'Reminder task deleted',
        style: {
          background: 'linear-gradient(180deg, red, var(--color-dark))',
        },
      }).showToast();
      // divForm.focus();
    } catch (error) {
      console.error(error);
    }
  };

  const editAction = (currentReminder) => {
    currentId = currentReminder.id;
    reminder.tipology = currentReminder.tipology;
    reminder.alias = currentReminder.alias;
    reminder.provider = currentReminder.provider;
    reminder.locatorId = currentReminder.locatorId;
    reminder.date = currentReminder.date;
    reminder.amount = currentReminder.amount;
    reminder.uid = currentReminder.uid;
    editStatus = true;
  };

  const submitAction = () => {
    if (!editStatus) {
      addReminder();
    } else {
      updateReminder();
      editStatus = false;
      currentId = '';
      // divForm.focus();
      // inputAlias.focus();
    }
    reminder = getEmptyReminder();
  };

  const cancelAction = () => {
    editStatus = false;
    currentId = '';
    reminder = getEmptyReminder();
  };
</script>

<div class="form-reminder" bind:this={divForm}>
  <form class="form" on:submit|preventDefault={submitAction}>
    <div class="field-container">
      <div class="field-subcontainer">
        <span class="icon-checklist field-icon" />
        <select class="field-input" name="tipology" bind:value={reminder.tipology} id="tipology">
          {#each Object.keys(Tipology) as optionKey}
            <option class="option" value={optionKey}>{$_(`app.main.form.${optionKey}`)}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="field-container">
      <div class="field-subcontainer">
        <span class="icon-user-ok field-icon" />
        <input
          class="capitalize field-input"
          type="text"
          name="alias"
          bind:value={reminder.alias}
          bind:this={inputAlias}
          id="alias"
          placeholder={$_('app.main.form.alias')}
          spellcheck="false"
          autocomplete="off"
        />
      </div>
    </div>

    <div class="field-container">
      <div class="field-subcontainer">
        <span class="icon-favorite-on field-icon" />
        <input
          class="capitalize field-input"
          type="text"
          name="provider"
          bind:value={reminder.provider}
          id="provider"
          placeholder={$_('app.main.form.provider')}
          spellcheck="false"
          autocomplete="off"
        />
      </div>
    </div>

    <div class="field-container">
      <div class="field-subcontainer">
        <span class="icon-success field-icon" />
        <input
          class="uppercase field-input"
          type="text"
          name="locatorId"
          bind:value={reminder.locatorId}
          id="locatorId"
          placeholder={$_('app.main.form.locatorId')}
          spellcheck="false"
          autocomplete="off"
        />
      </div>
    </div>

    <div class="field-container">
      <div class="field-subcontainer">
        <span class="icon-clock field-icon" />
        <input
          class="field-input"
          type="date"
          name="date"
          min={minDate}
          bind:value={reminder.date}
          id="date"
          autocomplete="off"
          placeholder={$_('app.main.form.date')}
        />
      </div>
    </div>

    <div class={reminder.tipology != Tipology.PAYMENT ? 'disabled' : 'field-container'}>
      <div class="field-subcontainer">
        <span class="icon-euro field-icon" />
        <input
          class="field-input"
          type="number"
          name="amount"
          bind:value={reminder.amount}
          id="amount"
          placeholder={$_('app.main.form.amount')}
          autocomplete="off"
        />
      </div>
    </div>

    <button class={!validForm || !$isLoggedIn ? 'button-cancel button-cancel--disabled' : 'button'} type="submit" disabled={!validForm || !$isLoggedIn}>
      {#if !editStatus}{$_('app.main.form.save')}{:else}{$_('app.main.form.update')}{/if}
    </button>
    {#if editStatus}
      <button on:click={cancelAction} class="button-cancel" type="reset">{$_('app.main.form.cancel')}</button>
    {/if}

    {#if !validForm}
      <!-- <div class="error">Formulario incompleto</div> -->
    {/if}
  </form>
</div>

<style type="scss">
  .form-reminder {
    background-color: var(--color-dark);
    margin: 4px;
    border-radius: 8px;
    box-shadow: var(--bg-shadow);
  }
  .form {
    padding: 16px 8px;

    select > option {
      background-color: var(--color-dark);
    }
  }

  input[type='text']::placeholder,
  input[type='number']::placeholder,
  input[type='date']::placeholder {
    text-transform: none;
    color: var(--color-placeholder);
  }

  .field-container {
    padding: 2px;
    caret-color: #f1f2f6;
    border-radius: 8px;
    background: var(--color-border);
    cursor: text;
    margin-bottom: 12px;

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

      .field-icon {
        color: var(--color-placeholder);
        font-size: 24px;
        padding: 0 8px;
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
      }
    }
  }

  .button {
    border: none;
    width: 100%;
    -moz-box-pack: center;
    padding: 8px 16px;
    cursor: pointer;
    background: -moz-linear-gradient(315deg, var(--color-turq) 0, var(--color-fucs) 100%);
    background: linear-gradient(135deg, var(--color-turq), var(--color-fucs));
    color: #f1f2f6;
    border-radius: 6px;
    font-size: 18px;
    line-height: 28px;
    margin-top: 12px;

    &:hover {
      background: linear-gradient(135deg, rgba(19, 200, 239, 1) 0%, rgba(184, 39, 237, 1) 99.48%);
    }
  }

  .button-cancel {
    background-color: var(--color-light);
    border: none;
    width: 100%;
    -moz-box-pack: center;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 18px;
    line-height: 28px;
    margin-top: 12px;
    cursor: pointer;
    &--disabled {
      color: var(--color-placeholder);
      cursor: auto;
    }
  }

  .error {
    padding: 12px 0 0;
    color: red;
  }
</style>
