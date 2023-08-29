import { useContext } from "react";
import {
  AppConfigurationExtensionContext,
  AppConfigurationExtensionContextType,
} from "../contexts/appConfigurationExtensionContext";

/**
 * Getter & Setter for installation data
 * @returns an object { installationData, setInstallationData, loading };
 *
 * Eg:
 * const { installationData, setInstallationData, loading } = useInstallationData();
 */
export const useInstallationData = () => {
  const { installationData, setInstallationData, loading } = useContext(
    AppConfigurationExtensionContext
  ) as AppConfigurationExtensionContextType;
  return { installationData, setInstallationData, loading };
};
