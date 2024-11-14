import { useEffect, useState } from "react";
import {
  routeInfoItemFromJson,
  RouteInfoItemModel,
} from "../models/bus/RouteInfoItem";
import { doc, DocumentSnapshot, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const baseUrl: string =
  "http://ws.bus.go.kr/api/rest/busRouteInfo/getRouteInfo?";

const docName: string = "RouteInfoItem";

export default function useRouteInfoItem(busLineQuery: number | null) {
  const [routeInfo, setRouteInfo] = useState<RouteInfoItemModel | null>(null);

  const basicParams: { [key: string]: string } = {
    resultType: "json",
    ServiceKey: import.meta.env.VITE_DATA_KR_API_KEY ?? "",
    busRouteId: (busLineQuery ?? 0).toString(),
  };

  const urlParams = new URLSearchParams(basicParams);

  useEffect(() => {
    if (!busLineQuery) return;
    const getRouteInfoItem = async (): Promise<void> => {
      const dbData: DocumentSnapshot = await getDoc(
        doc(db, docName, busLineQuery.toString()),
      );

      if (dbData.exists()) {
        console.log("RouteInfoItem existed");
        setRouteInfo(routeInfoItemFromJson(dbData.data()));
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
          if (!jsonResponse) return;

          const toReturn: RouteInfoItemModel =
            routeInfoItemFromJson(jsonResponse);
          setRouteInfo(toReturn);

          console.log("RouteInfoItem saved");
          await setDoc(doc(db, docName, busLineQuery.toString()), toReturn);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getRouteInfoItem();
  }, [busLineQuery]);

  return { routeInfo };
}
