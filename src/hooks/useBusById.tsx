import { useEffect, useState } from "react";
import { itemBusInfo, itemBusInfoFromJson } from "../models/bus/BusRouteList";
import { doc, DocumentSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

// const baseUrl: string =
// "//ws.bus.go.kr/api/rest/busRouteInfo/getBusRouteList?";

const docName: string = "BusRouteList";

// const basicParams: { [key: string]: string } = {
//   resultType: "json",
//   ServiceKey: import.meta.env.VITE_DATA_KR_API_KEY ?? "",
// };

// const urlParams = new URLSearchParams(basicParams);

export default function useBusById(busId: number | null) {
  const [busInfo, setBusInfo] = useState<itemBusInfo | null>();

  useEffect(() => {
    if (!busId) return;

    const getBusInfo = async (): Promise<void> => {
      const dbData: DocumentSnapshot = await getDoc(
        doc(db, docName, busId.toString()),
      );

      if (dbData.exists()) {
        console.log("busInfo from firestore");
        setBusInfo(itemBusInfoFromJson(dbData.data()));
      } else {
        console.log("no busInfo on firestore");
        // console.log("no bus route on firestore");
        // const fetchUrl = `${baseUrl}${urlParams.toString()}`;
        // try {
        //   const response = await fetch(fetchUrl, {
        //     headers: {
        //       // Accept: "application / json",
        //     },
        //     credentials: "include",
        //     method: "GET",
        //   });
        // if (!response.ok) {
        //   throw new Error(`${response.statusText}`);
        //   }
        //   const jsonResponse = await response.json();
        //   const toReturn: BusRouteListModel =
        //     busRouteListFromJson(jsonResponse);
        //   const queryBus: itemBusInfo | null =
        //     toReturn.msgBody.itemList.find((e) => e.busRouteId == busId) ??
        //     null;
        //   setBusInfo(queryBus);
        //   if (queryBus) {
        //     await setDoc(doc(db, docName, busId.toString()), queryBus);
        //     console.log(`${busId.toString()} saved to firestore`);
        //   }
        // } catch (error) {
        //   console.log(error);
        // }
      }
    };

    getBusInfo();
  }, [busId]);

  return { busInfo };
}
