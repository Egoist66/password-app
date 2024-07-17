<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { defineAsyncComponent } from 'vue';

const AsyncLayout = defineAsyncComponent(() => import('./components/layouts/Layout.vue'));

</script>

<template>
  <div>

    <Transition>
      <AsyncLayout>
        <template #header>  
            <nav class="flex flex-wrap gap-5">
               
              <div>
                <RouterLink active-class="active-nav" to="/">Home</RouterLink>
              </div>
              <div>
                <RouterLink active-class="active-nav" to="/about">About</RouterLink>
  
              </div>               
                                
            </nav>
            
        </template>
  
        <RouterView v-slot="{ Component }">

          <Transition mode="out-in">
            <component :is="Component"></component>
          </Transition>

        </RouterView>
  
  
      </AsyncLayout>
    </Transition>
  </div>

</template>

<style>

  nav a {
    color: white;
    transition: 0.5s all ease;

  }

  .active-nav {
    color: #6366F1;
    transition: 0.5s all ease;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }


</style>
