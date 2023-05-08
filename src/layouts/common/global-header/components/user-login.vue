<template>
  <hover-container class="px-12px" :inverted="theme.header.inverted">
    <router-link to="/login">
      <icon-mdi-login-variant class="text-32px" />
    </router-link>
  </hover-container>
</template>

<script lang="ts" setup>
import { useThemeStore } from "@/store";

defineOptions({ name: "UserLogin" });

const theme = useThemeStore();

</script>

<style scoped></style>
