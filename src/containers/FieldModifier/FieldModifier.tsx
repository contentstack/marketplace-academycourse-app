import "./styles.scss";

import { useEffect, useState } from "react";

import ContentstackAppSdk from "@contentstack/app-sdk";
import { SkeletonTile } from "@contentstack/venus-components";

const FieldModifierExtension = () => {
  const [state, setState] = useState<any>({
    config: {},
    location: {},
    appSdkInitialized: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [entry, setEntry] = useState("");

  useEffect(() => {
    ContentstackAppSdk.init()
      .then(async (appSdk: any) => {
        const config = await appSdk?.getConfig();
        const entryData =
          appSdk?.location?.FieldModifierLocation?.field?.getData() || "";
        appSdk?.location?.CustomField?.frame?.enableAutoResizing();

        setEntry(entryData);

        setState({
          config,
          location: appSdk?.location,
          appSdkInitialized: true,
        });
        setLoading(false);
      })
      .catch((error: any) => {
        console.error("appSdk initialization error", error);
        setError("Something went wrong!");
      });
  }, []);

  const updateEntry = (updatedData: any) => {
    const { location } = state;
    location.FieldModifierLocation?.field?.setData(updatedData);
  };

  const renderFieldModifier = () => {
    if (loading) {
      return (
        <SkeletonTile
          numberOfTiles={2}
          tileHeight={10}
          tileWidth={300}
          tileBottomSpace={20}
          tileTopSpace={10}
          tileleftSpace={10}
          tileRadius={10}
          data-testid="loading"
        />
      );
    }

    if (error) {
      return <p>{error}</p>;
    }

    return <></>;
  };

  return (
    <div className="field-modifier">
      <div className="field-modifier-container">{renderFieldModifier()}</div>
    </div>
  );
};

export default FieldModifierExtension;
