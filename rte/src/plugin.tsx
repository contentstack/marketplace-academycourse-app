import React from "react";
import ContentstackSDK from "@contentstack/app-sdk";
import parse from "html-react-parser";
import editIcon from "./public/edit.svg";
import plugin from "./public/plugin.svg";
import localeTexts from "./common/locales/en-us/index";
import "./index.css";

export default ContentstackSDK.init().then(async (sdk) => {
  const extensionObj = await sdk["location"];
  const RTE = await extensionObj["RTEPlugin"];
  if (!RTE) return;

  const RtePlugin = RTE("RTE Plugin", () => ({
    title: "JSON-RTE-Plugin",
    icon: <img style={{ padding: "0 6px" }} src={editIcon} />,
    render: (props: any) => {
      return (
        <div className="rte-container">
          <div className="custom-field">
            <div className="custom-field-container">
              <div className="custom-field-icon">
                <img src={plugin} alt="icon" />
              </div>
              <div className="app-component-content">
                <h4>{localeTexts.RTE.title}</h4>
                <p>{localeTexts.RTE.description}</p>
              </div>
            </div>
          </div>
          <div className="app-component-content">
            <p>{parse(localeTexts.RTE.body)}</p>
            <a href="/">{localeTexts.RTE.button.learnMore}</a>
          </div>
        </div>
      );
    },
    displayOn: ["toolbar"],
    elementType: ["block"],
  }));

  return {
    RtePlugin,
  };
});
