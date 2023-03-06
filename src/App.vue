<template>
  <v-app>
    <v-main>
      <template v-if="userStore.token">
        <v-toolbar :elevation="8">
          <v-app-bar-nav-icon @click="showDrawer = !showDrawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Estoque</v-toolbar-title>
        </v-toolbar>
          <v-navigation-drawer
            v-model="showDrawer"
            temporary
          >
            <v-list class="nav" density="compact" nav>
              <div>
                <v-list-item prepend-icon="mdi-view-dashboard" title="Home" link :to="{ name: 'Home' }"></v-list-item>
              </div>
              <div>
                <v-list-item prepend-icon="mdi-logout" title="Sair" @click="logout"></v-list-item>
              </div>
            </v-list>
          </v-navigation-drawer>
      </template>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useUserStore } from '@/store/user';
import router from './router';

  const showDrawer = ref(false);
  const userStore = useUserStore()

  function logout() {
    userStore.logout();
    router.push({ name: 'Login' });
  }
</script>

<style lang="scss">
  .nav {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }
</style>