import broetConfig from "@broet/tailwind-config";
import { type Config } from "tailwindcss";
import { describe, expect, it } from "vitest";
import { createTheme } from "../src";

describe("createTheme", () => {
  it("should find all values from the broet Tailwind config", () => {
    const theme = createTheme(broetConfig);

    expect(Object.keys(theme).length).toBeGreaterThanOrEqual(23);
    expect(
      Object.values(theme).every((value) => value !== undefined),
    ).toBeTruthy();
  });

  it("should let you override border radius with Tailwind", () => {
    const testConfig: Config = {
      content: [],
      theme: {
        borderRadius: {
          xl: "1rem",
        },
      },
    };

    const theme = createTheme(testConfig, {
      appBorderRadius: "xl",
      inputBorderRadius: "xl",
    });

    expect(theme.appBorderRadius).toEqual(16);
    expect(theme.inputBorderRadius).toEqual(16);
  });
});
