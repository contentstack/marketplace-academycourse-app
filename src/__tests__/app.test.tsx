import { render, screen, waitFor, within } from "@testing-library/react";

import App from "../containers/App/App";
import { ErrorBoundary } from "../components/ErrorBoundary";
import ContentstackAppSdk from "@contentstack/app-sdk";
import { MemoryRouter } from "react-router-dom";
import localeTexts from "../common/locales/en-us/index";
import manifest from "../../manifest.json";

jest.mock("@contentstack/app-sdk", () => ({
  __esModule: true,
  default: { init: jest.fn() },
}));

const init = ContentstackAppSdk.init as unknown as jest.Mock;

// The active location holds what that screen reads; the SDK only has the location it was opened in.
const LOCATIONS: Record<
  string,
  { name: string; value: Record<string, unknown>; marker: () => any }
> = {
  "/custom-field": {
    name: "CustomField",
    value: {
      field: {
        getData: () => ({ data: ["Shoes"], type: "academy" }),
        setData: jest.fn(),
      },
      frame: { enableAutoResizing: jest.fn() },
    },
    marker: () => screen.findByText("Add"),
  },
  "/stack-dashboard": {
    name: "DashboardWidget",
    value: { stack: { getContentTypes: async () => ({ content_types: [] }) } },
    marker: () =>
      waitFor(() =>
        expect(document.body).toContainHTML('<div class="dashboard-container">')
      ),
  },
  "/asset-sidebar": {
    name: "AssetSidebarWidget",
    value: { getData: async () => ({}) },
    marker: () =>
      screen.findByText(localeTexts.AssetSidebarWidget.button.learnMore),
  },
  "/entry-sidebar": {
    name: "SidebarWidget",
    value: { entry: { getData: async () => ({}) } },
    marker: () => screen.findByText(localeTexts.SidebarWidget.noProducts),
  },
  "/full-page": {
    name: "FullPage",
    value: { stack: { getContentTypes: async () => ({ content_types: [] }) } },
    marker: () =>
      waitFor(() =>
        expect(document.body).toContainHTML('<div class="full-page-container">')
      ),
  },
  "/field-modifier": {
    name: "FieldModifierLocation",
    value: { field: { getData: () => "x", setData: jest.fn() } },
    marker: () =>
      waitFor(() =>
        expect(document.body).toContainHTML(
          '<div class="field-modifier-container">'
        )
      ),
  },
  "/app-configuration": {
    name: "AppConfigWidget",
    value: {
      installation: {
        getInstallationData: async () => ({ configuration: { title: "" } }),
        setInstallationData: jest.fn(),
      },
    },
    marker: () =>
      waitFor(() =>
        expect(document.body).toContainHTML(
          '<div class="app-config-container">'
        )
      ),
  },
};

const open = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

afterEach(() => jest.clearAllMocks());

describe("each location in manifest.json has a route", () => {
  const manifestPaths: string[] = (
    manifest as any
  ).ui_location.locations.flatMap((l: any) => l.meta.map((m: any) => m.path));

  test("the routes under test are exactly the manifest's, apart from the built RTE plugin file", () => {
    expect(manifestPaths.filter((p) => p !== "/json-rte.js").sort()).toEqual(
      Object.keys(LOCATIONS).sort()
    );
  });

  test.each(Object.keys(LOCATIONS))(
    "%s renders its screen, not the 404 page",
    async (path) => {
      const { name, value, marker } = LOCATIONS[path];
      init.mockResolvedValue({
        getConfig: async () => ({ title: "Course app" }),
        location: { [name]: value },
      });
      open(path);
      await marker();
      expect(screen.queryByText(localeTexts[404].title)).toBeNull();
    }
  );
});

describe("the other paths", () => {
  test("/ lists the seven locations as links and does not start the SDK", async () => {
    open("/");
    expect(await screen.findByText(/Nothing to show here/)).toBeInTheDocument();
    const links = within(screen.getByRole("list"))
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));
    expect(links.sort()).toEqual(Object.keys(LOCATIONS).sort());
    expect(init).not.toHaveBeenCalled();
  });

  test("an unknown path shows the 404 page", async () => {
    init.mockResolvedValue({ getConfig: async () => ({}), location: {} });
    open("/nope");
    expect(await screen.findByText(localeTexts[404].title)).toBeInTheDocument();
  });

  test("an SDK that cannot start shows the failure screen instead of the location", async () => {
    init.mockRejectedValue(new Error("no host"));
    open("/asset-sidebar");
    expect(
      await screen.findByText(
        "Something went wrong. Please try refreshing the page."
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: localeTexts.AssetSidebarWidget.button.learnMore,
      })
    ).toBeNull();
  });

  test("while the SDK starts, a location shows Loading...", () => {
    init.mockReturnValue(new Promise(() => {}));
    open("/asset-sidebar");
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});

describe("error boundary", () => {
  const Boom = () => {
    throw new Error("render failed");
  };

  test("a screen that throws is replaced by 'Something went wrong.'", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    spy.mockRestore();
  });

  test("children render normally", () => {
    render(
      <ErrorBoundary>
        <p>fine</p>
      </ErrorBoundary>
    );
    expect(screen.getByText("fine")).toBeInTheDocument();
  });
});
