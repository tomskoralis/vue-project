<template>
  <form @submit.prevent="handleSubmit" action="" class="form">
    <CustomInput
      id="name"
      v-model:inputValue="state.name.value"
      :error="state.name.error"
      label="Name"
    />

    <CustomInput
      id="email"
      v-model:inputValue="state.email.value"
      :error="state.email.error"
      label="E-mail"
    />

    <div>
      <label class="checkbox-container"
        >Terms
        <input type="checkbox" v-model="state.terms.value" />
        <span class="checkmark"></span>
      </label>
      <p v-if="!state.terms.value" class="error">{{ state.terms.error }}</p>
    </div>

    <div>
      <button type="submit" class="submit-button">Submit</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import CustomInput from "@/components/CustomInput.vue";

const state = reactive({
  name: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  terms: {
    value: false,
    error: "",
  },
});

let errorCount = 0;

const handleSubmit = () => {
  errorCount = 0;
  state.name.error = "";
  state.email.error = "";
  state.terms.error = "";
  if (!state.name.value) {
    state.name.error = "Name field cannot be empty!";
    errorCount++;
  }
  if (!state.email.value) {
    state.email.error = "E-mail field cannot be empty!";
    errorCount++;
  }
  if (!state.terms.value) {
    state.terms.error = "Must agree to the terms!";
    errorCount++;
  }
  if (errorCount > 0) {
    return;
  }

  alert("Submitted");
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 20rem;
  padding: 1rem;
}

.submit-button {
  height: 1.9rem;
  min-width: 5rem;
  color: #fff;
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

.checkbox-container {
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border: 2px solid #aaa;
  border-radius: 6px;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: #ccc;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #1d95c9;
  border: 2px solid #fff;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.error {
  color: red;
}
</style>
