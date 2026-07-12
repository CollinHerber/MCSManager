<script setup lang="ts">
import { router } from "@/config/router";
import { t } from "@/lang/i18n";
import type { LayoutCard } from "@/types";
import { useMarketTour } from "@/widgets/market/useMarketTour";
import McPreset from "@/widgets/setupApp/McPreset.vue";
import { DatabaseOutlined } from "@ant-design/icons-vue";
import { Divider, Flex, Tour } from "ant-design-vue";
import Link from "ant-design-vue/es/typography/Link";

const props = defineProps<{
  card: LayoutCard;
}>();

const { stepRef, openTour, tourCurrent, tourSteps, markTourDone } = useMarketTour();

const openEditor = () => {
  router.push("/market/editor");
};
</script>

<template>
  <div style="height: 100%">
    <div ref="stepRef">
      <a-typography-title :level="4" style="margin-bottom: 8px">
        <DatabaseOutlined />
        {{ t("TXT_CODE_88249aee") }}
      </a-typography-title>
      <a-typography-paragraph>
        <Flex justify="space-between" align="flex-start">
          <p style="opacity: 0.6">
            <span>{{ t("TXT_CODE_c9ce7427") }}</span>
          </p>
          <p style="opacity: 0.6">
            <Link target="_blank" @click="openEditor">
              {{ t("TXT_CODE_85c10fde") }}
            </Link>
            <Divider type="vertical" />
            <Link href="https://github.com/MCSManager/Script/issues/77" target="_blank">
              {{ t("TXT_CODE_709c2db4") }}
            </Link>
          </p>
        </Flex>
      </a-typography-paragraph>
    </div>

    <McPreset :card="props.card" />

    <Tour
      v-model:current="tourCurrent"
      :open="openTour"
      :steps="tourSteps"
      @close="markTourDone"
      @finish="markTourDone"
    />
  </div>
</template>
