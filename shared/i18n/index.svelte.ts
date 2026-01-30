export type GetLocale<T> = keyof T;

export function createI18n<T extends Record<string, any>>(
  dictionaries: T,
  defaultLocale: keyof T,
) {
  let locale = $state<keyof T>(defaultLocale);

  return {
    get locale() {
      return locale;
    },
    setLocale(l: keyof T) {
      locale = l;
    },
    get t(): T[keyof T] {
      return dictionaries[locale];
    },
  };
}
