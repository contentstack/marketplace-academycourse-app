/** @jsx jsx */
import { jsx } from "@emotion/core";
import ContentstackSDK from "@contentstack/app-sdk";
import { Icon } from "@contentstack/venus-components";

import { onClickHandler } from "./academy";

export default ContentstackSDK.init().then(async (sdk:any) => {
    const extensionObj = await sdk["location"];
    const RTE = await extensionObj["RTEPlugin"]!;

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
