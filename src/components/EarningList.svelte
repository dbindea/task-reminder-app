<script lang="ts">
  import { db } from '../firebase';
  import { onMount } from 'svelte';
  import { onSnapshot, collection, where, query, orderBy } from 'firebase/firestore';
  import { format_YYYYMMDD } from '../services/utils.service.svelte';
  import { todayEarnings, totalEarnings, isLoggedIn, user, filterValue } from '../services/store.service';
  import { _ } from 'svelte-i18n';
  import type { Earning } from '../model/Earning.svelte';
  import type { User } from '../model/user.model';
  import type { Unsubscribe } from 'firebase/auth';
  import EarningCard from './EarningCard.svelte';
  import type { AppType } from '../model/AppType.svelte';

  export let collectionName: AppType;

  let items: Earning[] = [];
  let filterEarnings: Earning[] = [];
  const today = format_YYYYMMDD(new Date(), '-');

  const watchFirestore = (uid: string): Unsubscribe => {
    const q = query(collection(db, collectionName), where('uid', '==', uid), where('date', '<=', today), orderBy('date', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      items = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Earning[];
    });
  };

  $: {
    items, updateStore();
  }

  function updateStore() {
    filterEarnings = filterByValue($filterValue);
    
    totalEarnings.update(() =>
      filterEarnings.reduce((prev, cur) => {
        return prev + cur.amount;
      }, 0),
    );

    todayEarnings.update(() =>
      items
        .filter((r: Earning) => format_YYYYMMDD(r.date, '-') === today)
        .reduce((prev, cur) => {
          return prev + cur.amount;
        }, 0),
    );
  }

  onMount(() => {
    isLoggedIn.subscribe((isLogged) => {
      if (isLogged && ($user as User).uid) {
        watchFirestore(($user as User).uid);
      } else {
        items = [];
      }
    });

    filterValue.subscribe((filterValue) => {
      filterEarnings = filterByValue(filterValue);
      totalEarnings.update(() => filterEarnings.length);
    });
  });

  const filterByValue = (value: string) => {
    if (value) {
      return items.filter((reminder: Earning) => {
        const reminderString = Object.keys(reminder)
          .map((key) => reminder[key])
          .join(' ');
        return reminderString?.toLowerCase().includes(value.toLowerCase());
      });
    } else {
      return items;
    }
  };
</script>

<div class="reminder-list">
  {#if !$isLoggedIn}
    <div class="panel">{$_(`app.${collectionName}.main.list.no_auth`)}</div>
  {:else if !items.length}
    <div class="panel">{$_(`app.${collectionName}.main.list.no_reminder`)}</div>
  {/if}
  {#each filterEarnings as earning}
    <EarningCard {collectionName} {earning} on:remove on:update />
  {/each}
</div>

<style type="scss">
  .reminder-list {
    padding: 8px;
  }

  .panel {
    padding: 64px;
    text-align: center;
    line-height: 32px;
    letter-spacing: 0.5px;
    border: solid 2px var(--color-border);
    border-radius: 8px;
    margin: 16px 0;
  }
</style>
