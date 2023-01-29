<template>
  <router-link class="character-card" :to="`/characters/${props.id}`">
    <img
      class="character-image"
      :src="props.image"
      :alt="props.name + ' image'"
    />
    <div class="character-info">
      <h2>{{ props.name }}</h2>
      <p v-if="props.gender">{{ props.species }} {{ props.gender }}</p>
      <p v-if="props.location.name">Location: {{ props.location.name }}</p>
      <p v-if="props.status">
        Status:
        <span
          :class="{
            alive: props.status === 'Alive',
            dead: props.status === 'Dead',
            unknown: props.status === 'unknown',
          }"
          >{{ props.status }}</span
        >
      </p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
interface Character {
  id: number;
  name: string;
  species: string;
  gender: string;
  location: Location;
  status: string;
  image: string;
}

interface Location {
  name: string;
  url: string;
}

const props = defineProps<Character>();
</script>

<style scoped lang="scss">
$breakpoint-sm: 13rem;
$breakpoint-md: $breakpoint-sm * 2 + 2rem;
$breakpoint-lg: $breakpoint-sm * 3 + 6rem;

@mixin for-at-least($breakpoint) {
  @media screen and (min-width: $breakpoint) {
    @content;
  }
}

.character-image {
  border-radius: 0.5rem;
  max-height: $breakpoint-sm - 1rem;
  @include for-at-least($breakpoint-lg) {
    max-height: $breakpoint-sm - 4rem;
  }
}

.character-info {
  row-gap: 0.2rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
}

.alive {
  color: green;
}

.dead {
  color: red;
}

.unknown {
  color: grey;
}
</style>
