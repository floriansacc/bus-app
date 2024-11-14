import { RouteInfoItemModel } from "../models/bus/RouteInfoItem";

export default function BusDisplay(busInfo: RouteInfoItemModel) {
  return (
    <div>
      <div>{busInfo.msgBody.itemList[0].busRouteAbrv}</div>
      <div></div>
    </div>
  );
}
