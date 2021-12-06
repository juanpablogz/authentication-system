/* --- DEPENDENCIES --- */
import { useEffect } from 'react';
import { GoToData } from './goToHotspotData';
import { useShowroom } from '@showroom/ShowroomContext';
import { Type } from '@showroom/hotspots/baseHotspot/baseHotspotData';
import { FormFields } from '@organisms/OptionPanel/GoToHotspot/GoToHotspot';
/* -------------------- */

interface UseResponse {
  setDataFromFields: (fields: FormFields) => void;
}

const useGoToHotspot = (onGetData): UseResponse => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { editableHotspot, updateHotspot } = useShowroom();

  // Get data from Showroom
  useEffect(() => {
    if (editableHotspot?.type !== Type.goto) return;
    if (onGetData) onGetData(editableHotspot as GoToData);
  }, [editableHotspot, onGetData]);

  /*------------------*/
  /*  PUBLIC METHODS  */
  /*------------------*/
  // TODO: Here we should just pass all fields, avoid pass Type.next
  const setDataFromFields = (fields: FormFields): void => {
    console.log(fields);
    updateHotspot({
      id: fields.id,
      type: Type.goto,
      target: fields.target,
      color: fields.color,
      class: fields.class,
      location: {
        pitch: parseFloat(fields.locationPitch),
        yaw: parseFloat(fields.locationYaw),
      },
    } as GoToData);
  };

  /* RETURN VALUES */
  return { setDataFromFields };
};

export default useGoToHotspot;
