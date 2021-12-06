/* --- DEPENDENCIES --- */
import React, { ChangeEvent, FocusEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { floatToString, isNullOrUndefined } from '@utils/utils';
import useImageHotspot from '@showroom/hotspots/imageHotspot/useImageHotspot';
import {
  Button,
  Divider,
  DividerColor,
  DividerSpacing,
  Switch,
  SwitchSize,
  Textarea,
  TextareaSize,
  TextInput,
  TextInputSize,
  IconCatalog,
} from '@arleneio/editors-common-ui';
import { ImageData } from '@src/app/showroom/hotspots/imageHotspot/imageHotspotData';
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
  name: string;
  image: string;
  desc: string;
  ctaText: string;
  ctaLink: string;
  ctaColor: string;
  class: string;
  locationYaw: string;
  locationPitch: string;
}

interface FieldsState {
  ready: boolean;
  values: FormFields;
}

const ImageHotspot: React.FC<Props> = ({ className }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { setCurrentModal } = useModal();
  const { setMediaModal } = useMedia();

  const testId = 'ImageHotspot';
  const [fields, setFields] = useState<FieldsState>({
    ready: false,
    values: {
      id: '',
      name: '',
      desc: '',
      image: '',
      ctaText: '',
      ctaLink: '',
      ctaColor: '',
      class: '',
      locationPitch: '0',
      locationYaw: '0',
    },
  });

  const [showCtaSection, setShowCtaSection] = useState(false);

  const showHiddenSections = (data: ImageData): void => {
    setShowCtaSection(!isNullOrUndefined(data?.cta));
  };

  const setFieldsFromData = useCallback(
    (data: ImageData): void => {
      setFields({
        ready: false,
        values: {
          id: data?.id,
          name: data?.name,
          desc: data?.desc,
          image: data?.image,
          ctaText: data?.cta?.text,
          ctaLink: data?.cta?.link,
          ctaColor: data?.cta?.color,
          class: data?.class,
          locationPitch: floatToString(data?.location.pitch),
          locationYaw: floatToString(data?.location.yaw),
        },
      });
      showHiddenSections(data);
    },
    [setFields],
  );
  const changeFile = (value) => {
    setFields({ ...fields, ...fields.values, values: { ...fields.values, image: value } });
    setDataFromFields({ ...fields, ...fields.values, image: value });
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

  const { setDataFromFields } = useImageHotspot(setFieldsFromData);

  // Send values to Showroom
  useEffect(() => {
    if (fields.ready) setDataFromFields(fields.values);
  }, [fields]); // eslint-disable-line react-hooks/exhaustive-deps

  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const imageHotspotClass = cn(className);

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

  const handleCTASectionSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const { checked } = event.target;
    setShowCtaSection(checked);
  };

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div data-testid={testId} className={imageHotspotClass}>
      {/* NAME */}
      <div className="flex flex-col py-3 px-5">
        <label className="text-xs font-medium text-medium-slate mb-1">Name</label>
        <TextInput
          defaultValue={fields.values.name}
          name="name"
          size={TextInputSize['2xs']}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          block
        />
      </div>

      {/* IMAGE */}
      <div className="flex flex-col py-3 px-5">
        <label className="text-xs font-medium text-medium-slate mb-1">Image</label>
        <TextInput
          defaultValue={fields.values.image}
          name="image"
          size={TextInputSize['2xs']}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          block
          onClick={() => setMediaModal(true)}
          trailingIconWithClick={IconCatalog.paperclip}
        />
      </div>

      {/* DESC */}
      <div className="flex flex-col py-3 px-5">
        <label className="text-xs font-medium text-medium-slate mb-1">Description</label>
        <Textarea
          defaultValue={fields.values.desc}
          name="desc"
          size={TextareaSize['2xs']}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          block
        />
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

      {/* CTA */}
      <div className="flex items-center py-3 px-5">
        <label className="text-xs font-medium text-medium-slate">CTA Button</label>
        <Switch
          defaultValue={showCtaSection}
          className="ml-auto"
          size={SwitchSize.sm}
          onChange={handleCTASectionSwitchChange}
        />
      </div>

      {showCtaSection && (
        <div>
          {/* CTA :: LABEL */}
          <div className="flex flex-col py-3 px-5">
            <label className="text-xs font-medium text-medium-slate mb-1">Label</label>
            <TextInput
              defaultValue={fields.values.ctaText}
              name="ctaText"
              size={TextInputSize['2xs']}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              block
            />
          </div>

          {/* CTA :: URL */}
          <div className="flex flex-col py-3 px-5">
            <label className="text-xs font-medium text-medium-slate mb-1">URL</label>
            <TextInput
              defaultValue={fields.values.ctaLink}
              name="ctaLink"
              size={TextInputSize['2xs']}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              block
            />
          </div>
        </div>
      )}

      <Divider spacing={DividerSpacing['2xs']} color={DividerColor.extraDarkSnow} />

      <div className="flex flex-col py-3 px-5">
        <label className="text-xs font-medium text-medium-slate mb-1">Class</label>
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

export default ImageHotspot;
