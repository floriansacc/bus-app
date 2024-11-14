import { Map, Polyline } from "react-kakao-maps-sdk";
import { RoutePathListModel } from "../../models/bus/RoutePathList";

export default function MapComponent({ routePathList }: MapComponentProps) {
  return (
    <div className="h-[500px] w-[500px] border border-solid border-black">
      <Map
        center={{
          lat: routePathList?.msgBody.itemList[150].gpsY ?? 0,
          lng: routePathList?.msgBody.itemList[150].gpsX ?? 0,
        }}
        className="h-full w-full"
      >
        <Polyline
          path={
            routePathList?.msgBody.itemList.map((e) => ({
              lat: e.gpsY,
              lng: e.gpsX,
            })) ?? []
          }
          strokeWeight={3} // 선의 두께입니다
          strokeColor={"#000"} // 선의 색깔입니다
          strokeOpacity={0.8} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle={"solid"} // 선의 스타일입니다
        />
        {/* <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Test marker</div>
        </MapMarker> */}
      </Map>
    </div>
  );
}

interface MapComponentProps {
  routePathList: RoutePathListModel | null;
}
