/* --- DEPENDENCIES --- */
import React, { ChangeEvent, FocusEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { floatToString } from '@utils/utils';
import useVideoHotspot from '@showroom/hotspots/videoHotspot/useVideoHotspot';
import {
  Button,
  Divider,
  DividerColor,
  DividerSpacing,
  Switch,
  SwitchSize,
  TextInput,
  TextInputSize,
  IconCatalog,
} from '@arleneio/editors-common-ui';
import { VideoData } from '@src/app/showroom/hotspots/videoHotspot/videoHotspotData';
import ModalManager from '../../Modals/ModalManager';
import { useModal, Modals } from '@src/app/common/contexts/ModalContext';
import { useMedia } from '@contexts/MediaContext';
import MediaLibraryWrapper from '../../MediaLibrary/MediaLibraryWrapper';
/* -------------------- */

type Props = {
  readonly className?: string;
};

export interface FormFields {
  readonly id: string;
  url: string;
  autoplay: boolean;
  chroma: boolean;
  width: string;
  aspect: string;
  class: string;
  locationYaw: string;
  locationPitch: string;
  transform: string;
}

interface FieldsState {
  ready: boolean;
  values: FormFields;
}

const VideoHotspot: React.FC<Props> = ({ className }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { setCurrentModal } = useModal();
  const { setMediaModal } = useMedia();

  const testId = 'VideoHotspot';
  const [fields, setFields] = useState<FieldsState>({
    ready: false,
    values: {
      id: '',
      url: '',
      autoplay: false,
      chroma: false,
      width: '512',
      aspect: '16:9',
      class: '',
      locationYaw: '0',
      locationPitch: '0',
      transform: '',
    },
  });

  const setFieldsFromData = useCallback(
    (data: VideoData): void => {
      setFields({
        ready: false,
        values: {
          id: data?.id,
          url: data?.url,
          autoplay: data?.autoplay,
          chroma: data?.chroma,
          width: data?.width.toString(),
          aspect: data?.aspect,
          class: data?.class,
          locationPitch: floatToString(data?.location.pitch),
          locationYaw: floatToString(data?.location.yaw),
          transform: data?.perspective?.extraTransforms,
        },
      });
    },
    [setFields],
  );

  const changeFile = (value) => {
    setFields({ ...fields, ...fields.values, values: { ...fields.values, url: value } });
    setDataFromFields({ ...fields, ...fields.values, url: value });
  };

  const openDeleteProjectModal = (): void => {
    setCurrentModal({
      name: Modals.DeleteHotspotModal,
      props: {
        id: fields.values.id,
        onClose: (): void => setCurrentModal(null),
      },
    });
  };

  const { setDataFromFields } = useVideoHotspot(setFieldsFromData);

  // Send values to Showroom
  useEffect(() => {
    if (fields.ready) setDataFromFields(fields.values);
  }, [fields]); // eslint-disable-line react-hooks/exhaustive-deps

  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const videoHotspotClass = cn(className);

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

  // SWITCH
  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    const { checked, name } = event.target;
    setFields((fields) => ({ ready: true, values: { ...fields.values, [name]: checked } }));
  };

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div data-testid={testId} className={videoHotspotClass}>
      {/* VIDEO */}
      <div className="flex flex-col py-3 px-5">
        <label className="text-xs font-medium text-medium-slate mb-1">Video</label>
        <TextInput
          defaultValue={fields.values.url}
          name="url"
          size={TextInputSize['2xs']}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          block
          onClick={() => setMediaModal(true)}
          trailingIconWithClick={IconCatalog.paperclip}
        />
      </div>

      {/* AUTOPLAY */}
      <div className="flex items-center py-3 px-5">
        <label className="text-xs font-medium text-medium-slate">Autoplay</label>
        <Switch
          defaultValue={fields.values.autoplay}
          name="autoplay"
          className="ml-auto"
          size={SwitchSize.sm}
          onChange={handleSwitchChange}
        />
      </div>

      {/* CHROMA */}
      <div className="flex items-center py-3 px-5">
        <label className="text-xs font-medium text-medium-slate">Chroma</label>
        <Switch
          defaultValue={fields.values.chroma}
          name="chroma"
          className="ml-auto"
          size={SwitchSize.sm}
          onChange={handleSwitchChange}
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

      {/* ASPECT */}
      <div className="flex items-center py-3 px-5">
        <div className="items-center flex flex-1 overflow-hidden">
          <label className="text-xs font-medium text-medium-slate">Aspect</label>
        </div>
        <div className="flex flex-1 justify-end items-center">
          <div style={{ width: '50px' }}>
            <TextInput
              defaultValue={fields.values.aspect}
              name="aspect"
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
        <label className="text-xs font-medium text-medium-slate mb-1">Transform</label>
        <TextInput
          defaultValue={fields.values.transform}
          name="transform"
          size={TextInputSize['2xs']}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          block
        />
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
      <MediaLibraryWrapper changeFile={changeFile} />
    </div>
  );
};

export default VideoHotspot;
