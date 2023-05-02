<template>
  <n-dropdown :options="app.langs" @select="handleDropdown">
    <hover-container class="px-12px" :inverted="theme.header.inverted">
      <icon-mdi-translate class="text-18px" />
    </hover-container>
  </n-dropdown>
</template>

<script lang="ts" setup>
import type { DropdownOption } from "naive-ui";
import { useThemeStore, useAppStore } from "@/store";
import { useIconRender } from "@/composables";
import { defineComponent, getCurrentInstance } from "vue";

const { ctx } = <any>getCurrentInstance();
defineComponent({
  name: "LocaleSwitch",
  setup: (props, ctx) => {
    console.info("xxxx", this, ctx);
  },
});
const theme = useThemeStore();
const app = useAppStore();
const { iconRender } = useIconRender();

type DropdownKey = "user-center" | "logout";

function handleDropdown(optionKey: string) {
  const key = optionKey as DropdownKey;
  app.setLang(optionKey);
  location.reload();
}
</script>

<style scoped></style>
