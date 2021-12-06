/* --- DEPENDENCIES --- */
import React, { FocusEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { floatToString } from '@utils/utils';
import usePreviousHotspot from '@showroom/hotspots/previousHotspot/usePreviousHotspot';
import { Button, ColorPicker, CustomHTMLElement } from '@arleneio/editors-common-ui';
import { Divider, DividerColor, DividerSpacing, TextInput, TextInputSize } from '@arleneio/editors-common-ui';
import { PreviousData } from '@src/app/showroom/hotspots/previousHotspot/previousHotspotData';
import ModalManager from '../../Modals/ModalManager';
import { useModal, Modals } from '@src/app/common/contexts/ModalContext';
/* -------------------- */

type Props = {
  readonly className?: string;
};

export interface FormFields {
  readonly id: string;
  color: string;
  class: string;
  locationYaw: string;
  locationPitch: string;
}

interface FieldsState {
  ready: boolean;
  values: FormFields;
}

const PreviousHotspot: React.FC<Props> = ({ className }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { setCurrentModal } = useModal();

  const testId = 'PreviousHotspot';
  const [fields, setFields] = useState<FieldsState>({
    ready: false,
    values: {
      id: '',
      color: '#FFFFFF',
      class: '',
      locationPitch: '0',
      locationYaw: '0',
    },
  });

  const setFieldsFromData = useCallback(
    (data: PreviousData): void => {
      setFields({
        ready: false,
        values: {
          id: data?.id,
          color: data?.color,
          class: data?.class,
          locationPitch: floatToString(data?.location.pitch),
          locationYaw: floatToString(data?.location.yaw),
        },
      });
    },
    [setFields],
  );

  const openDeleteProjectModal = (): void => {
    setCurrentModal({
      name: Modals.DeleteHotspotModal,
      props: {
        id: fields.values.id,
        onClose: (): void => setCurrentModal(null),
      },
    });
  };

  const { setDataFromFields } = usePreviousHotspot(setFieldsFromData);

  // Send values to Showroom
  useEffect(() => {
    if (fields.ready) setDataFromFields(fields.values);
  }, [fields]); // eslint-disable-line react-hooks/exhaustive-deps

  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const previousHotspotClass = cn(className);

  /*--------------------*/
  /*       HANDLES      */
  /*--------------------*/
  // TEXT INPUT and TEXTAREA
  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    event.persist();
    const { value, name } = event.target;
    setFields((fields) => ({ ready: true, values: { ...fields.values, [name]: value } }));
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    event.persist();
    if (event.key !== 'Enter') return;

    const { value, name } = event.target as HTMLInputElement | HTMLTextAreaElement;
    setFields((fields) => ({ ready: true, values: { ...fields.values, [name]: value } }));
  };

  const handleColorChange = ({ name, value }: CustomHTMLElement) => {
    if (name) setFields((fields) => ({ ready: true, values: { ...fields.values, [name]: value } }));
  };

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div data-testid={testId} className={previousHotspotClass}>
      {/* COLOR */}
      <div className="flex items-center py-3 px-5 relative">
        <label className="text-xs font-medium text-medium-slate">Color</label>
        <ColorPicker defaultValue={fields.values.color} name="color" className="ml-auto" onChange={handleColorChange} />
      </div>

      <Divider spacing={DividerSpacing['2xs']} color={DividerColor.extraDarkSnow} />

      {/* LOCATION */}
      <div className="flex items-center py-3 px-5">
        <label className="text-xs font-medium text-medium-slate">Location</label>
      </div>

      <div className="flex flex-col py-3 px-5">
        <div className="flex space-x-8">
          {/* LOCATION :: YAW (X) */}
          <div className="flex items-center space-x-3">
            <div className="text-base">X</div>
            <TextInput
              defaultValue={fields.values.locationYaw}
              name="locationYaw"
              size={TextInputSize['2xs']}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              block
            />
          </div>

          {/* LOCATION :: PITCH (Y) */}
          <div className="flex items-center space-x-3">
            <div className="text-base">Y</div>
            <TextInput
              defaultValue={fields.values.locationPitch}
              name="locationPitch"
              size={TextInputSize['2xs']}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              block
            />
          </div>
        </div>
      </div>

      <Divider spacing={DividerSpacing['2xs']} color={DividerColor.extraDarkSnow} />
      <div className="flex flex-col py-3 px-5">
        <label className="text-xs font-medium text-medium-slate mb-1">Css Class</label>
        <TextInput
          defaultValue={fields.values.class}
          name="class"
          size={TextInputSize['2xs']}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          block
        />
      </div>
      <Divider spacing={DividerSpacing['2xs']} color={DividerColor.extraDarkSnow} />
      <Button className="ml-4" onClick={openDeleteProjectModal}>
        <span>Delete Hotspot</span>
      </Button>

      <ModalManager />
    </div>
  );
};

export default PreviousHotspot;
