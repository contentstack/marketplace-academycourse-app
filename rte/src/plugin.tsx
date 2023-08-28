/** @jsx jsx */
import { jsx } from "@emotion/core";
import ContentstackSDK from "@contentstack/app-sdk";
import { Icon } from "@contentstack/venus-components";

import { onClickHandler } from "./academy";

export default ContentstackSDK.init().then(async (sdk) => {
    const extensionObj = await sdk["location"];
    const RTE = await extensionObj["RTEPlugin"]!;
    console.info("Hello sdk", sdk);
    if (!RTE) return;

    const Academy = RTE("academy", () => {
      return {
        title: "Capitalize",
        icon: <Icon icon="Settings" />,
      };
    });

    //@ts-ignore
    Academy.on("exec", async (rte: RTE) => {
      try {
        onClickHandler(rte);
      } catch (e) {
        console.error("Error", e);
      }
    });

    return {
      Academy,
    };
});
