<template>
  <td class="checkboxColumn">
    <input
      type="checkbox"
      @change="$emit('invertComleted')"
      :checked="isCompleted"
    />
  </td>
  <td class="nameColumn">{{ task }}</td>
  <td>
    <button class="dangerButton" @click="$emit('deleteTodo')">Delete</button>
  </td>
</template>

<script setup lang="ts">
interface Props {
  task: string;
  isCompleted: boolean;
}

const props = defineProps<Props>();

interface Emits {
  (e: "deleteTodo"): void;
  (e: "invertComleted"): void;
}

const emit = defineEmits<Emits>();
</script>

<style scoped lang="scss">
.dangerButton {
  height: 1.9rem;
  color: #ffffff;
  background-image: linear-gradient(-180deg, #c8511d 0%, #e16937 100%);
  border: 0;
  border-radius: 0.5rem;
  padding: 0.1rem 0.7rem;
  text-align: center;
  font-size: 0.9rem;
  cursor: pointer;
  touch-action: manipulation;
  &:hover {
    background-image: linear-gradient(-180deg, #e26a36 0%, #e88a63 100%);
  }
}

.checkboxColumn {
  text-align: left;
  width: 10%;
}

.nameColumn {
  word-break: break-all;
}
</style>
