import 'server-only'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'ar') => {
  return locale === 'ar' ? dictionaries.ar() : dictionaries.en();
}