/* --- DEPENDENCIES --- */
import React, { ChangeEvent, useState } from 'react';
import cn from 'classnames';
import {
  ProjectFormFields,
  validateBasicFields,
  ValidationError,
} from '@src/app/common/validators/projectFormValidator';
import { isEmpty } from '@utils/utils';
import { ProjectData } from '@showroom/projects/projectData';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonUse,
  ColorPicker,
  IconCatalog,
  Tabs,
  Tab,
  TabPanel,
  TextInput,
  TextInputSize,
  Switch,
  SwitchSize,
  useForm,
} from '@arleneio/editors-common-ui';
import { useMedia } from '@src/app/common/contexts/MediaContext';
import MediaLibraryWrapper from '../../MediaLibrary/MediaLibraryWrapper';
/* -------------------- */

type Props = {
  readonly project: ProjectData;
  readonly onSave: (values: ProjectFormFields) => void;
  readonly className?: string;
};

const ProjectForm: React.FC<Props> = ({ project, className, onSave }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const formFields: ProjectFormFields = {
    shareTitle: project?.shareTitle || '',
    shareDesc: project?.shareDesc || '',
    audio: project?.audio || '',
    exitLink: project?.exit?.link || '',
    exitAsk: project?.exit?.ask || '',
    exitYesText: project?.exit?.yes?.text || '',
    exitYesBgColor: project?.exit?.yes?.['bg-color'] || '#000000',
    exitNo: project?.exit?.no || '',
    iconsTouchpoint: project?.icons?.touchpoint || '',
    iconsClose: project?.icons?.close || '',
    iconsMap: project?.icons?.map || '',
    iconsAudioOn: project?.icons?.['audio-on'] || '',
    iconsAudioOff: project?.icons?.['audio-off'] || '',
    iconsShare: project?.icons?.['audio-share'] || '',
    iconsShareIos: project?.icons?.['audio-share-ios'] || '',
  };
  const [showExitSection, setShowExitSection] = useState(!isEmpty(project?.exit));
  const [positionInput, setPositionInput] = useState('');
  const { setMediaModal } = useMedia();
  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const projectFormClass = cn(className);

  /*------------------*/
  /*    FORM LOGIC    */
  /*------------------*/
  const onSubmit = (values, errors): void => {
    if (!isEmpty(errors)) return;
    onSave(values);
  };

  const { values, handleChange, handleSubmit } = useForm<ProjectFormFields, ValidationError>(
    formFields,
    onSubmit,
    validateBasicFields,
  );

  const handleExitSectionSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const { checked } = event.target;
    setShowExitSection(checked);
  };

  /*--------------------*/
  /*       HANDLES      */
  /*--------------------*/
  const handleInput = (input) => {
    console.log(input);
    console.log(values[input]);
    setMediaModal(true);
    setPositionInput(input);
  };
  const changeFile = (value) => {
    values[positionInput] = value;
  };
  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <form className={projectFormClass} onSubmit={handleSubmit} noValidate>
      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extra-bold mb-2">Project settings</h1>
      </div>

      <div className="bg-white border-2 border-dark-snow rounded-lg p-8 pt-2 mb-12">
        <Tabs defaultSelected="basic" className="h-full relative">
          <div className="flex w-full border-b border-dark-snow mb-10">
            <Tab tabId="basic">Basic Info</Tab>
            <Tab tabId="audio">Audio</Tab>
            <Tab tabId="exit">Exit</Tab>
            <Tab tabId="icons">Icons</Tab>
          </div>
          <TabPanel className="h-full" tabId="basic">
            <div className="text-xl font-medium mb-6">Basic information</div>
            {/* PROJECT NAME */}
            <div className="flex flex-col mb-6">
              <label className="text-base font-medium text-medium-slate mb-2">Project name</label>
              <TextInput
                defaultValue={values.shareTitle}
                name="shareTitle"
                size={TextInputSize.sm}
                onChange={handleChange}
                placeholder="My Project"
                block
              />
            </div>

            {/* PROJECT DESC */}
            <div className="flex flex-col mb-6">
              <label className="text-base font-medium text-medium-slate mb-2">Project description</label>
              <TextInput
                defaultValue={values.shareDesc}
                name="shareDesc"
                size={TextInputSize.sm}
                onChange={handleChange}
                placeholder="A brief explanation about the project"
                block
              />
            </div>
          </TabPanel>
          <TabPanel className="h-full" tabId="audio">
            <div className="text-xl font-medium mb-6">Intro audio</div>
            {/* AUDIO URL */}
            <div className="flex flex-col mb-6">
              <label className="text-base font-medium text-medium-slate mb-2">Audio url</label>
              <TextInput
                defaultValue={values.audio}
                name="audio"
                size={TextInputSize.sm}
                onChange={handleChange}
                placeholder="https://*.mp3"
                block
                onClick={() => handleInput('audio')}
                trailingIconWithClick={IconCatalog.paperclip}
              />
            </div>
          </TabPanel>
          <TabPanel className="h-full" tabId="exit">
            <div className="flex items-center mb-6">
              <div className="text-xl font-medium">Exit configuration</div>
              <Switch
                defaultValue={showExitSection}
                className="ml-auto"
                size={SwitchSize.md}
                onChange={handleExitSectionSwitchChange}
              />
            </div>

            {showExitSection && (
              <>
                {/* EXIT ASK TEXT */}
                <div className="flex flex-col mb-6">
                  <label className="text-base font-medium text-medium-slate mb-2">Ask text</label>
                  <TextInput
                    defaultValue={values.exitAsk}
                    name="exitAsk"
                    size={TextInputSize.sm}
                    onChange={handleChange}
                    placeholder="Are you sure you want to leave the Scene?"
                    block
                  />
                </div>

                <div className="grid grid-cols-2 gap-8 mb-6 relative">
                  {/* EXIT YES TEXT */}
                  <div className="flex flex-col w-full">
                    <label className="text-base font-medium text-medium-slate mb-2">Confirmation label</label>
                    <TextInput
                      defaultValue={values.exitYesText}
                      name="exitYesText"
                      size={TextInputSize.sm}
                      onChange={handleChange}
                      placeholder="Yes"
                      block
                    />
                  </div>

                  {/* EXIT YES BG COLOR */}
                  <div className="flex flex-col w-full">
                    <label className="text-base font-medium text-medium-slate mb-2">Background color</label>
                    <div className="flex items-center relative w-full">
                      <TextInput
                        defaultValue={values.exitYesBgColor}
                        name="exitYesBgColor"
                        size={TextInputSize.sm}
                        onChange={handleChange}
                        placeholder="#000000"
                        leadingIcon={IconCatalog.none}
                        block
                      />
                      <span className="absolute top-0 left-0 p-3 pr-4">
                        <ColorPicker
                          defaultValue={values.exitYesBgColor}
                          name="exitYesBgColor"
                          onChange={handleChange}
                        />
                      </span>
                    </div>
                  </div>
                </div>

                {/* EXIT NO TEXT */}
                <div className="flex flex-col mb-6">
                  <label className="text-base font-medium text-medium-slate mb-2">Cancelation label</label>
                  <TextInput
                    defaultValue={values.exitNo}
                    name="exitNo"
                    size={TextInputSize.sm}
                    onChange={handleChange}
                    placeholder="No, I'll stay"
                    block
                  />
                </div>

                {/* EXIT LINK */}
                <div className="flex flex-col mb-6">
                  <label className="text-base font-medium text-medium-slate mb-2">Link URL</label>
                  <TextInput
                    defaultValue={values.exitLink}
                    name="exitLink"
                    size={TextInputSize.sm}
                    onChange={handleChange}
                    placeholder="https://arlene.io/"
                    block
                  />
                </div>
              </>
            )}
          </TabPanel>
          <TabPanel className="h-full" tabId="icons">
            <div className="text-xl font-medium mb-6">Global Icons</div>
            {/* TOUCHPOINT ICON */}
            <div className="flex flex-col mb-6">
              <label className="text-base font-medium text-medium-slate mb-2">Touchpoint icon</label>
              <TextInput
                defaultValue={values.iconsTouchpoint}
                name="iconsTouchpoint"
                size={TextInputSize.sm}
                onChange={handleChange}
                placeholder="icons/touch-point.svg"
                block
                onClick={() => handleInput('iconsTouchpoint')}
                trailingIconWithClick={IconCatalog.paperclip}
              />
            </div>

            {/* CLOSE ICON */}
            <div className="flex flex-col mb-6">
              <label className="text-base font-medium text-medium-slate mb-2">Close icon</label>
              <TextInput
                defaultValue={values.iconsClose}
                name="iconsClose"
                size={TextInputSize.sm}
                onChange={handleChange}
                placeholder="icons/close.svg"
                block
                onClick={() => handleInput('iconsClose')}
                trailingIconWithClick={IconCatalog.paperclip}
              />
            </div>

            {/* MAP ICON */}
            <div className="flex flex-col mb-6">
              <label className="text-base font-medium text-medium-slate mb-2">Map icon</label>
              <TextInput
                defaultValue={values.iconsMap}
                name="iconsMap"
                size={TextInputSize.sm}
                onChange={handleChange}
                placeholder="icons/map.svg"
                block
                onClick={() => handleInput('iconsMap')}
                trailingIconWithClick={IconCatalog.paperclip}
              />
            </div>

            {/* AUDIO ON ICON */}
            <div className="flex flex-col mb-6">
              <label className="text-base font-medium text-medium-slate mb-2">Audio ON icon</label>
              <TextInput
                defaultValue={values.iconsAudioOn}
                name="iconsAudioOn"
                size={TextInputSize.sm}
                onChange={handleChange}
                placeholder="icons/sound.svg"
                block
                onClick={() => handleInput('iconsAudioOn')}
                trailingIconWithClick={IconCatalog.paperclip}
              />
            </div>

            {/* AUDIO OFF ICON */}
            <div className="flex flex-col mb-6">
              <label className="text-base font-medium text-medium-slate mb-2">Audio OFF icon</label>
              <TextInput
                defaultValue={values.iconsAudioOff}
                name="iconsAudioOff"
                size={TextInputSize.sm}
                onChange={handleChange}
                placeholder="icons/sound-mute.svg"
                block
                onClick={() => handleInput('iconsAudioOff')}
                trailingIconWithClick={IconCatalog.paperclip}
              />
            </div>

            {/* SHARE ICON */}
            <div className="flex flex-col mb-6">
              <label className="text-base font-medium text-medium-slate mb-2">Share icon</label>
              <TextInput
                defaultValue={values.iconsShare}
                name="iconsShare"
                size={TextInputSize.sm}
                onChange={handleChange}
                placeholder="icons/share.svg"
                block
                onClick={() => handleInput('iconsShare')}
                trailingIconWithClick={IconCatalog.paperclip}
              />
            </div>

            {/* SHARE IOS ICON */}
            <div className="flex flex-col mb-6">
              <label className="text-base font-medium text-medium-slate mb-2">Share IOS icon</label>
              <TextInput
                defaultValue={values.iconsShareIos}
                name="iconsShareIos"
                size={TextInputSize.sm}
                onChange={handleChange}
                placeholder="icons/share-ios.svg"
                block
                onClick={() => handleInput('iconsShareIos')}
                trailingIconWithClick={IconCatalog.paperclip}
              />
            </div>
          </TabPanel>
        </Tabs>
      </div>

      {/* FOOTER */}
      <div className="flex items-center w-full">
        <Button className="ml-auto" use={ButtonUse.primary} size={ButtonSize.sm} type={ButtonType.submit}>
          Save changes
        </Button>
      </div>
      <MediaLibraryWrapper changeFile={changeFile} />
    </form>
  );
};

export default ProjectForm;
