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
    const [assetData, setAssetData] = useState<any>({});

    useEffect(() => {
        ContentstackAppSDK.init()
        .then(async(appSdk) => {
            const config = await appSdk?.getConfig();
            const assetDataFromLocation = await appSdk?.location?.AssetSidebarWidget?.getData();
            setAssetData(assetDataFromLocation);
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
          <h4>{localeTexts.AssetSidebarWidget.title}</h4>
          <div>Filename : {assetData?.filename}</div>
          <div>Dimensions : {assetData?.dimension?.height} x {assetData?.dimension?.width}</div>
          <div>URL: {assetData?.url}</div>
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
