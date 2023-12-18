import { createI18n } from 'vue-i18n';
import en from './en-US';
import cn from './zh-CN';
import { App } from 'vue';

export const LOCALE_OPTIONS = [
    { label: '中文', value: 'zh-CN' },
    { label: 'English', value: 'en-US' },
];
const defaultLocale = localStorage.getItem('arco-locale') || 'zh-CN';

export const i18n = createI18n({
    locale: defaultLocale,
    fallbackLocale: 'en-US',
    legacy: false,
    allowComposition: true,
    messages: {
        'en-US': en,
        'zh-CN': cn,
    },
});

export const setupLocale = (app: App) => {
    app.use(i18n);
};

export default setupLocale;