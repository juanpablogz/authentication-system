/* --- DEPENDENCIES --- */
import { useEffect } from 'react';
import { IframeData } from './iframeHotspotData';
import { useShowroom } from '@showroom/ShowroomContext';
import { Type } from '@showroom/hotspots/baseHotspot/baseHotspotData';
import { FormFields } from '@organisms/OptionPanel/IframeHotspot/IframeHotspot';
/* -------------------- */

interface UseResponse {
  setDataFromFields: (fields: FormFields) => void;
}

const useIframeHotspot = (onGetData): UseResponse => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { editableHotspot, updateHotspot } = useShowroom();

  // Get data from Showroom
  useEffect(() => {
    if (editableHotspot?.type !== Type.iframe) return;
    if (onGetData) onGetData(editableHotspot as IframeData);
  }, [editableHotspot, onGetData]);

  /*------------------*/
  /*  PUBLIC METHODS  */
  /*------------------*/
  // TODO: Here we should just pass all fields, avoid pass Type.next
  const setDataFromFields = (fields: FormFields): void => {
    updateHotspot({
      type: Type.iframe,
      id: fields.id,
      class: fields.class,
      url: fields.url,
      goback: fields.goback,
      location: {
        pitch: parseFloat(fields.locationPitch),
        yaw: parseFloat(fields.locationYaw),
      },
      size: {
        width: fields.width,
        height: fields.height,
      },
    } as IframeData);
  };

  /* RETURN VALUES */
  return { setDataFromFields };
};

export default useIframeHotspot;
