import { useEffect, useState } from "react";
import ContentstackAppSDK from "@contentstack/app-sdk";
import { InfiniteScrollTable } from "@contentstack/venus-components";
import "./styles.scss";

const StackDashboardExtension = () => {

    const [state, setState] = useState<any>({
        config: {},
        location: {},
        appSdkInitialized: false,
    });

    useEffect(() => {
        ContentstackAppSDK.init()
        .then(async (appSdk) => {
            const config = await appSdk?.getConfig();            
            setState({
                config,
                location: appSdk?.location,
                appSdkInitialized: true,
            });

        })
    }, [])
  return (

    <div className="dashboard">
      <div className="dashboard-container">
        {/* your code goes here */}
      </div>
    </div>
  );
};

export default StackDashboardExtension;
