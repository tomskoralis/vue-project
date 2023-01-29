<template>
  <h1 class="page-heading">Rick and Morty Character</h1>

  <div v-if="state.isLoading === true" class="loader"></div>
  <div v-else-if="state.error">Error</div>

  <div v-else>
    <div v-if="state.character" class="character-container">
      <div class="image-wrapper">
        <img
          class="character-image"
          :src="state.character.image"
          :alt="`${state.character?.name} image`"
        />
        <p
          class="character-status"
          :class="{
            alive: state.character.status === 'Alive',
            dead: state.character.status === 'Dead',
            unknown: state.character.status === 'unknown',
          }"
        >
          {{ state.character.status }}
        </p>
      </div>

      <div class="character-info">
        <div>
          <h2>{{ state.character?.name }}</h2>
          <p>Species: {{ state.character.species }}</p>
          <p>Gender: {{ state.character.gender }}</p>
          <p>Origin: {{ state.character.origin.name }}</p>
          <p>
            Appeared in: {{ state.character.episode.length }} episode<span
              v-if="state.character.episode.length > 1"
              >s</span
            >
          </p>
          <p>Last known location: {{ state.character.location.name }}</p>
        </div>

        <button @click="router.back()" class="back-button">Go back</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from "@/types/Character";
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Location } from "@/types/Location";

interface SingleCharacter extends Character {
  episode: Array<String>;
  origin: Location;
}

const url = "https://rickandmortyapi.com/api/character/";
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const state = reactive({
  isLoading: false,
  character: null as SingleCharacter | null,
  error: "",
});

const fetchSingleCharacter = async () => {
  try {
    state.isLoading = true;
    const { data } = await axios.get(`${url}${id}`);
    state.character = data;
    setTimeout(async () => {
      state.isLoading = false;
    }, 1000);
  } catch (error) {
    state.isLoading = false;
    state.error = String(error);
  }
};

onMounted(() => {
  fetchSingleCharacter();
});
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader {
  margin: 1rem auto;
  border: 1rem solid white;
  border-top: 1rem solid grey;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  animation: spin 2s linear infinite;
}

.character-container {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  column-gap: 0.5rem;
  @include for-at-least($breakpoint-md) {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
}

.image-wrapper {
  .character-image {
    border-radius: 1rem;
    max-height: $breakpoint-sm;
    @include for-at-least($breakpoint-md) {
      min-width: $breakpoint-sm;
    }
    @include for-at-least($breakpoint-lg) {
      max-height: $breakpoint-md;
    }
  }
  .character-status {
    position: absolute;
    font-weight: bold;
    font-variant: small-caps;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 2rem;
    border: 2px white solid;
    box-shadow: white 0 0 1rem, white 0 0 0.2rem;
    top: 0.5rem;
    left: 0.5rem;
  }
}

.character-info {
  row-gap: 0.2rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
}

.alive {
  background-color: green;
}

.dead {
  background-color: red;
}

.unknown {
  background-color: grey;
}

.back-button {
  height: 1.9rem;
  color: #ffffff;
  background-image: linear-gradient(-180deg, #1d95c9 0%, #17759c 100%);
  border: 0;
  border-radius: 0.5rem;
  padding: 0.1rem 0.7rem;
  text-align: center;
  font-size: 0.9rem;
  cursor: pointer;
  touch-action: manipulation;
  width: max-content;
  &:hover {
    background-image: linear-gradient(-180deg, #37aee2 0%, #1e96c8 100%);
  }
  &:disabled {
    background-image: linear-gradient(-180deg, #bbb 0%, #999 100%);
    cursor: not-allowed;
  }
}
</style>
