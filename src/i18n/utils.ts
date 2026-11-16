import es from "./es.json";
import en from "./en.json";
import experienceEs from "@/data/experience.json"
import experienceEn from "@/data/experience.en.json"
import projectsEs from "@/data/projects.json"
import projectsEn from "@/data/projects.en.json"

export const languages = { es: "Español", en: "English" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "es";

const translations = { es, en } as const;
export type TranslationKey = keyof typeof es;

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split("/");
  return first in languages ? (first as Lang) : defaultLang;
}

export function useTranslations(lang: Lang | undefined) {
  const current = translations[lang ?? defaultLang] ?? translations[defaultLang];
  return (key: TranslationKey): string =>
    current[key] ?? translations[defaultLang][key] ?? key;
}

// Ruta equivalente en el otro idioma
export function getAlternateUrl(url: URL, target: Lang): string {
  const path = url.pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return target === defaultLang ? path : `/en${path}`;
}

export function getExperience(lang: Lang | undefined) {
  return (lang ?? defaultLang) === "en" ? experienceEn : experienceEs
}

export function getProjects(lang: Lang | undefined) {
  return (lang ?? defaultLang) === "en" ? projectsEn : projectsEs
}