<template>
  <h1 class="PageHeading">Task Tracker</h1>
  <div class="flexContainer">
    <input
      type="text"
      placeholder="Task name"
      class="inputText"
      @input="(event: any) => (state.inputValue = event.target.value)"
      :value="state.inputValue"
    />
    <button class="regularButton" @click="addTodo()">Add Task</button>
  </div>

  <div class="flexContainer">
    <h3>Filter Tasks:</h3>
    <button class="regularButton" @click="changeFilter('All')">All</button>
    <button class="regularButton" @click="changeFilter('Completed')">
      Completed
    </button>
    <button class="regularButton" @click="changeFilter('Active')">
      Active
    </button>
  </div>

  <h2>{{ state.filter }} tasks</h2>

  <p v-if="filteredTodos.length === 0">No tasks found</p>

  <table class="todoTable" v-else>
    <thead>
      <tr>
        <th class="firstColumn">Status</th>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody class="tableBody">
      <tr v-for="todo in filteredTodos" :key="todo.key">
        <TodoItem
          :task="todo.task"
          :isCompleted="todo.isCompleted"
          @deleteTodo="deleteTodo(todo.key)"
          @invertComleted="invertComleted(todo.key)"
        />
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import TodoItem from "../components/TodoItem.vue";

interface Todo {
  key: number;
  task: string;
  isCompleted: boolean;
}

const state = reactive({
  counter: 0,
  inputValue: "",
  filter: "All",
  todos: [] as Todo[],
});

function addTodo() {
  const newTodo = {
    key: findMax(),
    task: state.inputValue,
    isCompleted: false,
  };
  state.todos.push(newTodo);
  state.inputValue = "";
}

function findMax(): number {
  return state.todos.length === 0
    ? 0
    : Math.max.apply(
        Math,
        state.todos.map((todo: Todo): number => {
          return todo.key;
        })
      ) + 1;
}

function deleteTodo(key: number): void {
  const index = getIndex(key);
  if (index > -1) {
    state.todos.splice(index, 1);
  }
}

function invertComleted(key: number): void {
  const index = getIndex(key);
  if (index > -1) {
    state.todos[index].isCompleted = !state.todos[index].isCompleted;
  }
}

function getIndex(key: number): number {
  return state.todos.findIndex((todo: Todo): boolean => {
    return todo.key === key;
  });
}

function changeFilter(filter: string): void {
  state.filter = filter;
}

const filteredTodos = computed((): Todo[] => {
  let filtered = state.todos;
  if (state.filter === "Completed") {
    filtered = state.todos.filter((todo: Todo): boolean => {
      todo.key;
      return todo.isCompleted === true;
    });
  }
  if (state.filter === "Active") {
    filtered = state.todos.filter((todo: Todo): boolean => {
      return todo.isCompleted === false;
    });
  }
  return filtered;
});
</script>

<style scoped lang="scss">
.PageHeading {
  text-align: center;
  justify-self: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  margin-bottom: 1rem;
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

.regularButton {
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
}

.todoTable {
  width: 100%;
  margin: 0 0;
  border-collapse: separate;
  border-spacing: 0 0;
  text-align: right;
}

.firstColumn {
  text-align: left;
  width: min-content;
}

.tableBody {
  border-top: 1px solid #555;
  font-weight: 300;
}

.inputText {
  width: 100%;
  max-width: 15rem;
  height: 1.5rem;
  border: 2px solid #aaa;
  border-radius: 5px;
  margin: 3px 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
}
</style>
