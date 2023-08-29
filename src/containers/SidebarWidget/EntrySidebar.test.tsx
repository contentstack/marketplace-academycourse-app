import { render, screen } from "@testing-library/react";
import { TestProvider } from "../../test-utils/test-utils";
import EntrySidebarExtension from "./EntrySidebar";
import { EntrySidebarExtensionProvider } from "../../common/providers/EntrySidebarExtensionProvider";

test("EntrySidebar component", async () => {
  const appSdkMock = {
    location: {
      SidebarWidget: {},
    },
  };

  render(<EntrySidebarExtension />, {
    wrapper: ({ children }: any) => (
      <TestProvider appConfig={{}} appSdk={appSdkMock}>
        <EntrySidebarExtensionProvider>
          {children}
        </EntrySidebarExtensionProvider>
      </TestProvider>
    ),
  });

  expect(screen.getByText(/Sidebar Widget/)).toBeInTheDocument();
});
