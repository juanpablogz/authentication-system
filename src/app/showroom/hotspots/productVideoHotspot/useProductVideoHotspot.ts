/* --- DEPENDENCIES --- */
import { useEffect } from 'react';
import { ProductVideoData } from './productVideoHotspotData';
import { useShowroom } from '@showroom/ShowroomContext';
import { Type } from '@showroom/hotspots/baseHotspot/baseHotspotData';
import { FormFields } from '@organisms/OptionPanel/ProductVideoHotspot/ProductVideoHotspot';
/* -------------------- */

interface UseResponse {
  setDataFromFields: (fields: FormFields) => void;
}

const useProductVideoHotspot = (onGetData): UseResponse => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { editableHotspot, updateHotspot } = useShowroom();

  // Get data from Showroom
  useEffect(() => {
    if (editableHotspot?.type !== Type.productVideo) return;
    if (onGetData) onGetData(editableHotspot as ProductVideoData);
  }, [editableHotspot, onGetData]);

  /*------------------*/
  /*  PUBLIC METHODS  */
  /*------------------*/
  // TODO: Here we should just pass all fields, avoid pass Type.video
  const setDataFromFields = (fields: FormFields): void => {
    updateHotspot({
      id: fields.id,
      type: Type.productVideo,
      video: fields.video,
      loop: fields.loop,
      class: fields.class,
      icon: fields.icon,
      name: fields.name,
      desc: fields.desc,
      cta: {
        link: fields.ctaLink,
        text: fields.ctaText,
      },
      location: {
        pitch: parseFloat(fields.locationPitch),
        yaw: parseFloat(fields.locationYaw),
      },
    } as ProductVideoData);
  };

  /* RETURN VALUES */
  return { setDataFromFields };
};

export default useProductVideoHotspot;
