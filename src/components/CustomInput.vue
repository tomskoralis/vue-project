<template>
  <div class="input-wrapper">
    <label>
      {{ props.label }}
      <div>
        <input
          type="text"
          v-bind="$attrs"
          :value="inputValue"
          @input="updateValue"
          :id="props.id"
          :placeholder="props.placeholder"
        />
      </div>
    </label>
    <p v-if="error" class="error">{{ props.error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

interface Props {
  id: string;
  inputValue: string;
  placeholder?: string;
  label?: string;
  error?: string;
}

interface Emits {
  (e: "update:inputValue", newValue: string): void;
}

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Input",
});

const updateValue = (e: Event) => {
  emit("update:inputValue", (e.target as HTMLInputElement).value);
};
</script>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  max-width: 20rem;
  border: 2px solid #aaa;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
}

.error {
  color: red;
}
</style>
