<template>
  <admin-layout :mode="mode" :scroll-mode="theme.scrollMode" :scroll-el-id="app.scrollElId"
    :full-content="app.contentFull" :fixed-top="theme.fixedHeaderAndTab" :header-height="theme.header.height"
    :tab-visible="theme.tab.visible" :tab-height="theme.tab.height"
    :content-class="app.disableMainXScroll ? 'overflow-x-hidden' : ''" :sider-visible="siderVisible"
    :sider-collapse="app.siderCollapse" :sider-width="siderWidth" :sider-collapsed-width="siderCollapsedWidth"
    :footer-visible="theme.footer.visible" :fixed-footer="theme.footer.fixed" :right-footer="theme.footer.right"
    :tab-class="isMobile ? 'tab-hide' : ''">
    <template #header>
      <global-header v-bind="headerProps" />
    </template>
    <template #tab>
      <global-tab v-if="!app.inSSR && !isMobile" />
    </template>
    <template #sider>
      <global-sider />
    </template>
    <global-content />
    <template #footer>
      <global-footer />
    </template>
  </admin-layout>
  <n-back-top :key="theme.scrollMode" :listen-to="`#${app.scrollElId}`" class="z-100" />
  <setting-drawer />
</template>

<script setup lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import { useAppStore, useThemeStore } from "@/store";
import { AdminLayout } from "@soybeanjs/vue-materials";
import { useBasicLayout } from "@/composables";
import { GlobalContent, GlobalFooter, GlobalHeader, GlobalSider, GlobalTab, SettingDrawer } from "../common";
const ssr = import.meta.env.SSR;
const initStyle = ref({
  visibility: "hidden",
});
defineOptions({ name: "BasicLayout" });

onMounted(() => {
  setTimeout(() => {
    initStyle.value.visibility = "visible";
  }, 1000);
});

const app = useAppStore();
const theme = useThemeStore();
const { mode, headerProps, siderVisible, siderWidth, siderCollapsedWidth, isMobile } = useBasicLayout();
if (!ssr) {
  isMobile && theme.setLayoutMode("horizontal");
}
</script>

<style lang="scss">
#__SCROLL_EL_ID__ {
  @include scrollbar(8px, #e1e1e1);
}

.dark #__SCROLL_EL_ID__ {
  @include scrollbar(8px, #555);
}

.tab-hide,
.tab-hide+._layout-tab-placement_nhzen_18 {
  display: none;
}
</style>
