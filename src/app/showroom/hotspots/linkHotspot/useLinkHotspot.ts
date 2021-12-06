/* --- DEPENDENCIES --- */
import { useEffect } from 'react';
import { LinkData } from './linkHotspotData';
import { useShowroom } from '@showroom/ShowroomContext';
import { Type } from '@showroom/hotspots/baseHotspot/baseHotspotData';
import { FormFields } from '@organisms/OptionPanel/LinkHotspot/LinkHotspot';
/* -------------------- */

interface UseResponse {
  setDataFromFields: (fields: FormFields) => void;
}

const useLinkHotspot = (onGetData): UseResponse => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { editableHotspot, updateHotspot } = useShowroom();

  // Get data from Showroom
  useEffect(() => {
    if (editableHotspot?.type !== Type.link) return;
    if (onGetData) onGetData(editableHotspot as LinkData);
  }, [editableHotspot, onGetData]);

  /*------------------*/
  /*  PUBLIC METHODS  */
  /*------------------*/
  // TODO: Here we should just pass all fields, avoid pass Type.link
  const setDataFromFields = (fields: FormFields): void => {
    updateHotspot({
      id: fields.id,
      type: Type.link,
      link: fields.link,
      icon: fields.icon,
      class: fields.class,
      size: {
        width: fields.sizeWidth,
        height: fields.sizeHeight,
      },
      location: {
        pitch: parseFloat(fields.locationPitch),
        yaw: parseFloat(fields.locationYaw),
      },
    } as LinkData);
  };

  /* RETURN VALUES */
  return { setDataFromFields };
};

export default useLinkHotspot;
