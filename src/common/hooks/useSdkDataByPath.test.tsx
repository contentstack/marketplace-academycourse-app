import { renderHook } from "@testing-library/react";
import { TestProvider } from "../../test-utils/test-utils";
import { useSdkDataByPath } from "./useSdkDataByPath";

describe("useSdkDataByPath", () => {
  const appSdk = {
    Stack: { _data: { api_key: "API_KEY" } },
  };
  it("should return the default value passed if not present", async function () {
    const { result } = renderHook(
      () => useSdkDataByPath("no.path", "default"),
      {
        wrapper: ({ children }: any) => (
          <TestProvider appConfig={{}} appSdk={appSdk}>
            {children}
          </TestProvider>
        ),
      }
    );
    expect(result.current).toBe("default");
  });

  it("should return the correct value if present", async function () {
    const { result } = renderHook(
      () => useSdkDataByPath("Stack._data.api_key", "default"),
      {
        wrapper: ({ children }: any) => (
          <TestProvider appConfig={{}} appSdk={appSdk}>
            {children}
          </TestProvider>
        ),
      }
    );
    expect(result.current).toBe("API_KEY");
  });
});
