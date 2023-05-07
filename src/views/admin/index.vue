<template>
  <div>{{ data.title }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const data = ref({ title: "demo" });
</script>

<style scoped lang="scss"></style>
