import { MessageHeader, msgHeaderFromJson } from "./msg-header";

export interface RouteInfoItemModel {
  msgHeader: MessageHeader;
  msgBody: MessageBodyRouteInfo;
}

export const routeInfoItemFromJson = (json: any): RouteInfoItemModel => {
  return {
    msgHeader: msgHeaderFromJson(json.msgHeader),
    msgBody: msgBodyFromJson(json.msgBody),
  };
};

interface MessageBodyRouteInfo {
  itemList: itemListRouteInfo[];
}

const msgBodyFromJson = (json: any): MessageBodyRouteInfo => {
  return { itemList: itemListFromJsonList(json.itemList) };
};

interface itemListRouteInfo {
  busRouteId: number;
  busRouteNm: string;
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

const itemListFromJson = (json: any): itemListRouteInfo => {
  return {
    busRouteId: parseInt(json.busRouteId),
    busRouteNm: json.busRouteNm,
    busRouteAbrv: parseInt(json.busRouteAbrv),
    length: parseFloat(json.length),
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

const itemListFromJsonList = (list: any[]): itemListRouteInfo[] => {
  return list.map((e) => itemListFromJson(e));
};
