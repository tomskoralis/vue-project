<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.container {
  min-width: 12rem;
  max-width: 55rem;
  margin: 0 auto;
  padding: 1rem;
  border: 2px solid #bbb;
  border-radius: 1rem;
}
</style>
