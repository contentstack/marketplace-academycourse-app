import { screen } from "@testing-library/react";

import localeTexts from "../common/locales/en-us/index";

// The real entry (src/index.tsx) as the browser runs it: BrowserRouter on the URL path from the manifest.
jest.mock("@contentstack/app-sdk", () => ({
  __esModule: true,
  default: {
    init: jest.fn(async () => ({
      getConfig: async () => ({}),
      location: { AssetSidebarWidget: { getData: async () => ({}) } },
    })),
  },
}));
const mockVitals = {
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
};
jest.mock("web-vitals", () => ({ __esModule: true, ...mockVitals }));

test("the app root at /asset-sidebar renders the asset sidebar", async () => {
  document.body.innerHTML = '<div id="root"></div>';
  window.history.pushState({}, "", "/asset-sidebar");
  require("../index");
  expect(
    await screen.findByText(localeTexts.AssetSidebarWidget.button.learnMore)
  ).toBeInTheDocument();
});

describe("web vitals", () => {
  const reportWebVitals = require("../reportWebVitals").default;

  test("nothing is measured unless a callback is given", async () => {
    reportWebVitals();
    reportWebVitals("not a function" as any);
    await Promise.resolve();
    expect(mockVitals.getCLS).not.toHaveBeenCalled();
  });

  test("with a callback every vital reports to it", async () => {
    const cb = () => {};
    reportWebVitals(cb);
    await new Promise((r) => setTimeout(r, 0));
    for (const fn of Object.values(mockVitals))
      expect(fn).toHaveBeenCalledWith(cb);
  });
});
