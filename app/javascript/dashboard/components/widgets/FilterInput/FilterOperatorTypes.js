export const getOperatorTypes = t => ({
  OPERATOR_TYPES_1: [
    {
      value: 'equal_to',
      label: t('FILTER.OPERATOR_LABELS.equal_to'),
    },
    {
      value: 'not_equal_to',
      label: t('FILTER.OPERATOR_LABELS.not_equal_to'),
    },
  ],

  OPERATOR_TYPES_2: [
    {
      value: 'equal_to',
      label: t('FILTER.OPERATOR_LABELS.equal_to'),
    },
    {
      value: 'not_equal_to',
      label: t('FILTER.OPERATOR_LABELS.not_equal_to'),
    },
    {
      value: 'is_present',
      label: t('FILTER.OPERATOR_LABELS.is_present'),
    },
    {
      value: 'is_not_present',
      label: t('FILTER.OPERATOR_LABELS.is_not_present'),
    },
  ],

  OPERATOR_TYPES_3: [
    {
      value: 'equal_to',
      label: t('FILTER.OPERATOR_LABELS.equal_to'),
    },
    {
      value: 'not_equal_to',
      label: t('FILTER.OPERATOR_LABELS.not_equal_to'),
    },
    {
      value: 'contains',
      label: t('FILTER.OPERATOR_LABELS.contains'),
    },
    {
      value: 'does_not_contain',
      label: t('FILTER.OPERATOR_LABELS.does_not_contain'),
    },
  ],

  OPERATOR_TYPES_4: [
    {
      value: 'equal_to',
      label: t('FILTER.OPERATOR_LABELS.equal_to'),
    },
    {
      value: 'not_equal_to',
      label: t('FILTER.OPERATOR_LABELS.not_equal_to'),
    },
    {
      value: 'is_present',
      label: t('FILTER.OPERATOR_LABELS.is_present'),
    },
    {
      value: 'is_not_present',
      label: t('FILTER.OPERATOR_LABELS.is_not_present'),
    },
    {
      value: 'is_greater_than',
      label: t('FILTER.OPERATOR_LABELS.is_greater_than'),
    },
    {
      value: 'is_less_than',
      label: t('FILTER.OPERATOR_LABELS.is_less_than'),
    },
  ],

  OPERATOR_TYPES_5: [
    {
      value: 'is_greater_than',
      label: t('FILTER.OPERATOR_LABELS.is_greater_than'),
    },
    {
      value: 'is_less_than',
      label: t('FILTER.OPERATOR_LABELS.is_less_than'),
    },
    {
      value: 'days_before',
      label: t('FILTER.OPERATOR_LABELS.days_before'),
    },
  ],
});

const operators = getOperatorTypes(key => key);

export const {
  OPERATOR_TYPES_1,
  OPERATOR_TYPES_2,
  OPERATOR_TYPES_3,
  OPERATOR_TYPES_4,
  OPERATOR_TYPES_5,
} = operators;
