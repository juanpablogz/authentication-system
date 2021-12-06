/* --- DEPENDENCIES --- */
import { useEffect } from 'react';
import { VideoData } from './videoHotspotData';
import { useShowroom } from '@showroom/ShowroomContext';
import { Type } from '@showroom/hotspots/baseHotspot/baseHotspotData';
import { FormFields } from '@organisms/OptionPanel/VideoHotspot/VideoHotspot';
/* -------------------- */

interface UseResponse {
  setDataFromFields: (fields: FormFields) => void;
}

const useVideoHotspot = (onGetData): UseResponse => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { editableHotspot, updateHotspot } = useShowroom();

  // Get data from Showroom
  useEffect(() => {
    if (editableHotspot?.type !== Type.video) return;
    if (onGetData) onGetData(editableHotspot as VideoData);
  }, [editableHotspot, onGetData]);

  /*------------------*/
  /*  PUBLIC METHODS  */
  /*------------------*/
  // TODO: Here we should just pass all fields, avoid pass Type.video
  const setDataFromFields = (fields: FormFields): void => {
    updateHotspot({
      id: fields.id,
      type: Type.video,
      url: fields.url,
      autoplay: fields.autoplay,
      chroma: fields.chroma,
      width: parseInt(fields.width),
      aspect: fields.aspect,
      class: fields.class,
      perspective: {
        radius: 1024,
        extraTransforms: fields.transform,
      },
      location: {
        pitch: parseFloat(fields.locationPitch),
        yaw: parseFloat(fields.locationYaw),
      },
    } as VideoData);
  };

  /* RETURN VALUES */
  return { setDataFromFields };
};

export default useVideoHotspot;
