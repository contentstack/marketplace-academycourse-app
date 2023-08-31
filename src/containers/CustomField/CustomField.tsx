import { useState, useEffect } from "react";

import ContentstackAppSdk from "@contentstack/app-sdk";
import {
  SkeletonTile,
  Button,
} from "@contentstack/venus-components";

import "./styles.scss";

const CustomFieldExtension = () => {
  const appName = "academy";

  const [state, setState] = useState<any>({
    config: {},
    location: {},
    appSdkInitialized: false,
  });
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  useEffect(() => {
    ContentstackAppSdk.init()
      .then(async (appSdk: any) => {
        const config = await appSdk?.getConfig();
        const entryData = appSdk?.location?.CustomField?.field?.getData();
        appSdk?.location?.CustomField?.frame?.enableAutoResizing();

        if (entryData?.data?.length) {
          setSelectedItems(entryData?.data);
        }

        setState({
          config,
          location: appSdk?.location,
          appSdkInitialized: true,
        });
        setLoading(false);
      })
      .catch((error: any) => {
        console.error("appSdk initialization error", error);
      });
  }, []);

  useEffect(() => {
    const { location } = state;
    if (!state?.appSdkInitialized) return;

    location.CustomField?.field?.setData({
      data: selectedItems,
      type: `${appName}`,
    });

    setLoading(false);
  }, [selectedItems]);

  const updateSelectedItems = (data: any) => {
    setSelectedItems((curr: any) => {
      const tempArr = [...curr];
      tempArr.push(data);
      return tempArr;
    });
  };

  const renderCustomField = () => {
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
    if (selectedItems?.length) {
      return (
        <div className="extension-content">
          {
            //add tag code here
          }
        </div>
      );
    }
    return (
      <div className="no-selected-items" data-test-id="noItem">
        No Products Added
      </div>
    );
  };

  /* Handle your UI as per requirement. State variable will hold
        the configuration details from the appSdk. */
  return (
    <div className="layout-container">
      {state?.appSdkInitialized && (
        <div className="field-extension-wrapper" data-test-id="field-wrapper">
          {renderCustomField()}
          <Button
            onClick={handleClick}
            className="add-audience-btn"
            buttonType="control"
            disabled={loading}
            isLoading={loading}
            version="v2"
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomFieldExtension;
