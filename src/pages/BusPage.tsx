import { useEffect, useState } from "react";
import useBusById from "../hooks/useBusById";
import MapComponent from "../components/map/MapComponent";
import useRoutePathList from "../hooks/useRoutePathList";
import FormInputBox from "../components/form-component/FormInputBox";
import useStationsByRouteList from "../hooks/useStationsByRouteList";
import useRouteInfoItem from "../hooks/useRouteInfoItem";

export default function BusPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchedLine, setserchedLine] = useState<number | null>(null);

  // const { routePathList } = useRoutePathList(searchedLine);
  const { busInfo } = useBusById(searchedLine);

  const { stationsList } = useStationsByRouteList(busInfo?.busRouteId ?? null);

  const { routePathList } = useRoutePathList(busInfo?.busRouteId ?? null);
  const { routeInfo } = useRouteInfoItem(busInfo?.busRouteId ?? null);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (parseInt(searchValue) === searchedLine) return;
    setSearchValue("");
    setserchedLine(parseInt(searchValue));
    console.log(searchValue);
  };

  useEffect(() => {
    if (!busInfo) return;
    console.log(busInfo);
  }, [busInfo]);

  useEffect(() => {
    if (!stationsList) return;
    console.log(stationsList);
  }, [stationsList]);

  useEffect(() => {
    if (!routeInfo) return;
    console.log(routeInfo);
  }, [routeInfo]);

  useEffect(() => {
    if (!routePathList) return;
    console.log(routePathList);
  }, [routePathList]);

  return (
    <div className="flex bg-gray-200 p-4">
      <div className="flex flex-col items-end">
        <form className="mb-2" onSubmit={handleSubmit}>
          <FormInputBox
            description="Search by bus number"
            searchValue={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
          />
        </form>
        <MapComponent routePathList={routePathList} />
      </div>
    </div>
  );
}
