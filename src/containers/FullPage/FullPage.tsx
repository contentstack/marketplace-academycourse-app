import { useEffect, useState } from "react";
import ContentstackAppSDK from "@contentstack/app-sdk";
import { InfiniteScrollTable, Select } from "@contentstack/venus-components";
import './styles.scss'

const columns = [
    {
        Header: 'Title',
        accessor: 'title',
        columnWidthMultiplier: 1.9
    },
    {
        Header: 'UID',
        accessor: 'uid',
        id: 'uid',
        columnWidthMultiplier: 1.5

    },
    {
        Header: 'Locale',
        accessor: 'locale',
        columnWidthMultiplier: 1
    },
    {
        Header: 'Updated At',
        accessor: ((obj: any) => {
            return new Date(obj?.updated_at).toUTCString()
        }),
        columnWidthMultiplier: 2
    }
]

const FullPageExtension = () => {
  let itemStatusMap: any = {};

    const [state, setState] = useState<any>({
        config: {},
        location: {},
        appSdkInitialized: false,
    });

    const [contentTypes, setContentTypes] = useState<any[]>();
    const [entriesData, setEntriesData] = useState<any[]>([]);
    const [contentTypeOptions, setContentTypeOptions] = useState<any[]>([]);
    const [selectedContentType, setSelectedContentType] = useState<any>('')

        useEffect(() => {
        ContentstackAppSDK.init()
        .then(async (appSdk) => {
            const config = await appSdk?.getConfig();
            const { content_types } = await appSdk?.location?.FullPage?.stack?.getContentTypes() || {};
            setContentTypes(content_types);
            setState({
                config,
                location: appSdk?.location,
                appSdkInitialized: true,
            });

        })
    }, [])

    useEffect(() => {
        if(!state.appSdkInitialized) return
        let dropdownOptions: any = [];
        contentTypes?.forEach((contentType: any) => {
            dropdownOptions.push({
                label: contentType?.title,
                value: contentType?.uid,
            })
        })
        console.log(dropdownOptions);
        setContentTypeOptions(dropdownOptions);

    }, [contentTypes])

    const getEntriesOfAContentType = async (contentTypeUid: any) => {
        const { entries } = await state?.location?.FullPage?.stack?.ContentType(contentTypeUid).Entry.Query().find() || {}
        console.log(entries);
        setEntriesData(entries);
    }

    useEffect(() => {
        if(!Object.keys(selectedContentType).length) return
        getEntriesOfAContentType(selectedContentType?.value)
    }, [selectedContentType])

    const handleDropdownChange = (e: any) => {
        setSelectedContentType(e);
    }

    useEffect(() => {
        console.log(entriesData);
        entriesData?.forEach((_:any, index: any) => itemStatusMap[index] = 'loaded');
    }, [entriesData])

  return (
    <div className="full-page">
      <div className="full-page-container">
        <Select 
            options={contentTypeOptions}
            value={selectedContentType}
            onChange={handleDropdownChange}
            placeholder="Select Content Type"
            selectLabel="Content Type"
        />
        <InfiniteScrollTable 
                data={entriesData}
                columns={columns}
                uniqueKey={'uid'}
                totalCounts={entriesData.length}
                fetchTableData={() => {}}
                loadMoreItems={() => {}}
                itemStatusMap={itemStatusMap}
            /> 
      </div>
    </div>
  );
};
export default FullPageExtension;
