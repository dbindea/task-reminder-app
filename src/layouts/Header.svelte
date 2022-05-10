<script lang="ts">
  import { todayReminders } from '../services/store.service';
  import { auth } from '../firebase';
  import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
  import { user, isLoggedIn } from '../services/store.service';
  import Toastify from 'toastify-js';


  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      $user = res.user;
      $isLoggedIn = true;

      Toastify({
        text: 'Bienvenido ' + $user['displayName'],
        style: {
          background: 'linear-gradient(180deg, var(--color-fucs), var(--color-dark))',
        },
      }).showToast();

      console.log('user', $user);
      
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);

      Toastify({
        text: 'Hasta luego!',
        style: {
          background: 'linear-gradient(180deg, var(--color-turq), var(--color-dark))',
        },
      }).showToast();

      $user = {};
      $isLoggedIn = false;

    } catch (error) {
      console.error(error);
    }
  };

  onAuthStateChanged(auth, (authUser) => {
    $user = authUser;
    $isLoggedIn = !!authUser;
  });

</script>

<div class="header">
  <div>
    <span class="colours">Today Reminders</span><span class="colours colours--fine">{$todayReminders}</span>
  </div>
  {#if $isLoggedIn}
    <span class="logout" on:click={() => logout()} >{$user['displayName']}</span>
  {:else}
    <img class="flag" src="assets/img/google.svg" alt="google" on:click={() => login()} />
  {/if}
</div>

<style type="scss">
  .header {
    padding: 16px;
    display: flex;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
  }

  .flag {
    cursor: pointer;
    object-fit: fill;
    height: 18px;
  }

  .logout {
    cursor: pointer;
    color: var(--color-text);
  }
  .colours {
    background: linear-gradient(135deg, var(--color-turq), var(--color-fucs));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 18px;
    font-weight: 600;
    &--fine {
      font-weight: 300;
      margin-left: 8px;
    }
  }
</style>
