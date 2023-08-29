import { useEffect, useState } from "react";
import ContentstackAppSDK from "@contentstack/app-sdk";
import { InfiniteScrollTable } from "@contentstack/venus-components";
import "./styles.scss";


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
        columnWidthMultiplier: 1.4

    },
    {
        Header: 'Count',
        accessor: 'count',
        columnWidthMultiplier: 0.7

    }
]

const StackDashboardExtension = () => {
    let itemStatusMap: any = {};

    const [state, setState] = useState<any>({
        config: {},
        location: {},
        appSdkInitialized: false,
    });

    const [entriesCounts, setEntriesCounts] = useState<any>([]);

    useEffect(() => {
        ContentstackAppSDK.init()
        .then(async (appSdk) => {
            const config = await appSdk?.getConfig();
            const { content_types } = await appSdk?.location?.DashboardWidget?.stack?.getContentTypes() || {};

            let entriesCountObj = await Promise.all(
                content_types?.map(async(content_type: any) => {
                    const {entries} = await appSdk?.location?.DashboardWidget?.stack?.ContentType(content_type.uid)?.Entry.Query().find()|| {}
                    return {uid: content_type?.uid, title: content_type?.title, count: entries?.length}
                })
            ) 
            setEntriesCounts(entriesCountObj);
            
            setState({
                config,
                location: appSdk?.location,
                appSdkInitialized: true,
            });

        })
    }, [])

    useEffect(() => {
        entriesCounts.forEach((_:any, index: any) => itemStatusMap[index] = 'loaded')
    }, [entriesCounts, itemStatusMap])

  return (

    <div className="dashboard">
      <div className="dashboard-container">
        {state?.appSdkInitialized && (
        <>
            <h2>
                Entries Count
            </h2>
            <InfiniteScrollTable 
                data={entriesCounts}
                columns={columns}
                uniqueKey={'uid'}
                totalCounts={entriesCounts.length}
                fetchTableData={() => {}}
                loadMoreItems={() => {}}
                itemStatusMap={itemStatusMap}
            />
        </>
        )}
      </div>
    </div>
  );
};

export default StackDashboardExtension;
