<template>
  <h1 class="page-heading">Rick and Morty Characters</h1>

  <div v-if="state.isLoading === true" class="loader"></div>
  <div v-else-if="state.isError === true">Error</div>

  <div v-else>
    <div class="button-wrapper">
      <button
        :disabled="page === 1"
        @click="handlePrevPage"
        class="regular-button"
      >
        Previous
      </button>

      <button
        :disabled="page === pageCount"
        @click="handleNextPage"
        class="regular-button"
      >
        Next
      </button>
    </div>

    <ul class="character-list">
      <li
        v-for="character in visibleCharacters"
        :key="character.id"
        class="card-container"
      >
        <CharacterCard
          :id="character.id"
          :name="character.name"
          :species="character.species"
          :gender="character.gender"
          :location="character.location"
          :status="character.status"
          :image="character.image"
        />
      </li>
    </ul>

    <div v-if="visibleCount < totalCharacterCount" class="button-wrapper">
      <button
        @click="visibleCount += LOAD_MORE_CHARACTER_COUNT"
        class="regular-button"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import type { Character } from "../types/Character";
import CharacterCard from "../components/ChracterCard.vue";

const route = useRoute();
const router = useRouter();

const url = ref("https://rickandmortyapi.com/api/character");
const state = reactive({
  charaters: [] as Character[],
  isLoading: false,
  isError: false,
});

const DEFAULT_VISIBLE_CHARACTER_COUNT = 8;
const LOAD_MORE_CHARACTER_COUNT = 4;
const visibleCount = ref(DEFAULT_VISIBLE_CHARACTER_COUNT);

const page = ref(Number(route.query.page) || 1);
const pageCount = ref(0);

onMounted(async () => {
  fetchData(page.value);
});

const fetchData = async (page: number) => {
  try {
    state.isLoading = true;
    const { data } = await axios.get(`${url.value}?page=${page}`);
    // console.log(data);
    state.charaters = data.results.map((character: Character) => {
      return {
        id: character.id,
        name: character.name,
        species: character.species,
        gender: character.gender,
        location: character.location,
        status: character.status,
        image: character.image,
      };
    });
    pageCount.value = data.info.pages;
    setTimeout(async () => {
      state.isLoading = false;
    }, 500);
  } catch (error) {
    state.isLoading = false;
    state.isError = true;
    console.log("error", error);
  }
  return;
};

const visibleCharacters = computed(() => {
  return state.charaters.filter((_, index) => {
    return index < visibleCount.value;
  });
});

const totalCharacterCount = computed(() => {
  return state.charaters.length;
});

const handlePrevPage = () => {
  page.value--;
  fetchData(page.value);
  setQueryNewPage();
};

const handleNextPage = () => {
  page.value++;
  fetchData(page.value);
  setQueryNewPage();
};

const setQueryNewPage = () => {
  visibleCount.value = DEFAULT_VISIBLE_CHARACTER_COUNT;
  router.push({
    query: {
      page: page.value,
    },
  });
};
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

.character-list {
  margin-top: 1rem;
  display: grid;
  gap: 1rem;
  @include for-at-least($breakpoint-lg) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card-container .character-card {
  color: black;
  text-decoration: none;
  max-width: $breakpoint-sm;
  padding: 0.25rem;
  border: 2px solid #bbb;
  border-radius: 1rem;
  display: flex;
  gap: 0.5rem;
  flex: flex-shrink;
  flex-direction: column;
  transition: ease-in-out 0.2s;
  @include for-at-least($breakpoint-md) {
    max-width: 100%;
    flex-direction: row;
    padding: 1rem;
  }
  @include for-at-least($breakpoint-lg) {
    max-width: $breakpoint-md;
    height: 100%;
  }
  &:hover {
    transform: scale(104%);
  }
}

.button-wrapper {
  margin-top: 1rem;
  gap: 0.25rem;
  display: flex;
  justify-content: center;
}

.regular-button {
  height: 1.9rem;
  min-width: 5rem;
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
