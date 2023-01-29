<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import MainContainer from "./components/MainContainer.vue";
</script>

<template>
  <MainContainer>
    <nav class="navigation-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/tracker">Task Tracker</RouterLink>
      <RouterLink to="/characters">Characters</RouterLink>
      <RouterLink to="/form">Form</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <RouterView />
  </MainContainer>
</template>

<style scoped lang="scss">
.navigation-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
