import { MessageHeader, msgHeaderFromJson } from "./msg-header";

export interface RoutePathListModel {
  msgHeader: MessageHeader;
  msgBody: MessageBodyRoutePathList;
}

export const routePathListModelFromJson = (json: any): RoutePathListModel => {
  return {
    msgHeader: msgHeaderFromJson(json.msgHeader),
    msgBody: messageBodyRoutePathListfromJson(json.msgBody),
  };
};

interface MessageBodyRoutePathList {
  itemList: ItemListRoutePathList[];
}

const messageBodyRoutePathListfromJson = (
  json: any,
): MessageBodyRoutePathList => {
  return { itemList: itemListRoutePathListFromJsonList(json.itemList) };
};

interface ItemListRoutePathList {
  no: number;
  gpsX: number;
  gpsY: number;
  posX: number;
  posY: number;
}

const itemListRoutePathListFromJson = (json: any): ItemListRoutePathList => {
  return {
    no: parseInt(json.no),
    gpsX: parseFloat(json.gpsX),
    gpsY: parseFloat(json.gpsY),
    posX: parseFloat(json.posX),
    posY: parseFloat(json.posY),
  };
};

const itemListRoutePathListFromJsonList = (
  list: any[],
): ItemListRoutePathList[] => {
  return list.map((e) => itemListRoutePathListFromJson(e));
};
