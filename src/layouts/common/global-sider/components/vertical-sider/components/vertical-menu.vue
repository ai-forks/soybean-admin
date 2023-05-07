<template>
  <n-scrollbar class="flex-1-hidden">
    <div v-if="app.inSSR" class="n-menu n-menu--vertical v-n-menu">
      <div v-for="item in menus" class="n-menu-item">
        <a :href="item.routePath">{{ item.label }}</a>
      </div>
    </div>
    <n-menu
      v-else
      :value="activeKey"
      :collapsed="app.siderCollapse"
      :collapsed-width="theme.sider.collapsedWidth"
      :collapsed-icon-size="22"
      :options="menus"
      :expanded-keys="expandedKeys"
      :indent="18"
      :inverted="!theme.darkMode && theme.sider.inverted"
      @update:value="handleUpdateMenu"
      @update:expanded-keys="handleUpdateExpandedKeys"
    />
  </n-scrollbar>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { MenuOption } from "naive-ui";
import { useAppStore, useRouteStore, useThemeStore } from "@/store";
import { useRouterPush } from "@/composables";
import { getActiveKeyPathsOfMenus } from "@/utils";

defineOptions({ name: "VerticalMenu" });

const route = useRoute();
const app = useAppStore();
const theme = useThemeStore();
const routeStore = useRouteStore();
const { routerPush } = useRouterPush();

const menus = computed(() => (<any>routeStore.menus) as App.GlobalMenuOption[]);
const activeKey = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string);
const expandedKeys = ref<string[]>([]);

function handleUpdateMenu(_key: string, item: MenuOption) {
  const menuItem = item as App.GlobalMenuOption;
  routerPush(menuItem.routePath);
}

function handleUpdateExpandedKeys(keys: string[]) {
  expandedKeys.value = keys;
}

watch(
  () => route.name,
  () => {
    expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, menus.value);
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
.v-n-menu {
  text-align: center;
  .n-menu-item {
    padding: 5px;
    margin: 5px;
  }
}
</style>
