/* --- DEPENDENCIES --- */
import React, { ChangeEvent, FocusEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { floatToString, isNullOrUndefined } from '@utils/utils';
import useProduct360Hotspot from '@showroom/hotspots/product360Hotspot/useProduct360Hotspot';
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
  // Icon,
  // IconStyle,
} from '@arleneio/editors-common-ui';
import { Product360Data } from '@src/app/showroom/hotspots/product360Hotspot/product360HotspotData';
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
  subname: string;
  desc: string;
  price: string;
  ctaText: string;
  ctaLink: string;
  ctaColor: string;
  class: string;
  locationYaw: string;
  locationPitch: string;
  filename360: string;
  folder360: string;
  amount360: string;
  magnifier360: string;
  loop360: boolean;
}

interface FieldsState {
  ready: boolean;
  values: FormFields;
}

const Product360Hotspot: React.FC<Props> = ({ className }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { setCurrentModal } = useModal();
  const { setMediaModal } = useMedia();

  const testId = 'Product360Hotspot';
  const [fields, setFields] = useState<FieldsState>({
    ready: false,
    values: {
      id: '',
      name: '',
      subname: '',
      desc: '',
      price: '',
      ctaText: '',
      ctaLink: '',
      ctaColor: '',
      class: '',
      locationPitch: '0',
      locationYaw: '0',
      filename360: '',
      folder360: '',
      amount360: '0',
      magnifier360: '0',
      loop360: true,
    },
  });

  const [showCtaSection, setShowCtaSection] = useState(false);

  const showHiddenSections = (data: Product360Data): void => {
    setShowCtaSection(!isNullOrUndefined(data?.cta));
  };

  const setFieldsFromData = useCallback(
    (data: Product360Data): void => {
      setFields({
        ready: false,
        values: {
          id: data?.id,
          name: data?.name,
          subname: data?.subname,
          desc: data?.desc,
          price: data?.price,
          ctaText: data?.cta?.text,
          ctaLink: data?.cta?.link,
          ctaColor: data?.cta?.color,
          class: data?.class,
          locationPitch: floatToString(data?.location.pitch),
          locationYaw: floatToString(data?.location.yaw),
          folder360: data[360].folder,
          filename360: data[360].filename,
          amount360: data[360].amount.toString(),
          magnifier360: data[360].magnifier.toString(),
          loop360: data[360].loop,
        },
      });

      showHiddenSections(data);
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

  const { setDataFromFields } = useProduct360Hotspot(setFieldsFromData);

  // Send values to Showroom
  useEffect(() => {
    if (fields.ready) setDataFromFields(fields.values);
  }, [fields]); // eslint-disable-line react-hooks/exhaustive-deps

  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const product360HotspotClass = cn(className);

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

  const changeFile = (value) => {
    setFields({ ...fields, ...fields.values, values: { ...fields.values, filename360: value } });
    setDataFromFields({ ...fields, ...fields.values, filename360: value });
  };
  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div data-testid={testId} className={product360HotspotClass}>
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

      {/* SUBNAME */}
      <div className="flex flex-col py-3 px-5">
        <label className="text-xs font-medium text-medium-slate mb-1">Subtitle</label>
        <TextInput
          defaultValue={fields.values.subname}
          name="subname"
          size={TextInputSize['2xs']}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          block
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

      {/* PRICE */}
      <div className="flex flex-col py-3 px-5">
        <label className="text-xs font-medium text-medium-slate mb-1">Price</label>
        <TextInput
          defaultValue={fields.values.price}
          name="price"
          size={TextInputSize['2xs']}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          block
        />
      </div>

      <Divider spacing={DividerSpacing['2xs']} color={DividerColor.extraDarkSnow} />

      {/* 360 VIEWER  */}
      <div className="flex items-center py-3 px-5">
        <label className="text-xs font-medium text-medium-slate">360 Viewer</label>
      </div>

      <div>
        {/* 360 :: FILENAME */}
        <div className="flex flex-col py-3 px-5">
          <label className="text-xs font-medium text-medium-slate mb-1">Image URL</label>
          <TextInput
            defaultValue={fields.values.filename360}
            name="filename360"
            size={TextInputSize['2xs']}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            block
            onClick={() => setMediaModal(true)}
            trailingIconWithClick={IconCatalog.paperclip}
          />
        </div>

        {/* 360 :: FOLDER */}
        <div className="flex flex-col py-3 px-5">
          <label className="text-xs font-medium text-medium-slate mb-1">Folder</label>
          <TextInput
            defaultValue={fields.values.folder360}
            name="folder360"
            size={TextInputSize['2xs']}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            block
          />
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

export default Product360Hotspot;
