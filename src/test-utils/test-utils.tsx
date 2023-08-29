import React from "react";
import { render } from "@testing-library/react";
import { MarketplaceAppContext } from "../common/contexts/marketplaceContext";
import { CustomFieldExtensionContext } from "../common/contexts/customFieldExtensionContext";

export const TestProvider = ({
  children,
  appSdk,
  appConfig = {},
}: {
  appConfig: any;
  children?: React.ReactNode;
  appSdk: any;
}) => {
  return (
    <MarketplaceAppContext.Provider value={{ appSdk, appConfig }}>
      {children}
    </MarketplaceAppContext.Provider>
  );
};

export const CustomFieldTestProvider = ({
  children,
  customField,
  loading = false,
  setFieldData,
}: {
  customField: any;
  children?: React.ReactNode;
  loading: boolean;
  setFieldData: (data: unknown) => void;
}) => {
  return (
    <CustomFieldExtensionContext.Provider
      value={{ customField, loading, setFieldData }}
    >
      {children}
    </CustomFieldExtensionContext.Provider>
  );
};

const AllTheProviders = ({ children, initialProps }: any) => {
  return (
    <TestProvider
      appConfig={initialProps?.appConfig}
      appSdk={initialProps?.appSdk}
    >
      {children}
    </TestProvider>
  );
};

const customRender = (ui: any, options?: object) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
//@ts-ignore
export * from "@testing-library/react";

// override render method
export { customRender as render };
