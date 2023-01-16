<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="pageContainer">
    <nav class="navigationLinks">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/tracker">Task Tracker</RouterLink>
      <RouterLink to="/characters">Characters</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.pageContainer {
  min-width: 15rem;
  max-width: 44rem;
  margin: 0 auto;
  padding: 2rem;
  border: 2px solid #bbb;
  border-radius: 1rem;
}
.navigationLinks {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
