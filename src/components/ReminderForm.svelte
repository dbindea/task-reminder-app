<script lang="ts">
  import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
  import { createEventDispatcher, onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { db } from '../firebase';
  import { ActionType } from '../model/ActionType.svelte';
  import type { AppType } from '../model/AppType.svelte';
  import { Reminder, Tipology, hiddenOptionsByTipology } from '../model/Reminder.svelte';
  import type { User } from '../model/user.model';
  import { isLoggedIn, resetOperation, user } from '../services/store.service';
  import { ToastSeverity, format_YYYYMMDD, toast, trim } from '../services/utils.service.svelte';

  let reminder: Reminder = getEmptyCollection();
  export let collectionName: AppType;
  export let operation: { action: ActionType };
  export let objectToUpdate: Reminder;

  let inputAlias;
  let editStatus = false;
  let validForm = false;
  let hasShownMsg = false;
  let currentId = '';
  const today: string = format_YYYYMMDD(new Date(), '-');

  const dispatch = createEventDispatcher();
  const clearEvent = () => {
    dispatch('clear');
  };

  onMount(() => {
    inputAlias.focus();
  });

  function getEmptyCollection(): Reminder {
    return {
      alias: '',
      amount: null,
      date: null,
      id: '',
      locatorId: '',
      provider: '',
      tipology: null,
    };
  }

  $: {
    operation, onAction();
  }

  $: {
    reminder, validateForm();
  }

  function onAction() {
    switch (operation?.action) {
      case ActionType.REMOVE:
        remove(objectToUpdate);
        break;

      case ActionType.UPDATE:
        editAction(objectToUpdate);
        break;
    }
  }

  const validateForm = () => {
    const validation = {
      alias: (data: string) => !!data && data.length >= 3,
      amount: (data: number, tipology: Tipology) => hiddenOptionsByTipology[tipology]?.amount || (!!data && data > 0),
      date: (data: Date) => !!data,
      locatorId: (data: string, tipology: Tipology) => hiddenOptionsByTipology[tipology]?.locatorId || (!!data && data.length >= 5),
      provider: (data: string, tipology: Tipology) => hiddenOptionsByTipology[tipology]?.provider || (!!data && data.length >= 2),
      tipology: (data: string) => !!data,
    };

    const validationArray = [
      validation.alias(reminder.alias),
      validation.amount(reminder.amount, reminder.tipology),
      validation.date(reminder.date),
      validation.locatorId(reminder.locatorId, reminder.tipology),
      validation.provider(reminder.provider, reminder.tipology),
      validation.tipology(reminder.tipology),
    ];

    validForm = validationArray.every((e) => e === true);

    if (validForm && !hasShownMsg) {
      toast(ToastSeverity.INFO, $_(`app.${collectionName}.main.form.validate_msg`));
      hasShownMsg = true;
    }
  };

  const insert = async () => {
    try {
      await addDoc(collection(db, collectionName), {
        ...reminder,
        uid: ($user as User).uid,
        email: ($user as User).email,
        createdAt: Date.now(),
      });
      toast(ToastSeverity.SUCCESS, $_(`app.${collectionName}.main.form.add_msg`));
    } catch (error) {
      toast(ToastSeverity.ERROR, error);
      console.error(error);
    }
  };

  const update = async () => {
    try {
      await updateDoc(doc(db, collectionName, currentId), reminder);
      toast(ToastSeverity.INFO, $_(`app.${collectionName}.main.form.update_msg`));
    } catch (error) {
      toast(ToastSeverity.ERROR, error);
      console.error(error);
    }
  };

  const remove = async (object) => {
    try {
      await updateDoc(doc(db, collectionName, object.id), { ...object, isDeleted: true });
      toast(ToastSeverity.ERROR, $_(`app.${collectionName}.main.form.remove_msg`));
      $resetOperation = true;
    } catch (error) {
      toast(ToastSeverity.ERROR, error);
      console.error(error);
    }
  };

  const editAction = (current) => {
    currentId = current.id;
    reminder = { ...current };
    editStatus = true;
    document.body.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const submitAction = () => {
    reminder.alias = trim(reminder.alias);
    reminder.locatorId = trim(reminder.locatorId);
    reminder.provider = trim(reminder.provider);

    if (!editStatus) {
      insert();
    } else {
      update();
      editStatus = false;
      currentId = '';
    }
    hasShownMsg = false;
    reminder = getEmptyCollection();
  };

  const cancelAction = () => {
    editStatus = false;
    hasShownMsg = false;
    currentId = '';
    reminder = getEmptyCollection();
  };
</script>

<div class="form-collection">
  <form class="form" on:submit|preventDefault={submitAction}>
    <!-- TIPOLOGY -->
    <div class="field-container">
      <div class="field-subcontainer">
        <span class="icon-checklist field-icon" />
        <select class="field-input" name="tipology" bind:value={reminder.tipology} id="tipology">
          <option class="option" value={null} disabled>{$_(`app.${collectionName}.main.form.option_empty`)}</option>
          {#each Object.keys(Tipology) as optionKey}
            <option class="option" value={optionKey}>{$_(`app.${collectionName}.main.form.${optionKey}`)}</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- ALIAS -->
    <div class="field-container">
      <div class="field-subcontainer">
        <span class="icon-edit field-icon" />
        <input
          class="capitalize field-input"
          type="text"
          name="alias"
          bind:value={reminder.alias}
          bind:this={inputAlias}
          id="alias"
          placeholder={$_(`app.${collectionName}.main.form.alias`)}
          spellcheck="false"
          autocomplete="off"
        />
      </div>
    </div>

    <!-- PROVIDER -->
    <div class="field-container" class:disabled={hiddenOptionsByTipology[reminder.tipology]?.provider}>
      <div class="field-subcontainer">
        <span class="icon-favorite-on field-icon" />
        <input
          class="uppercase field-input"
          type="text"
          name="provider"
          bind:value={reminder.provider}
          id="provider"
          placeholder={$_(`app.${collectionName}.main.form.provider`)}
          spellcheck="false"
          autocomplete="off"
        />
      </div>
    </div>

    <!-- LOCATOR -->
    <div class="field-container" class:disabled={hiddenOptionsByTipology[reminder.tipology]?.locatorId}>
      <div class="field-subcontainer">
        <span class="icon-success field-icon" />
        <input
          class="uppercase field-input"
          type="text"
          name="locatorId"
          bind:value={reminder.locatorId}
          id="locatorId"
          placeholder={$_(`app.${collectionName}.main.form.locatorId`)}
          spellcheck="false"
          autocomplete="off"
        />
      </div>
    </div>

    <!-- DATE -->
    <div class="field-container">
      <div class="field-subcontainer">
        <span class="icon-clock field-icon" />
        <input
          class="field-input"
          type="date"
          name="date"
          min={today}
          bind:value={reminder.date}
          id="date"
          autocomplete="off"
          placeholder={$_(`app.${collectionName}.main.form.date`)}
        />
      </div>
    </div>

    <!-- AMOUNT -->
    <div class="field-container" class:disabled={hiddenOptionsByTipology[reminder.tipology]?.amount}>
      <div class="field-subcontainer">
        <span class="icon-euro field-icon" />
        <input
          class="field-input"
          type="number"
          name="amount"
          bind:value={reminder.amount}
          id="amount"
          step="0.01"
          placeholder={$_(`app.${collectionName}.main.form.amount`)}
          autocomplete="off"
        />
      </div>
    </div>

    <button
      class={!validForm || !$isLoggedIn ? 'button-cancel button-cancel--disabled' : 'button'}
      disabled={!validForm || !$isLoggedIn}
      on:click={() => clearEvent()}
    >
      {#if !editStatus}{$_(`app.${collectionName}.main.form.save`)}{:else}{$_(`app.${collectionName}.main.form.update`)}{/if}
    </button>
    {#if editStatus}
      <button on:click={cancelAction} class="button-cancel" type="reset" on:click={() => clearEvent()}>{$_(`app.${collectionName}.main.form.cancel`)}</button>
    {/if}
  </form>
</div>

<style type="scss">
  .form-collection {
    background-color: var(--color-dark);
    margin: 4px;
    border-radius: 8px;
    box-shadow: var(--bg-shadow);
  }
  .form {
    padding: 16px 8px;

    select > option {
      background-color: var(--color-dark);
      &[disabled] {
        color: var(--color-placeholder);
      }
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
    caret-color: var(--color-text);
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
    color: var(--color-text);
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
</style>
