/* --- DEPENDENCIES --- */
import React, { FocusEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { floatToString } from '@utils/utils';
import useLinkHotspot from '@showroom/hotspots/linkHotspot/useLinkHotspot';
import { Button, Divider, DividerColor, DividerSpacing, TextInput, TextInputSize } from '@arleneio/editors-common-ui';
import { LinkData } from '@src/app/showroom/hotspots/linkHotspot/linkHotspotData';
import ModalManager from '../../Modals/ModalManager';
import { useModal, Modals } from '@src/app/common/contexts/ModalContext';

/* -------------------- */

type Props = {
  readonly className?: string;
};

export interface FormFields {
  readonly id: string;
  link: string;
  icon: string;
  sizeWidth: string;
  sizeHeight: string;
  locationYaw: string;
  locationPitch: string;
  class: string;
}

interface FieldsState {
  ready: boolean;
  values: FormFields;
}

const LinkHotspot: React.FC<Props> = ({ className }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { setCurrentModal } = useModal();

  const testId = 'LinkHotspot';
  const [fields, setFields] = useState<FieldsState>({
    ready: false,
    values: {
      id: '',
      link: '',
      icon: '',
      sizeWidth: '',
      sizeHeight: '',
      locationPitch: '0',
      locationYaw: '0',
      class: '',
    },
  });

  const setFieldsFromData = useCallback(
    (data: LinkData): void => {
      setFields({
        ready: false,
        values: {
          id: data?.id,
          link: data?.link,
          icon: data?.icon,
          sizeWidth: data?.size.width,
          sizeHeight: data?.size.height,
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

  const { setDataFromFields } = useLinkHotspot(setFieldsFromData);

  // Send values to Showroom
  useEffect(() => {
    if (fields.ready) setDataFromFields(fields.values);
  }, [fields]); // eslint-disable-line react-hooks/exhaustive-deps

  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const linkHotspotClass = cn(className);

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
    <div data-testid={testId} className={linkHotspotClass}>
      {/* LINK URL */}
      <div className="flex flex-col py-3 px-5">
        <label className="text-xs font-medium text-medium-slate mb-1">Link URL</label>
        <TextInput
          defaultValue={fields.values.link}
          name="link"
          size={TextInputSize['2xs']}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          block
        />
      </div>

      {/* ICON */}
      <div className="flex flex-col py-3 px-5">
        <label className="text-xs font-medium text-medium-slate mb-1">Icon</label>
        <TextInput
          defaultValue={fields.values.icon}
          name="icon"
          size={TextInputSize['2xs']}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          block
        />
      </div>

      {/* WIDTH */}
      <div className="flex items-center py-3 px-5">
        <div className="items-center flex flex-1 overflow-hidden">
          <label className="text-xs font-medium text-medium-slate">Width</label>
        </div>
        <div className="flex flex-1 justify-end items-center">
          <div style={{ width: '60px' }}>
            <TextInput
              defaultValue={fields.values.sizeWidth}
              name="sizeWidth"
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
              defaultValue={fields.values.sizeHeight}
              name="sizeHeight"
              size={TextInputSize['2xs']}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              block
            />
          </div>
        </div>
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

export default LinkHotspot;
