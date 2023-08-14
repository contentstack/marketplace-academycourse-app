import { useAppSdk } from "./useAppSdk";
import { get } from "lodash";

/**
 * useSdkDataByPath
 * This is a generic hook which can return the value at the given path;
 * @param path
 * @param defaultValue
 *
 * eg:
 * const contentTypeUuid = useSdkDataByPath('location.SidebarWidget.entry.content_type.uid', '')
 * const stackKey =  useSdkDataByPath('stack._data.api_key', '');
 */
export const useSdkDataByPath = (
  path: string,
  defaultValue: unknown
): unknown => {
  const appSdk = useAppSdk();
  return get(appSdk, path, defaultValue);
};
