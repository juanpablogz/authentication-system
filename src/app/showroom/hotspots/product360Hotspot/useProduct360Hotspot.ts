/* --- DEPENDENCIES --- */
import { useEffect } from 'react';
import { Product360Data } from './product360HotspotData';
import { useShowroom } from '@showroom/ShowroomContext';
import { Type } from '@showroom/hotspots/baseHotspot/baseHotspotData';
import { FormFields } from '@organisms/OptionPanel/Product360Hotspot/Product360Hotspot';
/* -------------------- */

interface UseResponse {
  setDataFromFields: (fields: FormFields) => void;
}

const useProduct360Hotspot = (onGetData): UseResponse => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { editableHotspot, updateHotspot } = useShowroom();

  // Get data from Showroom
  useEffect(() => {
    if (editableHotspot?.type !== Type.product360) return;
    console.log('editableHotspot: ', editableHotspot);
    if (onGetData) onGetData(editableHotspot as Product360Data);
  }, [editableHotspot, onGetData]);

  /*------------------*/
  /*  PUBLIC METHODS  */
  /*------------------*/
  // TODO: Here we should just pass all fields, avoid pass Type.product360
  const setDataFromFields = (fields: FormFields): void => {
    updateHotspot({
      id: fields.id,
      type: Type.product360,
      name: fields.name,
      subname: fields.subname,
      desc: fields.desc,
      price: fields.price,
      cta: {
        text: fields.ctaText,
        link: fields.ctaLink,
        color: fields.ctaColor,
      },
      class: fields.class,
      location: {
        pitch: parseFloat(fields.locationPitch),
        yaw: parseFloat(fields.locationYaw),
      },
      '360': {
        filename: fields.filename360,
        folder: fields.folder360,
        amount: parseFloat(fields.amount360),
        magnifier: parseFloat(fields.magnifier360),
        loop: fields.loop360,
      },
    } as Product360Data);
  };

  /* RETURN VALUES */
  return { setDataFromFields };
};

export default useProduct360Hotspot;

/**
 * reference:
 * https://thoughtbot.com/blog/type-safe-state-modeling-with-typescript-and-react-hooks
 */
