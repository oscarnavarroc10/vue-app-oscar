import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import PlansView from "@/views/PlansView.vue";
import SocialCategoriesView from "@/views/SocialCategoriesView.vue";
import SocialServicesView from "@/views/SocialServicesView.vue";
import CartView from "@/views/CartView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/plans",
      name: "plans",
      component: PlansView,
      alias: ["/planes", "/Plans"],
    },
    {
      path: "/social-categories",
      name: "social-categories",
      component: SocialCategoriesView,
      alias: ["/SocialCategories"],
    },
    {
      path: "/social-services/:category",
      name: "social-services",
      component: SocialServicesView,
      props: true,
      alias: ["/SocialServices/:category"],
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
      alias: ["/Cart"],
    },
    {
      path: "/faq",
      name: "faq",
      redirect: "/#faq",
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;

    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    return { top: 0 };
  },
});

export default router;
