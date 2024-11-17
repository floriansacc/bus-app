import { useEffect, useState } from "react";
import {
  RoutePathListModel,
  routePathListModelFromJson,
} from "../models/bus/RoutePathList";
import { doc, DocumentSnapshot, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const baseUrl: string = "//ws.bus.go.kr/api/rest/busRouteInfo/getRoutePath?";

const docName: string = "RoutePathList";

export default function useRoutePathList(busLineQuery: number | null) {
  const [routePathList, setRoutePathList] = useState<RoutePathListModel | null>(
    null,
  );
  const basicParams: { [key: string]: string } = {
    resultType: "json",
    ServiceKey: import.meta.env.VITE_DATA_KR_API_KEY ?? "",
    busRouteId: (busLineQuery ?? 0).toString(),
  };

  const urlParams = new URLSearchParams(basicParams);

  useEffect(() => {
    if (!busLineQuery) return;
    const getRoutePathList = async (): Promise<void> => {
      const dbData: DocumentSnapshot = await getDoc(
        doc(db, docName, (busLineQuery ?? 0).toString()),
      );

      if (dbData.exists()) {
        console.log("RoutePathList existed");
        setRoutePathList(routePathListModelFromJson(dbData.data()));
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

          const toReturn: RoutePathListModel =
            routePathListModelFromJson(jsonResponse);
          setRoutePathList(toReturn);

          console.log("RoutePathList saved");
          await setDoc(
            doc(db, docName, (busLineQuery ?? 0).toString()),
            toReturn,
          );
        } catch (error) {
          console.log(error);
        }
      }
    };

    getRoutePathList();
  }, [busLineQuery]);

  return { routePathList };
}
