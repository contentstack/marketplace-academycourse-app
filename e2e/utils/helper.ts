// module dependencies
import { Page } from "@playwright/test";
import { EntryPage } from "../pages/EntryPage";
const axios = require("axios");
const jsonfile = require("jsonfile");
const FormData = require("form-data");
const path = require("path");
const fs = require("fs");

interface ExtensionUid {
  uid: string;
}

const {
  STACK_API_KEY,
  ORG_ID,
  APP_BASE_URL,
  EMAIL,
  PASSWORD,
  DEVELOPER_HUB_API,
  BASE_API_URL,
}: any = process.env;

const file = "data.json";

const savedObj: any = {};

// initialize entry class
export const initializeEntry = async (page: Page) => {
  return new EntryPage(page);
};

// entry page access
export const entryPageFlow = async (
  savedCredentials: { contentTypeId: any; entryUid: any },
  entryPage: EntryPage
) => {
  //navigate to stacks page
  const { contentTypeId, entryUid } = savedCredentials;
  await entryPage.navigateToEntry(STACK_API_KEY, contentTypeId, entryUid);
};

const writeFile = async (obj: any) => {
  jsonfile
    .writeFile(file, obj)
    .then((res: any) => {
      return res;
    })
    .catch((error: any) => console.error(error));
};

// Upload an asset to the stack
export const assetUpload = async (
  stackApiKey: string | undefined,
  authToken: string
) => {
  const assetPath = await path.resolve(__dirname, "../../public/logo192.png");
  const readFile = await fs.createReadStream(assetPath);
  const form = new FormData();
  form.append("asset[upload]", readFile, "test-asset");
  let options = {
    headers: {
      "Content-Type": "multipart/form-data",
      api_key: stackApiKey,
      authtoken: authToken,
      ...form.getHeaders(),
    },
    data: form,
  };
  try {
    return await axios.post(`https://${BASE_API_URL}/v3/assets`, form, options);
  } catch (error) {
    console.error(error);
  }
};

export const deleteAsset = async (authToken: string, assetUid: string) => {
  let options = {
    url: `https://${BASE_API_URL}/v3/assets/${assetUid}`,
    method: "DELETE",
    headers: {
      api_key: STACK_API_KEY,
      authtoken: authToken,
      "Content-type": "application/json",
    },
  };
  try {
    return await axios(options);
  } catch (error) {
    console.error(error);
  }
};

// get authtoken
export const getAuthToken = async () => {
  let options = {
    url: `https://${BASE_API_URL}/v3/user-session`,
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    data: {
      user: {
        email: EMAIL,
        password: PASSWORD,
      },
    },
  };
  try {
    let result = await axios(options);
    savedObj["authToken"] = result.data.user.authtoken;
    await writeFile(savedObj);
    return result.data.user.authtoken;
  } catch (error) {
    console.error(error);
  }
};

// create app in developer hub
export const createApp = async (authToken: string) => {
  let options = {
    url: `https://${DEVELOPER_HUB_API}/apps`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      organization_uid: ORG_ID,
      authtoken: authToken,
    },
    data: {
      name: `App Boilerplate ${Math.floor(Math.random() * 1000)}`,
      target_type: "stack",
    },
  };
  try {
    let result = await axios(options);
    return result.data.data.uid;
  } catch (error) {
    return error;
  }
};

// updating app in developer hub & set baseUrl
export const updateApp = async (authToken: string, appId: string) => {
  let options = {
    url: `https://${DEVELOPER_HUB_API}/apps/${appId}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      organization_uid: ORG_ID,
      authtoken: authToken,
    },
    data: {
      ui_location: {
        locations: [
          {
            type: "cs.cm.stack.sidebar",
            meta: [
              {
                name: `Entry sidebar _${Math.floor(Math.random() * 1000)}`,
                enabled: true,
                path: "/entry-sidebar",
                signed: false,
              },
            ],
          },
          {
            type: "cs.cm.stack.dashboard",
            meta: [
              {
                name: `Stack Dashboard Boilerplate _${Math.floor(
                  Math.random() * 1000
                )}`,
                path: "/stack-dashboard",
                signed: false,
                enabled: true,
                default_width: "full",
              },
            ],
          },
          {
            type: "cs.cm.stack.asset_sidebar",
            meta: [
              {
                name: `Asset Sidebar Boilerplate _${Math.floor(
                  Math.random() * 1000
                )}`,
                path: "/asset-sidebar",
                signed: false,
                enabled: true,
                width: 500,
              },
            ],
          },
          {
            type: "cs.cm.stack.rte",
            meta: [
              {
                name: `JsonRte Boilerplate _${Math.floor(
                  Math.random() * 1000
                )}`,
                enabled: true,
                path: "/json-rte.js",
              },
            ],
          },
          {
            type: "cs.cm.stack.config",
            meta: [
              {
                name: `App Boilerplate _${Math.floor(Math.random() * 1000)}`,
                path: "/app-configuration",
                signed: false,
                enabled: true,
              },
            ],
          },
          {
            type: "cs.cm.stack.custom_field",
            meta: [
              {
                name: `App Boilerplate _${Math.floor(Math.random() * 1000)}`,
                path: "/custom-field",
                signed: false,
                enabled: true,
                data_type: "text",
              },
            ],
          },
        ],
        signed: true,
        base_url: APP_BASE_URL,
      },
    },
  };
  try {
    let result = await axios(options);
    return result.data;
  } catch (error) {
    return error;
  }
};

// get installed app
export const getInstalledApp = async (authToken: string, appId: string) => {
  let options = {
    url: `https://${DEVELOPER_HUB_API}/apps/${appId}/installations`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      organization_uid: ORG_ID,
      authtoken: authToken,
    },
  };
  try {
    const result = await axios(options);
    return result.data;
  } catch (error) {
    return error;
  }
};

