import { useState, useEffect } from "react";
import ContentstackAppSdk from "@contentstack/app-sdk";

import localeTexts from "../../common/locales/en-us/index";

const AppConfigurationExtension = () => {
  const [state, setState] = useState<any>({
    installationData: {
      configuration: {
        /* Add all your config fields here */
        /* The key defined here should match with the name attribute
        given in the DOM that is being returned at last in this component */
        title: "",
      },
    },
    setInstallationData: (): any => {
      /* this method 'setInstallationData' is empty */
    },
    appSdkInitialized: false,
  });

  const mergeObjects = (target: any, source: any) => {
    // Iterate through `source` properties and if an `Object` then
    // set property to merge of `target` and `source` properties
    Object.keys(source)?.forEach((key) => {
      if (source[key] instanceof Object && key in target) {
        Object.assign(source[key], mergeObjects(target[key], source[key]));
      }
    });

    // Join `target` and modified `source`
    Object.assign(target || {}, source);
    return target;
  };

  useEffect(() => {
    ContentstackAppSdk.init()
      .then(async (appSdk) => {
        const sdkConfigData = appSdk?.location?.AppConfigWidget?.installation;
        if (sdkConfigData) {
          const installationDataFromSDK =
            await sdkConfigData.getInstallationData();
          const setInstallationDataOfSDK = sdkConfigData.setInstallationData;
          setState({
            ...state,
            installationData: mergeObjects(
              state?.installationData,
              installationDataFromSDK
            ),
            setInstallationData: setInstallationDataOfSDK,
            appSdkInitialized: true,
          });
        }
      })
      .catch((error) => {
        console.error("appSdk initialization error", error);
      });
  }, []);

  return (
    <div className="app-config">
      <div className="app-config-container">{/* add form code here */}</div>
    </div>
  );
};

export default AppConfigurationExtension;
