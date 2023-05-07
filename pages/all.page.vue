<template>
  <router-view v-if="ssr" v-slot="{ Component }">
    <Suspense>
      <component :is="Component" class="h-full"  />
    </Suspense>
  </router-view>
  <n-config-provider
    v-if="!ssr"
    :theme="page.theme.naiveTheme"
    :theme-overrides="page.theme.naiveThemeOverrides"
    class="h-full"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <naive-provider>
      <router-view v-slot="{ Component }">
        <Suspense>
          <component :is="Component"  />
        </Suspense>
      </router-view>
    </naive-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
//import { naiveui } from "@/utils/vuehelper";
const ssr = import.meta.env.SSR;
import { dateZhCN, zhCN } from "naive-ui";
//const NConfigProvider = naiveui("NConfigProvider");

const page = ref({
  theme: <any>{},
});
onMounted(() => {
  if (!ssr) {

  }
});

if (!ssr) {
  (async () => {
    const { subscribeStore, useThemeStore } = await import("@/store");
    subscribeStore();
    const theme = useThemeStore();
    page.value.theme = theme;
    const { useGlobalEvents } = await import("@/composables");
    useGlobalEvents();
  })();
}
</script>

<style></style>
