import { useEffect, useState } from "react";
import Icon from "../../assets/assetsidebar.svg";
import localeTexts from "../../common/locales/en-us/index";
import ContentstackAppSDK from "@contentstack/app-sdk";
import './styles.scss'

const AssetSidebarExtension = () => {
    const [state, setState] = useState<any>({
        config: {},
        location: {},
        appSdkInitialized: false,
    });

    useEffect(() => {
        ContentstackAppSDK.init()
        .then(async(appSdk) => {
            const config = await appSdk?.getConfig();
            setState({
                config,
                location: appSdk?.location,
                appSdkInitialized: true,
            });
        })
    }, [])


  return (
    <div className="asset-sidebar">
      <div className="asset-sidebar-container">
        <div className="asset-sidebar-icon">
          <img src={Icon} alt="icon" />
        </div>
        <div className="app-component-content">
          {/* your code goes here */}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.contentstack.com/docs/developers/developer-hub/asset-sidebar-location/"
          >
            {localeTexts.AssetSidebarWidget.button.learnMore}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AssetSidebarExtension;
