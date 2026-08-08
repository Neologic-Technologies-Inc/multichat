<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { parse, isValid, isAfter, isBefore } from 'date-fns';
import {
  getIntlDateFormatForLocale,
  CALENDAR_TYPES,
} from '../helpers/DatePickerHelper';

const props = defineProps({
  calendarType: {
    type: String,
    default: '',
  },
  dateValue: Date,
  compareDate: Date,
  isDisabled: Boolean,
});

const emit = defineEmits(['update', 'validate', 'error']);
const { t, locale } = useI18n();

const { START_CALENDAR, END_CALENDAR } = CALENDAR_TYPES;

const dateFormat = computed(() =>
  getIntlDateFormatForLocale(locale.value)?.toUpperCase()
);

const localDateValue = computed({
  get: () =>
    props.dateValue?.toLocaleDateString(locale.value.replace(/_/g, '-')) || '',
  set: newValue => {
    const format = getIntlDateFormatForLocale(locale.value);
    const parsedDate = parse(newValue, format, new Date());
    if (isValid(parsedDate)) {
      emit('update', parsedDate);
    }
  },
});

const validateDate = () => {
  if (!isValid(props.dateValue)) {
    emit(
      'error',
      t('DATE_PICKER.DATE_RANGE_INPUT.INVALID_FORMAT', {
        format: dateFormat.value,
      })
    );
    return;
  }

  const { calendarType, compareDate, dateValue } = props;
  const isStartCalendar = calendarType === START_CALENDAR;
  const isEndCalendar = calendarType === END_CALENDAR;

  if (compareDate && isStartCalendar && isAfter(dateValue, compareDate)) {
    emit('error', t('DATE_PICKER.DATE_RANGE_INPUT.START_BEFORE_END'));
  } else if (compareDate && isEndCalendar && isBefore(dateValue, compareDate)) {
    emit('error', t('DATE_PICKER.DATE_RANGE_INPUT.END_AFTER_START'));
  } else {
    emit('validate', dateValue);
  }
};
</script>

<template>
  <div class="h-[82px] flex flex-col items-start px-5 gap-1.5 pt-4 w-full">
    <span class="text-sm font-medium text-n-slate-12">
      {{
        calendarType === START_CALENDAR
          ? $t('DATE_PICKER.DATE_RANGE_INPUT.START')
          : $t('DATE_PICKER.DATE_RANGE_INPUT.END')
      }}
    </span>
    <input
      v-model="localDateValue"
      type="text"
      class="!text-sm !mb-0 disabled:!outline-n-strong"
      :placeholder="dateFormat"
      :disabled="isDisabled"
      @keypress.enter="validateDate"
    />
  </div>
</template>
