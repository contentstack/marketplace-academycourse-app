import { useEffect, useState } from "react";
import { useAppLocation } from "../hooks/useAppLocation";
import { isEmpty, isNull } from "lodash";
import { EntrySidebarExtensionContext } from "../contexts/entrySidebarExtensionContext";

export const EntrySidebarExtensionProvider = ({ children }: any) => {
  const [entryData, setEntry] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { location } = useAppLocation();

  useEffect(() => {
    (async () => {
      if (!isEmpty(entryData) || isNull(location)) return;
      setLoading(true);
      const entry: { [key: string]: any } = await location.entry.getData();
      setEntry(entry);
      setLoading(false);
    })();
  }, [entryData, location, setLoading, setEntry]);

  return (
    <EntrySidebarExtensionContext.Provider value={{ entryData, loading }}>
      {children}
    </EntrySidebarExtensionContext.Provider>
  );
};
