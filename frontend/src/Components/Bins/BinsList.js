import Bin from "./Bin.js";

import ModalUserDefined from "../BasicComponents/ModalUserDefined.js";
import AddModalWithRenameSupport from "../ModalWithRenameSupport/AddModalWithRenameSupport.js";
import Backdrop from "../BasicComponents/Backdrop.js";

import MapModal from "../Map/MapModal.js";

import useOutsideAlerter from "../BasicComponents/CustomHook";

import { useState } from "react";

function BinsList(props) {
  const [SeeMap, setSeeMap] = useState(false);
  const [MapData, setMapData] = useState([]);
  const [SeeModalAndBackdrop, setSeeModalAndBackdrop] = useState(false);
  const [SeeRenamingModalAndBackdrop, setSeeRenamingModalAndBackdrop] = useState(false);

  function SeeRoutingMap(){
    setMapData(props.AllData);
    setSeeMap(true);
  }

  function functionSeeMap(mapIds) {
    let mapData = props.AllData.filter((bin) => mapIds.includes(bin.id));
    setMapData(mapData);
    setSeeMap(true);
  }

  function functionSeeModalAndBackdrop() {
    setSeeModalAndBackdrop(true);
  }

  function functionSeeRenamingModalAndBackdrop() {
    setSeeRenamingModalAndBackdrop(true);
  }

  function cancelModal() {
    setSeeMap(false);
    setSeeModalAndBackdrop(false);
    setSeeRenamingModalAndBackdrop(false);
  }

  let binsWidgets = props.AllData.map((bin) => (
    <Bin
      PostRequest={props.PostRequest}
      Text={props.Text}
      key={bin.id}
      ID={bin.id}
      Name={bin.config.name}
      Latitude={bin.config.latitude}
      Longitude={bin.config.longitude}
      EmptyDistanceReading={bin.config.empty_distance_reading}
      FullDistanceReading={bin.config.full_distance_reading}
      Fullness={Math.floor(bin.fullness * 100)}
      showPropertiesButton={props.showPropertiesButton}

      varSeeMap={SeeMap}
      varSeeModalAndBackdrop={SeeModalAndBackdrop}
      varSeeRenamingModalAndBackdrop={SeeRenamingModalAndBackdrop}

      foofunctionSeeMap={functionSeeMap}
      foofunctionSeeModalAndBackdrop={functionSeeModalAndBackdrop}
      foofunctionSeeRenamingModalAndBackdrop={functionSeeRenamingModalAndBackdrop}
      foocancelModal={cancelModal}
    />
  ));

  return <div>
    <div className="flex items-center justify-center m-5">
      <button 
        className="m-1 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={SeeRoutingMap}>
          Compute Route
      </button>
    </div>
    <div className="flex flex-wrap w-[calc(100vw-2.5rem)] justify-center gap-x-1">
        {(SeeModalAndBackdrop || SeeRenamingModalAndBackdrop || SeeMap) && 
          (<Backdrop 
            onClick={cancelModal}
            />)
          }
        {
          (SeeMap) && (<MapModal AllData={MapData}/>)
        }
        {binsWidgets}
    </div>
  </div>;
}

export default BinsList;
