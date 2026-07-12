<script setup lang="ts">
import { useAppConfigStore } from "@/stores/useAppConfigStore";
import enUS from "ant-design-vue/es/locale/en_US";
import { ConfigProvider } from "ant-design-vue";
import dayjs from "dayjs";
import "dayjs/locale/en";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);
dayjs.locale("en-us");

const { themeConfig } = useAppConfigStore();
</script>

<template>
  <ConfigProvider :theme="themeConfig" :locale="enUS">
    <slot></slot>
  </ConfigProvider>
</template>
