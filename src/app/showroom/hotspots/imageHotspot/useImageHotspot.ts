/* --- DEPENDENCIES --- */
import { useEffect } from 'react';
import { ImageData } from './imageHotspotData';
import { useShowroom } from '@showroom/ShowroomContext';
import { Type } from '@showroom/hotspots/baseHotspot/baseHotspotData';
import { FormFields } from '@organisms/OptionPanel/ImageHotspot/ImageHotspot';
/* -------------------- */

interface UseResponse {
  setDataFromFields: (fields: FormFields) => void;
}

const useImageHotspot = (onGetData): UseResponse => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { editableHotspot, updateHotspot } = useShowroom();

  // Get data from Showroom
  useEffect(() => {
    if (editableHotspot?.type !== Type.image) return;
    if (onGetData) onGetData(editableHotspot as ImageData);
  }, [editableHotspot, onGetData]);

  /*------------------*/
  /*  PUBLIC METHODS  */
  /*------------------*/
  // TODO: Here we should just pass all fields, avoid pass Type.image
  const setDataFromFields = (fields: FormFields): void => {
    console.log(fields);
    updateHotspot({
      id: fields.id,
      type: Type.image,
      name: fields.name,
      desc: fields.desc,
      image: fields.image,
      class: fields.class,
      cta: {
        text: fields.ctaText,
        link: fields.ctaLink,
        color: fields.ctaColor,
      },
      location: {
        pitch: parseFloat(fields.locationPitch),
        yaw: parseFloat(fields.locationYaw),
      },
    } as ImageData);
  };

  /* RETURN VALUES */
  return { setDataFromFields };
};

export default useImageHotspot;
