import { useEffect, useState } from "react";
import {
  CoordToAddressModel,
  coordToAddressModelFromJson,
} from "../models/kakao-map/CoordToAddress";

const baseUrl: string = "//dapi.kakao.com/v2/local/geo/coord2address.json?";

export default function useMapCoordToAddress(xValue: number, yValue: number) {
  const [address, setAdress] = useState<CoordToAddressModel | null>();

  const basicParams: { [key: string]: string } = {
    x: xValue.toString(),
    y: yValue.toString(),
  };

  const urlParams = new URLSearchParams(basicParams);

  useEffect(() => {
    const getAddressByCoord = async (): Promise<void> => {
      const fetchUrl = `${baseUrl}${urlParams.toString()}`;
      try {
        const response = await fetch(fetchUrl, {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
            "content-type": "application/json;charset=UTF-8",
          },
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`${response.statusText}`);
        }
        const jsonResponse = await response.json();
        const toReturn: CoordToAddressModel =
          coordToAddressModelFromJson(jsonResponse);
        setAdress(toReturn);
      } catch (error) {
        console.log(error);
      }
    };

    getAddressByCoord();
  }, []);

  return { address };
}
