/**
 * useAppSdk
 * @return the appSdk instance after initialization
 */
import {
  MarketplaceAppContext,
  MarketplaceAppContextType,
} from "../contexts/marketplaceContext";
import { useContext } from "react";

/**
 * Getter and setter for appSdk instance.
 * To be used during Sdk initialisation
 * @returns appSdk;
 *
 * Eg:
 * const appSdk = useAppSdk();
 */
export const useAppSdk = () => {
  const { appSdk } = useContext(
    MarketplaceAppContext
  ) as MarketplaceAppContextType;
  return appSdk;
};
