import { cloneDeep } from "lodash";

export const onClickHandler = (rte: any) => {
    const getNode = rte?.getNode([0])
        
    let rteData:any = [];

    const findRteObj = (obj:any) => {
        for (let key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            if (obj[key]?.type === "p") {
            rteData.push(obj[key]);
            } else {
            findRteObj(obj[key]);
            }
        }
        }
    };

    findRteObj(getNode);

    const path = rteData?.map((path:any) => {
        return rte?.getPath(path);
    });

    const rteDataCopy = cloneDeep(rteData);

    rteDataCopy.forEach((element:any) => {
        element?.children?.forEach((j:any) => {
        j.text = j?.text?.toUpperCase();
        })
    });

    for (let i = 0; i < rteDataCopy?.length; i++) {
        
        rte?.deleteNode({at: path[i]});
        
        rte.insertNode(rteDataCopy[i], {
            at: path[i],
        });
    }
}