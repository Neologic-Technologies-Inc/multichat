<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  supportPersonality: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();

const clockImage =
  '/assets/images/dashboard/year-in-review/fourth-frame-clock.png';
const doubleQuotesImage =
  '/assets/images/dashboard/year-in-review/double-quotes.png';

const formatResponseTime = seconds => {
  if (seconds < 60) {
    return t('YEAR_IN_REVIEW.PERSONALITY.RESPONSE_TIME.LESS_THAN_A_MINUTE');
  }
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return t('YEAR_IN_REVIEW.PERSONALITY.RESPONSE_TIME.MINUTES', minutes, {
      minutes,
    });
  }
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return t('YEAR_IN_REVIEW.PERSONALITY.RESPONSE_TIME.HOURS', hours, {
      hours,
    });
  }
  return t('YEAR_IN_REVIEW.PERSONALITY.RESPONSE_TIME.MORE_THAN_A_DAY');
};

const personality = computed(() => {
  const seconds = props.supportPersonality.avg_response_time_seconds;
  const minutes = seconds / 60;

  if (minutes < 2) {
    return 'SWIFT_HELPER';
  }
  if (minutes < 5) {
    return 'QUICK_RESPONDER';
  }
  if (minutes < 15) {
    return 'STEADY_SUPPORT';
  }
  return 'THOUGHTFUL_ADVISOR';
});

const personalityMessage = computed(() => {
  const seconds = props.supportPersonality.avg_response_time_seconds;
  const time = formatResponseTime(seconds);

  return t(`YEAR_IN_REVIEW.PERSONALITY.MESSAGES.${personality.value}`, {
    time,
  });
});
</script>

<template>
  <div class="absolute inset-0 flex items-center justify-center px-8 md:px-32">
    <div class="flex flex-col gap-9 max-w-3xl">
      <div class="mb-4 md:mb-6">
        <img
          :src="clockImage"
          :alt="t('YEAR_IN_REVIEW.PERSONALITY.CLOCK_IMAGE_ALT')"
          class="w-auto h-28"
        />
        <div class="flex items-center justify-start flex-1 mt-9">
          <div class="text-n-slate-1 dark:text-n-slate-12 flex gap-3 flex-col">
            <div class="text-2xl md:text-4xl tracking-tight">
              {{ t('YEAR_IN_REVIEW.PERSONALITY.TITLE') }}
            </div>
            <div class="text-6xl md:text-7xl lg:text-8xl tracking-tighter">
              {{ t(`YEAR_IN_REVIEW.PERSONALITY.LABELS.${personality}`) }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center gap-3 md:gap-6">
        <img
          :src="doubleQuotesImage"
          :alt="t('YEAR_IN_REVIEW.PERSONALITY.QUOTE_IMAGE_ALT')"
          class="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16"
        />
        <p
          class="text-xl md:text-3xl lg:text-3xl font-medium tracking-[-0.2px] text-n-slate-12 dark:text-n-slate-1"
        >
          {{ personalityMessage }}
        </p>
      </div>
    </div>
  </div>
</template>
