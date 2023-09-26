import broetConfig from "@broet/tailwind-config";
import { describe, expect, it } from "vitest";
import { createViewports } from "../src";

describe("createViewports", () => {
  it("should find some screens in the broet Tailwind config", () => {
    const viewports = createViewports(broetConfig);

    expect(Object.keys(viewports).length).toBeGreaterThan(0);
  });

  // https://tailwindcss.com/docs/screens#using-custom-screen-names
  it("should support custom screen names", () => {
    const testConfig = {
      content: [],
      theme: {
        screens: {
          tablet: "640px",
          laptop: "1024px",
          desktop: "1280px",
        },
      },
    };

    const viewports = createViewports(testConfig);

    expect(viewports).toMatchObject({
      tablet: { name: "tablet", styles: { width: "640px" } },
      laptop: { name: "laptop", styles: { width: "1024px" } },
      desktop: { name: "desktop", styles: { width: "1280px" } },
    });
  });
});
