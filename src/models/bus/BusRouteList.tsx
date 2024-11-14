import { MessageHeader, msgHeaderFromJson } from "./msg-header";

export interface BusRouteListModel {
  msgHeader: MessageHeader;
  msgBody: MessageBodyBusRouteList;
}

export const busRouteListFromJson = (json: any): BusRouteListModel => {
  return {
    msgHeader: msgHeaderFromJson(json.msgHeader),
    msgBody: messageBodyBusRouteListFromJson(json.msgBody),
  };
};

interface MessageBodyBusRouteList {
  itemList: itemBusInfo[];
}

const messageBodyBusRouteListFromJson = (
  json: any,
): MessageBodyBusRouteList => {
  return { itemList: itemListBusRouteListFromJsonList(json.itemList) };
};

export interface itemBusInfo {
  busRouteId: number;
  busRouteNm: number;
  busRouteAbrv: number;
  length: number;
  routeType: number;
  stStationNm: string;
  edStationNm: string;
  term: number;
  lastBusYn: string;
  lastBusTm: string;
  firstBusTm: string;
  lastLowTm: string;
  firstLowTm: string;
  corpNm: string;
}

export const itemBusInfoFromJson = (json: any): itemBusInfo => {
  return {
    busRouteId: parseInt(json.busRouteId),
    busRouteNm: parseInt(json.busRouteNm),
    busRouteAbrv: parseInt(json.busRouteAbrv),
    length: parseInt(json.length),
    routeType: parseInt(json.routeType),
    stStationNm: json.stStationNm,
    edStationNm: json.edStationNm,
    term: parseInt(json.term),
    lastBusYn: json.lastBusYn,
    lastBusTm: json.lastBusTm,
    firstBusTm: json.firstBusTm,
    lastLowTm: json.lastLowTm,
    firstLowTm: json.firstLowTm,
    corpNm: json.corpNm,
  };
};

const itemListBusRouteListFromJsonList = (list: any[]): itemBusInfo[] => {
  return list.map((e) => itemBusInfoFromJson(e));
};
