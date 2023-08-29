import React from "react";

export type CustomFieldExtensionContextType = {
  customField: unknown;
  setFieldData: (data: unknown) => void;
  loading: boolean;
};

export const CustomFieldExtensionContext =
  React.createContext<CustomFieldExtensionContextType>({
    customField: null,
    setFieldData: () => {},
    loading: false,
  });
