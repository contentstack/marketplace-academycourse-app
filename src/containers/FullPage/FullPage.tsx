import "./styles.scss";

import { useEffect, useState } from "react";

import ContentstackAppSDK from "@contentstack/app-sdk";

const FullPageExtension = () => {
  const [state, setState] = useState<any>({
    config: {},
    location: {},
    appSdkInitialized: false,
  });

  useEffect(() => {
    ContentstackAppSDK.init().then(async (appSdk) => {
      const config = await appSdk?.getConfig();
      setState({
        config,
        location: appSdk?.location,
        appSdkInitialized: true,
      });
    });
  }, []);

  return (
    <div className="full-page">
      <div className="full-page-container">{/* your code goes here */}</div>
    </div>
  );
};
export default FullPageExtension;
