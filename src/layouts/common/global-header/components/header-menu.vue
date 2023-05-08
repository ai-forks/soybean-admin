<template>
  <div class="flex-1-hidden h-full px-10px">
    <n-scrollbar :x-scrollable="true" class="flex-1-hidden h-full" content-class="h-full">
      <div class="flex-y-center h-full" :style="{ justifyContent: theme.menu.horizontalPosition }">
        <n-menu
          :value="activeKey"
          mode="horizontal"
          :options="menus"
          :inverted="theme.header.inverted"
          @update:value="handleUpdateMenu"
        />
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import type { MenuOption } from "naive-ui";
import { useRouteStore, useThemeStore } from "@/store";
import { useRouterPush } from "@/composables";

defineOptions({ name: "HeaderMenu" });

const route = useRoute();
const routeStore = useRouteStore();
const theme = useThemeStore();
const { routerPush } = useRouterPush();
const menus = computed(() => ((<any>routeStore.menus) as App.GlobalMenuOption[]).map(v=>{
  let nv = {...v};
  delete nv.icon;
  return nv;
}));
const activeKey = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string);

function handleUpdateMenu(_key: string, item: MenuOption) {
  const menuItem = item as App.GlobalMenuOption;
  routerPush(menuItem.routePath);
}
</script>

<style scoped>
:deep(.n-menu-item-content-header) {
  overflow: inherit !important;
}
:deep(.n-menu.n-menu--horizontal .n-menu-item-content){
  padding:0 10px;
}
:deep(.n-scrollbar::-webkit-scrollbar-thumb,.n-scrollbar::-webkit-scrollbar-thumb:hover){
  border: 0;
  width: 0;
}
</style>
