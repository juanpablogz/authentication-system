/* --- DEPENDENCIES --- */
import React, { useState } from 'react';
import cn from 'classnames';
import axios from 'axios';
import apiConfig from '@config/config';
import { db } from '@config/firebase/firebaseConfig';
import {
  TileOption,
  SceneFormFields,
  validateBasicFields,
  ValidationError,
} from '@src/app/common/validators/sceneFormValidator';
import { SceneData } from '@showroom/scenes/sceneData';
import {
  isEmpty,
  Button,
  ButtonSize,
  ButtonType,
  ButtonUse,
  Icon,
  IconCatalog,
  IconStyle,
  TextInput,
  TextInputSize,
  useForm,
} from '@arleneio/editors-common-ui';
import { useMedia } from '@src/app/common/contexts/MediaContext';
import MediaLibraryWrapper from '../../MediaLibrary/MediaLibraryWrapper';
import { useAuth } from '@src/app/common/contexts/AuthContext';
import { useShowroom } from '@src/app/showroom/ShowroomContext';
import UploadTilesForm from '../UpdateTilesForm/UpdateTilesForm';
import UpdateTilesLoader from '@src/app/components/atoms/Loaders/UpdateTilesLoader/UpdateTilesLoader';
/* -------------------- */

enum TileLabel {
  image = 'Image',
  tiles = 'Tiles',
  video = 'Video',
}

type Props = {
  readonly scene: SceneData;
  readonly onSave: (values: SceneFormFields) => void;
  readonly className?: string;
  readonly onClose: () => void;
};

