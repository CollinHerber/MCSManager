import { $t } from "@/lang/i18n";
import { computed, nextTick, onMounted, ref } from "vue";

const MCS_MARKET_TOUR_DONE = "mcs_market_tour_completed";

export function useMarketTour() {
  const stepRef = ref<HTMLElement | null>(null);
  const openTour = ref(false);
  const tourCurrent = ref(0);

  const tourSteps = computed(
    () =>
      [
        {
          target: () => stepRef.value,
          title: $t("TXT_CODE_d284d8a9"),
          description: $t("TXT_CODE_22814776")
        }
      ] as any
  );

  const markTourDone = () => {
    localStorage.setItem(MCS_MARKET_TOUR_DONE, "1");
    openTour.value = false;
  };

  const startTour = () => {
    if (window.innerWidth < 1000) return;
    if (localStorage.getItem(MCS_MARKET_TOUR_DONE)) return;
    nextTick(() => {
      openTour.value = true;
    });
  };

  onMounted(() => {
    setTimeout(startTour, 1000);
  });

  return {
    stepRef,
    openTour,
    tourCurrent,
    tourSteps,
    markTourDone
  };
}
