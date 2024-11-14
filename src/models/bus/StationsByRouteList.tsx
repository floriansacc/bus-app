import { MessageHeader, msgHeaderFromJson } from "./msg-header";

export interface StationsByRouteList {
  msgHeader: MessageHeader;
  msgBody: MessageBodyStationsByRouteList;
}

export const stationsByRouteListFromJson = (json: any): StationsByRouteList => {
  return {
    msgHeader: msgHeaderFromJson(json.msgHeader),
    msgBody: messageBodyStationsByRouteListFromJson(json.msgBody),
  };
};

interface MessageBodyStationsByRouteList {
  itemList: ItemListStationsByRouteList[];
}

const messageBodyStationsByRouteListFromJson = (
  json: any,
): MessageBodyStationsByRouteList => {
  return { itemList: itemListStationsByRouteListFromJsonList(json.itemList) };
};

interface ItemListStationsByRouteList {
  busRouteId: number;
  busRouteNm: number;
  busRouteAbrv: number;
  seq: number;
  section: number;
  station: number;
  arsId: number;
  stationNm: string;
  gpsX: number;
  gpsY: number;
  posX: number;
  posY: number;
  fullSectDist: number;
  direction: string;
  stationNo: number;
  routeType: number;
  beginTm: string;
  lastTm: string;
  trnstnid: number;
  sectSpd: number;
  transYn: string;
}

const itemListStationsByRouteListFromJson = (
  json: any,
): ItemListStationsByRouteList => {
  return {
    busRouteId: parseInt(json.busRouteId),
    busRouteNm: parseInt(json.busRouteNm),
    busRouteAbrv: parseInt(json.busRouteAbrv),
    seq: parseInt(json.seq),
    section: parseFloat(json.section),
    station: parseFloat(json.station),
    arsId: parseInt(json.arsId),
    stationNm: json.stationNm,
    gpsX: parseFloat(json.gpsX),
    gpsY: parseFloat(json.gpsY),
    posX: parseFloat(json.posX),
    posY: parseFloat(json.posY),
    fullSectDist: parseInt(json.fullSectDist),
    direction: json.direction,
    stationNo: parseInt(json.stationNo),
    routeType: parseInt(json.routeType),
    beginTm: json.beginTm,
    lastTm: json.lastTm,
    trnstnid: parseInt(json.trnstnid),
    sectSpd: parseFloat(json.sectSpd),
    transYn: json.transYn,
  };
};

const itemListStationsByRouteListFromJsonList = (
  list: any[],
): ItemListStationsByRouteList[] => {
  return list.map((e) => itemListStationsByRouteListFromJson(e));
};
