import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TaskTrackerView from "../views/TaskTrackerView.vue";
import CharactersView from "../views/CharactersView.vue";
import CharacterView from "../views/CharacterView.vue";
import FormView from "../views/FormView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/tracker",
      name: "tracker",
      component: TaskTrackerView,
    },
    {
      path: "/characters",
      name: "characters",
      component: CharactersView,
    },
    {
      path: "/characters/:id",
      name: "character",
      component: CharacterView,
    },
    {
      path: "/form",
      name: "form",
      component: FormView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
