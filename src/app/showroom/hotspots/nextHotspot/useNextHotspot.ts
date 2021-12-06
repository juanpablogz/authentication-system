/* --- DEPENDENCIES --- */
import { useEffect } from 'react';
import { NextData } from './nextHotspotData';
import { useShowroom } from '@showroom/ShowroomContext';
import { Type } from '@showroom/hotspots/baseHotspot/baseHotspotData';
import { FormFields } from '@organisms/OptionPanel/NextHotspot/NextHotspot';
/* -------------------- */

interface UseResponse {
  setDataFromFields: (fields: FormFields) => void;
}

const useNextHotspot = (onGetData): UseResponse => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { editableHotspot, updateHotspot } = useShowroom();

  // Get data from Showroom
  useEffect(() => {
    if (editableHotspot?.type !== Type.next) return;
    if (onGetData) onGetData(editableHotspot as NextData);
  }, [editableHotspot, onGetData]);

  /*------------------*/
  /*  PUBLIC METHODS  */
  /*------------------*/
  // TODO: Here we should just pass all fields, avoid pass Type.next
  const setDataFromFields = (fields: FormFields): void => {
    updateHotspot({
      id: fields.id,
      type: Type.next,
      color: fields.color,
      class: fields.class,
      location: {
        pitch: parseFloat(fields.locationPitch),
        yaw: parseFloat(fields.locationYaw),
      },
    } as NextData);
  };

  /* RETURN VALUES */
  return { setDataFromFields };
};

export default useNextHotspot;
