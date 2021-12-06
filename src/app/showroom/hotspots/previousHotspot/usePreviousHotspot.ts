/* --- DEPENDENCIES --- */
import { useEffect } from 'react';
import { PreviousData } from './previousHotspotData';
import { useShowroom } from '@showroom/ShowroomContext';
import { Type } from '@showroom/hotspots/baseHotspot/baseHotspotData';
import { FormFields } from '@organisms/OptionPanel/PreviousHotspot/PreviousHotspot';
/* -------------------- */

interface UseResponse {
  setDataFromFields: (fields: FormFields) => void;
}

const usePreviousHotspot = (onGetData): UseResponse => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { editableHotspot, updateHotspot } = useShowroom();

  // Get data from Showroom
  useEffect(() => {
    if (editableHotspot?.type !== Type.previous) return;
    if (onGetData) onGetData(editableHotspot as PreviousData);
  }, [editableHotspot, onGetData]);

  /*------------------*/
  /*  PUBLIC METHODS  */
  /*------------------*/
  // TODO: Here we should just pass all fields, avoid pass Type.previous
  const setDataFromFields = (fields: FormFields): void => {
    updateHotspot({
      id: fields.id,
      type: Type.previous,
      color: fields.color,
      class: fields.class,
      location: {
        pitch: parseFloat(fields.locationPitch),
        yaw: parseFloat(fields.locationYaw),
      },
    } as PreviousData);
  };

  /* RETURN VALUES */
  return { setDataFromFields };
};

export default usePreviousHotspot;
