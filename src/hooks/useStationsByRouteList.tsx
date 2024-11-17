import { useEffect, useState } from "react";
import {
  StationsByRouteList,
  stationsByRouteListFromJson,
} from "../models/bus/StationsByRouteList";
import { doc, DocumentSnapshot, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const baseUrl: string =
  "//ws.bus.go.kr/api/rest/busRouteInfo/getStaionByRoute?";

const docName: string = "StationsByRouteList";

export default function useStationsByRouteList(busLineQuery: number | null) {
  const [stationsList, setStationsList] = useState<StationsByRouteList | null>(
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
    const getStationsByRouteList = async (): Promise<void> => {
      const dbData: DocumentSnapshot = await getDoc(
        doc(db, docName, (busLineQuery ?? 0).toString()),
      );

      if (dbData.exists()) {
        console.log("StationsByRouteList existed");
        setStationsList(stationsByRouteListFromJson(dbData.data()));
      } else {
        const fetchUrl = `${baseUrl}${urlParams.toString()}`;
        console.log(fetchUrl);
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

          const toReturn: StationsByRouteList =
            stationsByRouteListFromJson(jsonResponse);
          setStationsList(toReturn);

          console.log("StationsByRouteList saved");
          await setDoc(
            doc(db, docName, (busLineQuery ?? 0).toString()),
            toReturn,
          );
        } catch (error) {
          console.log(error);
        }
      }
    };

    getStationsByRouteList();
  }, [busLineQuery]);

  return { stationsList };
}
