import { type ResolvableTo, type ThemeConfig } from "tailwindcss/types/config";

export type UnwrapResolvableTo<T extends ResolvableTo<any>> =
  T extends ResolvableTo<infer U> ? U : never;

export type ThemeConfigProperty<T extends keyof ThemeConfig> =
  UnwrapResolvableTo<ThemeConfig[T]>;
