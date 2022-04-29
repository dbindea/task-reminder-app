<script lang="ts">
  import { db } from '../firebase';
  import { onSnapshot, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
  import { Reminder, Tipology } from '../model/Reminder.model.svelte';
  import { onDestroy } from 'svelte';

  let reminder: Reminder = getEmptyReminder();
  let reminders: Reminder[] = [];

  let inputReminder;
  let editStatus = false;
  let currentId = '';

  function getEmptyReminder(): Reminder {
    return {
      id: '',
      tipology: Tipology.CHECKIN,
      alias: '',
      provider: '',
      locatorId: '',
      date: null,
      amount: 0,
    };
  }

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

  const deleteReminder = async (id) => {
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
    // if (!reminder.title) return;
    if (!editStatus) {
      addReminder();
    } else {
      updateReminder();
      editStatus = false;
      currentId = '';
    }
    reminder = getEmptyReminder();
    // inputElement.focus();
  };

  const cancelAction = () => {
    editStatus = false;
    currentId = '';
    reminder = getEmptyReminder();
  };

  const unsubscribe = onSnapshot(
    collection(db, 'Reminders'),
    (querySnapshot) => {
      reminders = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Reminder[]; //not sure
    },
    (err) => {
      console.error(err);
    },
  );

  onDestroy(unsubscribe);
</script>

<div class="new-reminder">
  <form class="form" on:submit|preventDefault={submitAction}>
    <select class="form-item" name="tipology" bind:value={reminder.tipology} id="tipology">
      <option value="CHECKIN">Checkin</option>
      <option value="PAYMENT">Payment</option>
    </select>
    <input
      class="form-item capitalize"
      type="text"
      name="alias"
      bind:value={reminder.alias}
      id="alias"
      placeholder="Alias"
      spellcheck="false"
      autocomplete="off"
    />
    <input class="form-item capitalize" type="text" name="provider" bind:value={reminder.provider} id="provider" placeholder="Proveedor" spellcheck="false" />
    <input
      class="form-item uppercase"
      type="text"
      name="locatorId"
      bind:value={reminder.locatorId}
      id="locatorId"
      placeholder="Localizador"
      spellcheck="false"
      autocomplete="off"
    />
    <input class="form-item" type="date" name="date" bind:value={reminder.date} id="date" placeholder="Fecha recordatorio" />
    <input class="form-item" type="number" name="amount" bind:value={reminder.amount} id="amount" placeholder="Importe" autocomplete="off" />
    <button class="form-item" type="submit">Save</button>
  </form>
</div>

<style type="scss">
  .new-reminder {
    background-color: #425968;
  }
  .form {
    padding: 8px;

    input:focus:hover,
    select:focus:hover,
    textarea:focus:hover {
      border-color: #2d96cd;
    }

    input::placeholder,
    select::placeholder,
    textarea::placeholder {
      color: #d6e0eb;
    }

    select > option {
      color: #425968;
      background-color: #ffffff;
    }
  }

  .form-item {
    width: 100%;
  }

  .capitalize {
    text-transform: capitalize;
  }

  input[type='text']::placeholder {
    text-transform: none;
  }

  .uppercase {
    text-transform: uppercase;
  }

  input[type='date'] {
    i {
      color: #ffffff;
    }
  }
</style>
