export interface MessageHeader {
  headerMsg: string;
  headerCd: string;
  itemCount: number;
}

export const msgHeaderFromJson = (json: any): MessageHeader => {
  return {
    headerCd: json.headerCd,
    headerMsg: json.headerMsg,
    itemCount: json.itemCount,
  };
};
