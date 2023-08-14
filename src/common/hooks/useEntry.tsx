import {
  EntrySidebarExtensionContext,
  EntrySidebarExtensionContextType,
} from "../contexts/entrySidebarExtensionContext";
import { useContext } from "react";

/**
 * Getter and setter hook for entry data
 * @returns an Object { entryData, loading };
 *
 * Eg:
 * const { entryData, loading } = useEntry();
 */
export const useEntry = () => {
  const { entryData, loading } = useContext(
    EntrySidebarExtensionContext
  ) as EntrySidebarExtensionContextType;

  return { entryData, loading };
};
