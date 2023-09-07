import React, { useEffect, useState } from "react";

import { AppFailed } from "../../components/AppFailed";
import ContentstackAppSDK from "@contentstack/app-sdk";
import Extension from "@contentstack/app-sdk/dist/src/extension";
import { KeyValueObj } from "../types/types";
import { MarketplaceAppContext } from "../contexts/marketplaceContext";
import { isNull } from "lodash";
import { useLocation } from "react-router-dom";

const MARKETPLACE_APP_NAME: string = process.env
  .REACT_APP_MARKETPLACE_APP_NAME as string;

type ProviderProps = {
  excludeRoutes?: string[];
  children?: React.ReactNode;
};

/**
 * Marketplace App Provider
 * @param children: React.ReactNode
 */
export const MarketplaceAppProvider: React.FC<ProviderProps> = ({
  excludeRoutes,
  children,
}) => {
  const location = useLocation();
  const [isExcludePath, setIsExcludePath] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [appSdk, setAppSdk] = useState<Extension | null>(null);
  const [appConfig, setConfig] = useState<KeyValueObj | null>(null);

  // Initialize the SDK and track analytics event
  useEffect(() => {
    if (excludeRoutes && excludeRoutes.includes(location.pathname)) {
      setIsExcludePath(true);
      return;
    }
    ContentstackAppSDK.init()
      .then(async (appSdk) => {
        setAppSdk(appSdk);
        const appConfig = await appSdk.getConfig();
        setConfig(appConfig);
      })
      .catch(() => {
        setFailed(true);
      });
  }, []);

  // wait until the SDK is initialized. This will ensure the values are set
  // correctly for appSdk.
  if (!isExcludePath && !failed && isNull(appSdk)) {
    return <div>Loading...</div>;
  }

  if (failed) {
    return <AppFailed />;
  }

  return (
    <MarketplaceAppContext.Provider value={{ appSdk, appConfig }}>
      {children}
    </MarketplaceAppContext.Provider>
  );
};
