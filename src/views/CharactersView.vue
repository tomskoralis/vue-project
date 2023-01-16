<template>
  <h1 class="PageHeading"> Rick and Morty Characters</h1>
  <div class="loader" v-if="state.isLoading === true"></div>
  <ul class="cardContainer" v-else>
    <li
      class="characterCard"
      v-for="character in state.charaters"
      :key="character.id"
    >
      <h2>{{ character.name }}</h2>
      <p>{{ character.species }} {{ character.gender }}</p>
      <p>Location: {{ character.location.name }}</p>
      <p>Status: {{ character.status }}</p>
      <img class="characterImage" :src="character.image" alt="Image Missing" />
    </li>
  </ul>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
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

const url = ref("https://rickandmortyapi.com/api/character");
const state = reactive({
  charaters: [] as Character[],
  isLoading: false,
});

onMounted(async () => {
  state.isLoading = true;
  const data = await fetchData(url.value);
  state.charaters = await data.results.map((character: Character) =>
    arrangeCharacter(character)
  );
  //   setTimeout(async () => {
  //     const data = await fetchData(url.value);
  //     state.charaters = data.results.map((character: Character) =>
  //       arrangeCharacter(character)
  //     );
  //     state.isLoading = false;
  //     console.log(data);
  //   }, 5000);
});

const fetchData = async (url: string): Promise<any> => {
  const response = await fetch(url);
  const data = await response.json();
  state.isLoading = false;
  return data;
};

const arrangeCharacter = (character: Character) => {
  return {
    id: character.id,
    name: character.name,
    species: character.species,
    gender: character.gender,
    location: character.location,
    status: character.status,
    image: character.image,
  };
};
</script>
<style scoped lang="scss">
.PageHeading {
  width: fit-content;
  margin: 0 auto;
}

$breakpoint-md: 27rem;

@mixin for-at-least($breakpoint) {
  @media screen and (max-width: $breakpoint) {
    @content;
  }
}
.flexContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 1rem;
  @include for-at-least($breakpoint-md) {
    flex-direction: column;
    flex: flex-shrink;
  }
}

.loader {
  margin: 0 auto;
  border: 1rem solid #fff;
  border-top: 1rem solid #555;
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.cardContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  padding: 0;
}

.characterCard {
  width: 13rem;
  padding: 1rem;
  border: 2px solid #bbb;
  border-radius: 1rem;
}

.characterImage {
  width: fit-content;
  border-radius: 0.5rem;
  border: 2px solid #000;
}
</style>