// install app in stack & return installation id
export const installApp = async (
  authToken: string,
  appId: string,
  stackApiKey: string | undefined
) => {
  let options = {
    url: `https://${DEVELOPER_HUB_API}/apps/${appId}/install`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      organization_uid: ORG_ID,
      authtoken: authToken,
    },
    data: {
      target_type: "stack",
      target_uid: stackApiKey,
    },
  };
  try {
    let result = await axios(options);
    return result.data.data.installation_uid;
  } catch (error) {
    return error;
  }
};

// uninstall app from the stack
export const uninstallApp = async (authToken: string, installId: string) => {
  let options = {
    url: `https://${DEVELOPER_HUB_API}/installations/${installId}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      organization_uid: ORG_ID,
      authtoken: authToken,
    },
  };
  try {
    let result = await axios(options);
    return result.data;
  } catch (error) {
    return error;
  }
};

// deletes the created test app during tear down
export const deleteApp = async (token: string, appId: string) => {
  let options = {
    url: `https://${DEVELOPER_HUB_API}/apps/${appId}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      organization_uid: ORG_ID,
      authtoken: token,
    },
  };
  try {
    await axios(options);
  } catch (error) {
    return error;
  }
};

// create content-type
export const createContentType = async (
  authToken: string,
  extension_uid: ExtensionUid[]
) => {
  const generateUid = `Test Content Type_${Math.floor(Math.random() * 1000)}`;
  let options = {
    url: `https://${BASE_API_URL}/v3/content_types`,
    method: "POST",
    headers: {
      api_key: STACK_API_KEY,
      authtoken: authToken,
      "Content-type": "application/json",
    },
    data: {
      content_type: {
        title: generateUid,
        uid: generateUid.replace(/\s/g, "_").toLowerCase(),
        schema: [
          {
            display_name: "Title",
            uid: "title",
            data_type: "text",
            field_metadata: {
              _default: true,
            },
            unique: false,
            mandatory: true,
            multiple: false,
          },
          {
            display_name: "URL",
            uid: "url",
            data_type: "text",
            field_metadata: {
              _default: true,
            },
            unique: false,
            multiple: false,
          },
          {
            display_name: "App Boilerplate",
            uid: "text",
            data_type: "json",
            extension_uid: extension_uid,
            config: {},
            mandatory: true,
            field_metadata: {
              extension: true,
            },
            multiple: false,
            unique: false,
          },
        ],
      },
    },
  };
  try {
    let result = await axios(options);
    return result.data;
  } catch (error) {
    return error;
  }
};

// create entry
export const createEntry = async (authToken: string, contentTypeId: string) => {
  let generateTitle = `Test Entry ${Math.floor(Math.random() * 1000)}`;
  let options = {
    url: `https://${BASE_API_URL}/v3/content_types/${contentTypeId}/entries`,
    params: { locale: "en-us" },
    method: "POST",
    headers: {
      api_key: STACK_API_KEY,
      authtoken: authToken,
      "Content-type": "application/json",
    },
    data: {
      entry: {
        title: generateTitle,
        url: "test-entry",
      },
    },
  };
  try {
    let result = await axios(options);
    return result.data;
  } catch (error) {
    return error;
  }
};

// deletes the created content type during tear down
export const deleteContentType = async (
  token: string,
  contentTypeId: string
) => {
  let options = {
    url: `https://${BASE_API_URL}/v3/content_types/${contentTypeId}`,
    method: "DELETE",
    headers: {
      api_key: STACK_API_KEY,
      authtoken: token,
      "Content-type": "application/json",
    },
  };
  try {
    await axios(options);
  } catch (error) {
    return error;
  }
};

// get list of apps/extension IDs
export const getExtensionFieldUid = async (authToken: string) => {
  let options = {
    url: `https://${BASE_API_URL}/v3/extensions`,
    method: "GET",
    params: {
      query: {
        type: "field",
      },
      include_marketplace_extensions: true,
    },
    headers: {
      api_key: STACK_API_KEY,
      authtoken: authToken,
    },
  };
  try {
    let result = await axios(options);
    return result.data.extensions[0].uid;
  } catch (error) {
    console.error(error);
  }
};
