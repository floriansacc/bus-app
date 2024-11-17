import { useEffect, useState } from "react";
import {
  busRouteListFromJson,
  BusRouteListModel,
} from "../models/bus/BusRouteList";
import { doc, DocumentSnapshot, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const baseUrl: string =
  "http://ws.bus.go.kr/api/rest/busRouteInfo/getBusRouteList?";

const docName: string = "BusRouteList";

const basicParams: { [key: string]: string } = {
  resultType: "json",
  ServiceKey: import.meta.env.VITE_DATA_KR_API_KEY ?? "",
};

const urlParams = new URLSearchParams(basicParams);

export default function useBusRouteList() {
  const [busRouteList, setBusRouteList] = useState<BusRouteListModel | null>(
    null,
  );

  useEffect(() => {
    const getBusRouteList = async (): Promise<void> => {
      const dbData: DocumentSnapshot = await getDoc(doc(db, docName, docName));

      if (dbData.exists()) {
        console.log("BusRouteList existed");
        setBusRouteList(busRouteListFromJson(dbData.data()));
      } else {
        console.log("no doc");

        const fetchUrl = `${baseUrl}${urlParams.toString()}`;
        try {
          const response = await fetch(fetchUrl, {
            headers: {
              // Accept: "application / json",
            },
            credentials: "include",
            method: "GET",
          });
          if (!response.ok) {
            throw new Error(`${response.statusText}`);
          }
          const jsonResponse = await response.json();
          const toReturn: BusRouteListModel =
            busRouteListFromJson(jsonResponse);
          setBusRouteList(toReturn);

          // toReturn.msgBody.itemList.forEach(async (e) => {
          //   const previousDoc: DocumentSnapshot = await getDoc(
          //     doc(db, docName, e.busRouteNm.toString()),
          //   );
          //   if (!previousDoc.exists()) {
          //     await setDoc(doc(db, docName, e.busRouteNm.toString()), e);
          //     console.log(`saved ${e.busRouteNm}`);
          //   }
          // });

          console.log("BusRouteList saved");
          await setDoc(doc(db, docName, docName), toReturn);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getBusRouteList();
  }, []);

  return { busRouteList };
}
