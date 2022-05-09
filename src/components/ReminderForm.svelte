<script lang="ts">
  import { db } from '../firebase';
  import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
  import { Reminder, Tipology } from '../model/Reminder.model.svelte';
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { ActionType } from '../model/ActionType.model.svelte';
  import { format_YYYYMMDD } from '../services/utils.service.svelte';

  export let reminder: Reminder = getEmptyReminder();
  export let reminderOp: { action: ActionType };

  export let idToRemove: string;
  export let reminderToUpdate: Reminder;

  let inputAlias;
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
      amount: null,
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
        createdAt: Date.now(),
      });
      /* Toastify({
        text: "New Task created",
      }).showToast(); */
    } catch (error) {
      console.error(error);
    }
  };

  const updateReminder = async () => {
    try {
      await updateDoc(doc(db, 'Reminders', currentId), reminder);
      /*  Toastify({
        text: "Task updated",
      }).showToast(); */
    } catch (error) {
      console.error(error);
    }
  };

  const removeReminder = async (id) => {
    try {
      await deleteDoc(doc(db, 'Reminders', id));
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
    editStatus = true;
  };

  const submitAction = () => {
    if (!editStatus) {
      addReminder();
    } else {
      updateReminder();
      editStatus = false;
      currentId = '';
    }
    reminder = getEmptyReminder();
    inputAlias.focus();
  };

  const cancelAction = () => {
    editStatus = false;
    currentId = '';
    reminder = getEmptyReminder();
  };
</script>

<div class="form-reminder">
  <form class="form" on:submit|preventDefault={submitAction}>
    <div class="field-container">
      <div class="field-subcontainer">
        <span class="icon-checklist field-icon" />
        <select class="field-input" name="tipology" bind:value={reminder.tipology} id="tipology">
          {#each Object.keys(Tipology) as optionKey}
            <option value={optionKey}>{$_(`app.main.form.${optionKey}`)}</option>
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
        <span class="icon-language field-icon" />
        <input
          class="capitalize field-input"
          type="text"
          name="provider"
          bind:value={reminder.provider}
          id="provider"
          placeholder={$_('app.main.form.provider')}
          spellcheck="false"
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
        />
      </div>
    </div>

    <div class="field-container">
      <div class="field-subcontainer">
        <span class="icon-clock field-icon" />
        <input class="field-input" type="date" name="date" min={minDate} bind:value={reminder.date} id="date" />
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

    <button class={!validForm ? 'button--disabled' : 'button'} type="submit" disabled={!validForm}>
      {#if !editStatus}{$_('app.main.form.save')}{:else}{$_('app.main.form.update')}{/if}
    </button>
    {#if editStatus}
      <button on:click={cancelAction} class="f" type="reset">{$_('app.main.form.cancel')}</button>
    {/if}

    {#if !validForm}
      <!-- <div class="error">Formulario incompleto</div> -->
    {/if}
  </form>
</div>

<style type="scss">
  .form-reminder {
    -webkit-box-shadow: 0 4px 250px 200px rgb(18 61 112 / 60%);
    box-shadow: 0 4px 250px 200px rgb(18 61 112 / 60%);
    margin: 4px;
    border-radius: 8px;
  }
  .form {
    padding: 16px 8px;

    select > option {
      background-color: #ffffff;
    }
  }

  input[type='text']::placeholder {
    text-transform: none;
  }

  .field-container {
    padding: 2px;
    caret-color: #f1f2f6;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.18);
    cursor: text;
    margin-bottom: 12px;

    &:hover {
      background: -webkit-gradient(linear, left top, left bottom, from(#3ddcff), to(#d150ff));
      background: -moz-linear-gradient(top, #3ddcff 0, #d150ff 100%);
      background: linear-gradient(180deg, #3ddcff, #d150ff);
    }

    .field-subcontainer {
      background: #0b1b2e;
      border-radius: 8px;
      display: flex;
      align-items: center;
      height: 48px;

      .field-icon {
        color: #617389;
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
        color: rgba(255, 255, 255, 0.7);
        text-shadow: 0 0 4px rgb(0 0 0 / 40%);

        background-clip: text;
        -webkit-background-clip: text;

        input::placeholder {
          color: #617389;
        }

        option {
          color: rgb(15 46 82);
          text-shadow: 0 0 4px rgb(0 0 0 / 40%);
        }
      }
    }
  }

  .button {
    border: none;
    width: 100%;
    -moz-box-pack: center;
    padding: 8px 16px;
    cursor: pointer;
    background: -moz-linear-gradient(315deg, #3ddcff 0, #d150ff 100%);
    background: linear-gradient(135deg, #3ddcff, #d150ff);
    color: #f1f2f6;
    border-radius: 6px;
    font-size: 18px;
    line-height: 28px;
    margin-top: 12px;

    &:hover {
      background: linear-gradient(135deg, rgba(19, 200, 239, 1) 0%, rgba(184, 39, 237, 1) 99.48%);
    }
  }

  .button--disabled {
    background-color: rgb(15 46 82);
    border: none;
    width: 100%;
    -moz-box-pack: center;
    padding: 8px 16px;
    color: #b7bfc8;
    border-radius: 6px;
    font-size: 18px;
    line-height: 28px;
    margin-top: 12px;
  }

  .error {
    padding: 12px 0 0;
    color: red;
  }
</style>
