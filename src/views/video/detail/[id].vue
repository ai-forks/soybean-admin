<template>
    <div>
      <n-card title="电视剧" class="shadow-sm rounded-16px mb-16px">
        <n-grid cols="s:1 m:2" responsive="screen" :x-gap="16" :y-gap="16">
          <n-grid-item v-for="item in buttonExample" :key="item.id">
            <n-card :title="item.label" class="min-h-180px">
              <p v-if="item.desc" class="pb-16px">{{ item.desc }}</p>
              <n-space>
                <n-button
                  v-for="button in item.buttons"
                  :key="button.id"
                  v-bind="button.props"
                  :style="`--icon-margin: ${button.props.circle ? 0 : 6}px`"
                >
                  <template v-if="button.icon" #icon>
                    <svg-icon :icon="button.icon" />
                  </template>
                  {{ button.label }}
                </n-button>
              </n-space>
            </n-card>
          </n-grid-item>
          <n-grid-item class="h-180px">
            <n-card title="加载中" class="h-full">
              <p class="pb-16px">按钮有加载状态。</p>
              <n-space>
                <n-button :loading="loading" type="primary" @click="startLoading">开始加载</n-button>
                <n-button @click="endLoading">取消加载</n-button>
              </n-space>
            </n-card>
          </n-grid-item>
        </n-grid>
      </n-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { ButtonProps } from "naive-ui";
  import { useLoading } from "@/hooks";
  
  interface ButtonDetail {
    id: number;
    props: ButtonProps & { href?: string; target?: string };
    label?: string;
    icon?: string;
  }
  
  interface ButtonExample {
    id: number;
    label: string;
    buttons: ButtonDetail[];
    desc?: string;
  }
  
  const { loading, startLoading, endLoading } = useLoading();
  
  const buttonExample: ButtonExample[] = [
    {
      id: 0,
      label: "基础",
      buttons: [
        {
          id: 0,
          props: {},
          label: "Default",
        },
        {
          id: 1,
          props: { type: "tertiary" },
          label: "Tertiary",
        },
        {
          id: 2,
          props: { type: "primary" },
          label: "Primary",
        },
        {
          id: 3,
          props: { type: "info" },
          label: "Info",
        },
        {
          id: 4,
          props: { type: "success" },
          label: "Success",
        },
        {
          id: 5,
          props: { type: "warning" },
          label: "Warning",
        },
        {
          id: 6,
          props: { type: "error" },
          label: "Error",
        },
      ],
      desc: "按钮的 type 分别为 default、primary、info、success、warning 和 error。",
    },
    {
      id: 1,
      label: "次要按钮",
      buttons: [
        {
          id: 0,
          props: { strong: true, secondary: true },
          label: "Default",
        },
        
      ],
    },
    {
      id: 2,
      label: "次次要按钮",
      buttons: [
        {
          id: 0,
          props: { tertiary: true },
          label: "Default",
        },
       
      ],
    },
    {
      id: 3,
      label: "次次次要按钮",
      buttons: [
        {
          id: 0,
          props: { quaternary: true },
          label: "Default",
        },
        
      ],
    },
    {
      id: 4,
      label: "虚线按钮",
      buttons: [
        {
          id: 0,
          props: { dashed: true },
          label: "Default",
        },
        
      ],
    },
    {
      id: 5,
      label: "尺寸",
      buttons: [
        {
          id: 0,
          props: { size: "tiny", strong: true },
          label: "小小",
        },
        
      ],
    },
    {
      id: 6,
      label: "文本按钮",
      buttons: [
        {
          id: 0,
          props: { text: true },
          label: "那车头依然吐着烟",
          icon: "mdi:train",
        },
      ],
    },
    {
      id: 7,
      label: "自定义标签按钮",
      buttons: [
        {
          id: 0,
          props: {
            text: true,
            tag: "a",
            href: "https://github.com/honghuangdc/soybean-admin",
            target: "_blank",
            type: "primary",
          },
          label: "soybean-admin",
        },
      ],
      desc: "你可以把按钮渲染成不同的标签，比如 a标签 。",
    }
  ];
  </script>
  
  <style scoped></style>
  