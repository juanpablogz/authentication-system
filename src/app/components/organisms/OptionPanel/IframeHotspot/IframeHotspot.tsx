/* --- DEPENDENCIES --- */
import React, { FocusEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { floatToString } from '@utils/utils';
import useIframeHotspot from '@showroom/hotspots/iframeHotspot/useIframeHotspot';
// import { ColorPicker, CustomHTMLElement } from '@arleneio/editors-common-ui';
import { Divider, DividerColor, DividerSpacing, TextInput, TextInputSize, Button } from '@arleneio/editors-common-ui';
import { IframeData } from '@src/app/showroom/hotspots/iframeHotspot/iframeHotspotData';
import ModalManager from '../../Modals/ModalManager';
import { useModal, Modals } from '@src/app/common/contexts/ModalContext';
/* -------------------- */

type Props = {
  readonly className?: string;
};

export interface FormFields {
  readonly id: string;
  class: string;
  goback: string;
  url: string;
  locationYaw: string;
  locationPitch: string;
  width: string;
  height: string;
}

interface FieldsState {
  ready: boolean;
  values: FormFields;
}

const IframeHotspot: React.FC<Props> = ({ className }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { setCurrentModal } = useModal();

  const testId = 'IframeHotspot';
  const [fields, setFields] = useState<FieldsState>({
    ready: false,
    values: {
      id: '',
      class: '',
      goback: '',
      url: '',
      locationPitch: '0',
      locationYaw: '0',
      width: '',
      height: '',
    },
  });

  const setFieldsFromData = useCallback(
    (data: IframeData): void => {
      setFields({
        ready: false,
        values: {
          id: data?.id,
          class: data?.class,
          goback: data?.goback,
          url: data?.url,
          locationPitch: floatToString(data?.location.pitch),
          locationYaw: floatToString(data?.location.yaw),
          width: data?.size.width,
          height: data?.size.height,
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

  const { setDataFromFields } = useIframeHotspot(setFieldsFromData);
  // Send values to Showroom
  useEffect(() => {
    if (fields.ready) setDataFromFields(fields.values);
  }, [fields]); // eslint-disable-line react-hooks/exhaustive-deps

  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const nextHotspotClass = cn(className);

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

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div data-testid={testId} className={nextHotspotClass}>
      {/* TARGET SCENE ID */}
      <Divider spacing={DividerSpacing['2xs']} color={DividerColor.extraDarkSnow} />

      {/* COLOR */}

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

      {/* WIDTH */}
      <div className="flex items-center py-3 px-5">
        <div className="items-center flex flex-1 overflow-hidden">
          <label className="text-xs font-medium text-medium-slate">Width</label>
        </div>
        <div className="flex flex-1 justify-end items-center">
          <div style={{ width: '60px' }}>
            <TextInput
              defaultValue={fields.values.width}
              name="width"
              size={TextInputSize['2xs']}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              block
            />
          </div>
        </div>
      </div>
      {/* HEIGHT */}
      <div className="flex items-center py-3 px-5">
        <div className="items-center flex flex-1 overflow-hidden">
          <label className="text-xs font-medium text-medium-slate">Height</label>
        </div>
        <div className="flex flex-1 justify-end items-center">
          <div style={{ width: '60px' }}>
            <TextInput
              defaultValue={fields.values.height}
              name="height"
              size={TextInputSize['2xs']}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              block
            />
          </div>
        </div>
      </div>
      {/* GO BACK TITLE */}
      <Divider spacing={DividerSpacing['2xs']} color={DividerColor.extraDarkSnow} />
      <div className="flex flex-col py-3 px-5">
        <label className="text-xs font-medium text-medium-slate mb-1">Go back title</label>
        <TextInput
          defaultValue={fields.values.goback}
          name="goback"
          size={TextInputSize['2xs']}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          block
        />
      </div>
      {/* URL */}
      <div className="flex flex-col py-3 px-5">
        <label className="text-xs font-medium text-medium-slate mb-1">Url</label>
        <TextInput
          defaultValue={fields.values.url}
          name="url"
          size={TextInputSize['2xs']}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          block
        />
      </div>
      <Divider spacing={DividerSpacing['2xs']} color={DividerColor.extraDarkSnow} />
      {/* CLASS */}
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

export default IframeHotspot;
