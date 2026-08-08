import { format } from 'date-fns';
import * as locales from 'date-fns/locale';

const fallbackLocale = locales.enUS;

const localeAliases = {
  en: 'enUS',
  fa: 'faIR',
  no: 'nb',
  pt: 'pt',
  sh: 'srLatn',
  zh: 'zhCN',
};

export const getDateFnsLocale = locale => {
  const normalizedLocale = (locale || 'en').replace(/_/g, '-');
  const localeKey = normalizedLocale.replace(/-([a-z])/gi, (_, char) =>
    char.toUpperCase()
  );
  const language = normalizedLocale.split('-')[0];

  return (
    locales[localeKey] ||
    locales[localeAliases[language]] ||
    locales[language] ||
    fallbackLocale
  );
};

export const formatDate = (date, dateFormat, locale) =>
  format(date, dateFormat, { locale: getDateFnsLocale(locale) });
