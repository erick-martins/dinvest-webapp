import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import ptBrTranslations from './locales/pt-br';
import enUsTranslations from './locales/en-us';

export const defaultNS = 'ns1';
export const resources = {
	'pt-BR': ptBrTranslations,
	'en-US': enUsTranslations
} as const;

const i18nConfig = {
	resources: resources,
	fallbackLng: 'pt-BR',
	defaultNS: 'translations'
};

i18next.use(LanguageDetector).use(initReactI18next).init(i18nConfig);

export const i18n = i18next;
