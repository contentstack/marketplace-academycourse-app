import ContentstackSDK from "@contentstack/app-sdk";
/** @jsx jsx */
import { jsx } from "@emotion/core";

export default ContentstackSDK.init().then(async (sdk: any) => {
  const extensionObj = await sdk["location"];
  const RTE = await extensionObj["RTEPlugin"]!;

  return {};
});
