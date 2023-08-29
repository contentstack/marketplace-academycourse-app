import {
  MarketplaceAppContext,
  MarketplaceAppContextType,
} from "../contexts/marketplaceContext";
import { useContext } from "react";

/**
 * Getter and setter hook for App config
 * @returns appConfig;
 *
 * Eg:
 * const appConfig = useAppConfig();
 */
export const useAppConfig = () => {
  const { appConfig } = useContext(
    MarketplaceAppContext
  ) as MarketplaceAppContextType;

  return appConfig;
};