const SceneForm: React.FC<Props> = ({ scene, className, onSave, onClose }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const tilesOptions = [
    {
      type: TileOption.image,
      icon: 'image',
    },
    {
      type: TileOption.tiles,
      icon: 'product360',
    },
    {
      type: TileOption.video,
      icon: 'video',
    },
  ];

  const getUrl = (scene: SceneData) => {
    if (!scene) return '';

    if (scene.bg) return scene.bg;
    if (scene.tiles) return scene.tiles;
    if (scene.video) return scene.video;
    return '';
  };

  const getType = (scene: SceneData) => {
    if (!scene) return TileOption.image;

    if (scene.bg) return TileOption.image;
    if (scene.tiles) return TileOption.tiles;
    if (scene.video) return TileOption.video;
    return TileOption.image;
  };

  const formFields: SceneFormFields = {
    id: scene?.id || '',
    name: scene?.name || '',
    url: getUrl(scene),
    type: getType(scene),
  };

  interface RequestError {
    statusCode: number;
    error: string;
    message: string;
  }
  const [selectedTile, setSelectedTile] = useState(formFields.type);
  const [showForm, setShowForm] = useState(true);
  const { setMediaModal } = useMedia();
  const { getToken, authState } = useAuth();
  const pathname = window.location.href.split('/');
  const pid = pathname[pathname.length - 1];
  const { setIsMounted } = useShowroom();
  const [error, setError] = useState<Array<RequestError>>([]);

  const closeModal = (): void => onClose();
  const hideLoader = (): void => {
    setShowForm(true);
    setError([]);
  };
  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const sceneFormClass = cn(className);

  const tileClass = (type: TileOption): string => {
    return cn('flex flex-col items-center justify-center border rounded-md p-6 mr-4', {
      'bg-white border-default-smoke cursor-pointer': selectedTile !== type,
      'bg-light-primary border-default-primary text-default-primary': selectedTile === type,
    });
  };

  /*------------------*/
  /*    FORM LOGIC    */
  /*------------------*/
  const onSubmit = (values, errors): void => {
    console.log('values from sceneForm', values);
    if (!isEmpty(errors)) return;
    onSave({ ...values, type: selectedTile });
  };

  const { values, errors, handleChange, handleSubmit } = useForm<SceneFormFields, ValidationError>(
    formFields,
    onSubmit,
    validateBasicFields,
  );

  /*--------------------*/
  /*       HANDLES      */
  /*--------------------*/
  const changeFile = (value) => {
    values.url = value;
  };
  // TILES
  const handleTileChange = (option: TileOption) => (): void => {
    values.type = option;
    console.log('Tile values:', values);
    setSelectedTile(option);
  };
  const updateTiles = async (formData) => {
    setShowForm(false);
    const token = await getToken();
    const updateTilesURL = apiConfig.api.uri360 + `/projects/360/${pid}/tiles`;
    const config = { headers: { Authorization: token } };
    axios
      .post(updateTilesURL, formData, config)
      .then(() => {
        const userProject = db.ref(`projects/${authState.currentUser?.uid}/360/${pid}`);
        setIsMounted(false);

        userProject.on('value', (snapshot: any): void => {
          const projectData = snapshot.val();
          if (projectData && projectData?.data.infrastructure === 'ready') {
            userProject.off('value');
            setTimeout(function () {
              setIsMounted(true);
              closeModal();
              (window as any).ARLENE_360.initArleneJSTAG();
            }, 25000);
          }
        });
      })
      .catch((err) => {
        console.log('err, ', err);
        setError([err.response.data]);
        console.log(error);
      });
  };

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  console.log('values', values);
  const buildTileList = tilesOptions.map((tile, index) => (
    <div
      key={index}
      className={tileClass(tile.type)}
      style={{ width: '120px', height: '120px' }}
      onClick={handleTileChange(tile.type)}
    >
      <Icon className="mb-2" icon={IconCatalog[tile.icon]} width="36" height="36" iconStyle={IconStyle.light} />
      <span className="text-base font-regular">{TileLabel[tile.type]}</span>
    </div>
  ));

  return (
    <form className={sceneFormClass} onSubmit={handleSubmit} noValidate>
      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extra-bold mb-2">{scene ? 'Edit a Scene' : 'Add a new Scene'}</h1>
      </div>

      {/* SCENE NAME */}

      <div className="flex flex-col mb-6">
        <label className="text-base font-medium text-medium-slate mb-2">Scene name</label>
        <TextInput
          defaultValue={values.name}
          name="name"
          size={TextInputSize.sm}
          onChange={handleChange}
          placeholder="Scene 1"
          block
        />
        {errors?.name && <p className="text-default-negative text-sm mt-2">{errors?.name}</p>}
      </div>

      {/* SCENE TYPE TILES */}
      <div className="flex flex-col mb-6">
        <label className="text-base font-medium text-medium-slate mb-2">Resource type</label>
        <div className="flex items-center">{buildTileList}</div>
      </div>

      {/* SCENE URL */}
      {selectedTile == 'tiles' && (
        <div className="flex flex-col container mx-auto px-6 md:max-w-3xl">
          {showForm ? (
            <UploadTilesForm onSuccess={updateTiles} />
          ) : (
            <UpdateTilesLoader errors={errors} hideLoader={hideLoader} />
          )}
        </div>
      )}
      {selectedTile != 'tiles' && (
        <div>
          <div className="flex flex-col mb-6">
            <label className="text-base font-medium text-medium-slate mb-2">Folder URL</label>
            <TextInput
              defaultValue={values.url}
              name="url"
              size={TextInputSize.sm}
              onChange={handleChange}
              placeholder="https://www.arlene.io/resources/*.png|.jpg"
              block
              onClick={() => setMediaModal(true)}
              trailingIconWithClick={IconCatalog.paperclip}
            />
            {errors?.url && <p className="text-default-negative text-sm mt-2">{errors?.url}</p>}
          </div>
          <div className="flex items-center w-full">
            <Button className="ml-auto" use={ButtonUse.primary} size={ButtonSize.sm} type={ButtonType.submit}>
              Save changes
            </Button>
          </div>
        </div>
      )}
      {/* FOOTER */}
      <MediaLibraryWrapper changeFile={changeFile} />
    </form>
  );
};

export default SceneForm;
