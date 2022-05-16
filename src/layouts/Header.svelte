<script lang="ts">
  import type { User } from '../model/user.model';
  import { todayReminders } from '../services/store.service';
  import { auth } from '../firebase';
  import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
  import { user, isLoggedIn } from '../services/store.service';
  import { _ } from 'svelte-i18n';
  import { toast, ToastSeverity } from '../services/utils.service.svelte';

  let userLogin: User;

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      $user = res.user;
      $isLoggedIn = true;
      toast(ToastSeverity.INFO, $_('app.header.login_hello', { values: { name: userLogin.displayName } }));
    } catch (error) {
      toast(ToastSeverity.INFO, error);
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast(ToastSeverity.INFO, $_('app.header.logout_bye'));
      $user = {};
      $isLoggedIn = false;
    } catch (error) {
      toast(ToastSeverity.INFO, error);
      console.error(error);
    }
  };

  onAuthStateChanged(auth, (authUser) => {
    $user = authUser;
    $isLoggedIn = !!authUser;
    userLogin = authUser;
  });
</script>

<div class="header">
  <div>
    <span class="colours">{$_('app.header.today_reminders')}</span><span class="colours colours--fine">{$todayReminders}</span>
  </div>
  {#if $isLoggedIn}
    <div class="vertical-separator" />
    <div class="auth">
      <span class="auth" on:click={() => logout()}>{$_('app.header.logout')}</span>
      <img class="photo" src={userLogin.photoURL} alt={userLogin.displayName} on:click={() => logout()} />
    </div>
  {:else}
    <div class="auth">
      <span class="auth" on:click={() => login()}>{$_('app.header.login')}</span>
      <img class="photo" src="assets/img/google.svg" alt="Google" on:click={() => login()} />
    </div>
  {/if}
</div>

<style type="scss">
  .header {
    padding: 16px;
    display: flex;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    box-shadow: var(--bg-shadow);
  }

  .photo {
    object-fit: fill;
    height: 24px;
    border-radius: 4px;
    margin: 0 16px 0 8px;
    vertical-align: middle;
  }

  .auth {
    cursor: pointer;
    vertical-align: middle;
    user-select: none;
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

  .vertical-separator {
    border-left: solid 1px var(--color-text);
  }
</style>
