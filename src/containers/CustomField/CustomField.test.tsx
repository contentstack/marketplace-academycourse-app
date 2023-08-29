import { render, screen } from "@testing-library/react";
import CustomFieldExtension from "./CustomField";
import {
  CustomFieldTestProvider,
  TestProvider,
} from "../../test-utils/test-utils";

test("CustomFieldExtension component", async () => {
  const appSdkMock = {
    location: {
      CustomField: {
        field: {
          setData: jest.fn(),
          getData: async () => "HELLO",
        },
      },
    },
  };

  const customField = {
    customField: "HELLO",
    setFieldData: jest.fn(),
    loading: false,
  };

  render(<CustomFieldExtension />, {
    wrapper: ({ children }: any) => (
      <TestProvider appConfig={{}} appSdk={appSdkMock}>
        <CustomFieldTestProvider
          customField={customField.customField}
          setFieldData={customField.setFieldData}
          loading={customField.loading}
        >
          {children}
        </CustomFieldTestProvider>
      </TestProvider>
    ),
  });

  expect(screen.getByText(/Custom Field/)).toBeInTheDocument();
});
