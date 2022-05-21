<script lang="ts">
  import type { User } from '../model/user.model';
  import { isVisibleMenu, todayReminders } from '../services/store.service';
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
      toast(ToastSeverity.ERROR, error);
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
      toast(ToastSeverity.ERROR, error);
      console.error(error);
    }
  };

  onAuthStateChanged(auth, (authUser) => {
    $user = authUser;
    $isLoggedIn = !!authUser;
    userLogin = authUser;
  });

  const toggle = () => {
    $isVisibleMenu = !$isVisibleMenu;
  };
</script>

<div class="header">
  <div class="header-option">
    <span class={$isVisibleMenu ? 'icon-cross toggle' : 'icon-hamburger toggle'} on:click={toggle} />
  </div>
  <div class="header-option">
    <span class="colours">{$_('app.header.today_reminders')}</span><span class="colours colours--fine">{$todayReminders}</span>
  </div>
  {#if $isLoggedIn}
    <div class="auth header-option--right">
      <span class="auth" on:click={() => logout()}>{$_('app.header.logout')}</span>
      <img class="photo" src={userLogin.photoURL} alt="" on:click={logout} />
    </div>
  {:else}
    <div class="auth header-option--right">
      <span class="auth" on:click={() => login()}>{$_('app.header.login')}</span>
      <img class="photo" src="assets/img/google.svg" alt="Google" on:click={login} />
    </div>
  {/if}
</div>

<style type="scss">
  .header {
    padding: 8px;
    margin-bottom: 8px;
    box-shadow: var(--bg-shadow);
    height: 42px;
  }

  .header-option {
    float: left;
    padding: 8px;
    &--right {
      float: right;
      padding: 8px;
    }
  }

  .toggle {
    font-size: 24px;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
  }

  .photo {
    object-fit: fill;
    height: 24px;
    border-radius: 4px;
    margin: 0 16px 0 8px;
    vertical-align: middle;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.5);
    }
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
</style>
