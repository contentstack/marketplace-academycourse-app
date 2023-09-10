import Icon from "../../assets/sidebarwidget.svg";
import localeTexts from "../../common/locales/en-us/index";
import parse from "html-react-parser";
import ContentstackAppSdk from "@contentstack/app-sdk";
import { useEffect, useState } from "react";
import {
  SkeletonTile,
  Field,
  FieldLabel,
  Dropdown,
} from "@contentstack/venus-components";

import "./styles.scss";

const EntrySidebarExtension = () => {
  const [state, setState] = useState<any>({
    config: {},
    location: {},
    appSdkInitialized: false,
  });
  const [loading, setLoading] = useState(true);
  const [entryData, setEntryData] = useState<any>({});
  const [fieldList, setFieldList] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    ContentstackAppSdk.init()
      .then(async (appSdk) => {
        const config = await appSdk?.getConfig();
        const data = await appSdk?.location?.SidebarWidget?.entry?.getData();

        setEntryData(data);
        setState({
          config,
          location: appSdk?.location,
          appSdkInitialized: true,
        });
      })
      .catch((error) => {
        console.error("appSdk initialization error", error);
      });
  }, []);

  useEffect(() => {
    if (!state.appSdkInitialized) return;
    const tempFieldList: any =
      (
        Object.keys(entryData)?.filter(
          (i: any) => entryData?.[i]?.type === `academy`
        ) || []
      )?.map((i: any) => ({
        label: i?.replace(/_/g, " "),
        value: i,
      })) || [];

    if (!tempFieldList?.length) {
      setLoading(false);
      return;
    }

    tempFieldList[0] = { ...tempFieldList[0], default: true };
    setFieldList(tempFieldList);
    setLoading(false);
  }, [entryData, state.appSdkInitialized]);

  useEffect(() => {
    getCurrentFieldData(fieldList?.[0]);
  }, [fieldList]);

  const getCurrentFieldData = (field: any) => {
    if (!state.appSdkInitialized) return;
    const productData = entryData?.[field?.value]?.data?.length
      ? entryData?.[field?.value]?.data
      : [];

    setProducts(productData);
  };

  const handleDropDownChange = (event: any) => {
    getCurrentFieldData(event);
  };

  const renderProduct = () => {
    return <></>;
  };

  const renderSidebarContent = () => {
    if (loading)
      return (
        <div className="sidebar-center">
          <SkeletonTile
            numberOfTiles={1}
            tileBottomSpace={20}
            tileHeight={20}
            tileRadius={10}
            tileTopSpace={20}
            tileWidth={200}
            tileleftSpace={0}
          />
        </div>
      );
    if (!fieldList?.length || !products?.length)
      return (
        <div className="noProducts">{localeTexts.SidebarWidget.noProducts}</div>
      );
    return (
      <>
        {fieldList?.length > 1 ? (
          <Field>
            <FieldLabel htmlFor="field_list">
              {" "}
              {localeTexts.SidebarWidget.dropdownLabels.fields}
            </FieldLabel>
            <br />
            <Dropdown
              list={fieldList}
              onChange={handleDropDownChange}
              withSearch
              type="select"
              withArrow
              closeAfterSelect
              highlightActive
              maxWidth={250}
              className="sidebar_dropdowns"
            />
          </Field>
        ) : (
          ""
        )}

        {products?.length > 1 ? renderProduct() : ""}
      </>
    );
  };
  return (
    <div className="sidebar">
      <h3>{state?.config?.title}</h3>
      {renderSidebarContent()}
    </div>
  );
};

export default EntrySidebarExtension;
