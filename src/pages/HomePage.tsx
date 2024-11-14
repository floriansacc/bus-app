import BusPage from "./BusPage";

export default function HomePage() {
  // const { routeInfo } = useRouteInfoItem(100100112);
  // const { address } = useMapCoordToAddress(
  //   routePathList?.msgBody.itemList[10].gpsX ?? 0,
  //   routePathList?.msgBody.itemList[10].gpsY ?? 0,
  // );

  // const { busRouteList } = useBusRouteList();
  // console.log(busRouteList);

  // console.log(routeInfo?.msgBody.itemList[0].stStationNm);

  // console.log(routePathList?.msgBody.itemList[0]);

  // const fetchData = async (): Promise<void> => {
  //   await getDoc(doc(db, "RoutePathList", "100100112")).then((snapspot) => {
  //     if (snapspot.exists()) {
  //       const test: RoutePathListModel = routePathListModelFromJson(
  //         snapspot.data(),
  //       );
  //       console.log(test.msgBody.itemList[0]);
  //     } else {
  //       console.log("no data");
  //     }
  //   });
  // };
  // fetchData();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start">
      <h1 className="my-10 text-xl font-semibold">Bus app</h1>
      {/* <ThreeJsText /> */}
      <BusPage />
    </div>
  );
}
