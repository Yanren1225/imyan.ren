import en from './locale/en';
import zhCN from './locale/zh-cn';

const dictionaries = {
  en: en,
  'zh-cn': zhCN,
};

export type Locale = keyof typeof dictionaries;

let locale = $state<Locale>('en');

export const getLocale = () => locale;
export const setLocale = (l: Locale) => {
  locale = l;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('locale', l);
  }
}

// Persist
if (typeof localStorage !== 'undefined') {
  const saved = localStorage.getItem('locale') as Locale;
  if (saved && dictionaries[saved]) {
    locale = saved;
  }
}

function resolve(obj: any, path: string) {
  return path.split('.').reduce((prev, curr) => prev && prev[curr], obj);
}

export const t = (key: string) => {
  const dict = dictionaries[locale];
  const val = resolve(dict, key);
  return val !== undefined ? val : key;
}
