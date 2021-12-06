/* --- DEPENDENCIES --- */
import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import {
  LoadJsonFormFields,
  validateBasicFields,
  ValidationError,
} from '@src/app/common/validators/loadJsonFormValidator';
import { isEmpty } from '@utils/utils';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonUse,
  TextInput,
  TextInputSize,
  useForm,
} from '@arleneio/editors-common-ui';
import axios from 'axios';
import { useAuth } from '@contexts/AuthContext';
import { db } from '@config/firebase/firebaseConfig';

/* -------------------- */

type Props = {
  readonly onSuccess: (data: any, projectId: string) => void;
  readonly className?: string;
  readonly projectData: any;
};

const LoadJsonForm: React.FC<Props> = ({ className, onSuccess, projectData }) => {
  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const isEmptyData = isEmpty(projectData);
  const loadJsonFormClass = cn(className);

  /*------------------*/
  /*    FORM LOGIC    */
  /*------------------*/
  const formFields: LoadJsonFormFields = {
    url: projectData?.json || '',
    name: projectData?.name || '',
    client: projectData?.client || '',
    thumbnail: projectData?.thumbnail || '',
  };

  const [errUrl, setErrUrl] = useState('');
  const [clientList, setClientList] = useState([]);
  const { authState } = useAuth();

  const onSubmit = (formData, errors): void => {
    let urlAxios = '';
    const url = formData.url;
    if (url.endsWith('/')) {
      urlAxios = `${url}data.json`;
    }
    if (url.includes('index') || url.includes('index.html')) {
      let replace = url.replace('index', 'data.json');
      if (url.includes('index.html')) replace = url.replace('index.html', 'data.json');
      urlAxios = replace;
    }

    const successRes = (res) => {
      formData.url = urlAxios;
      setErrUrl('');
      console.log(res);
      console.log(formData);
      if (isEmpty(errors)) onSuccess(formData, projectData?.uid);
    };
    const errorRes = (err) => {
      console.log(err.response);
      setErrUrl('your url does not contain a valid project structure');
    };
    axios
      .get(urlAxios)
      .then((res) => successRes(res))
      .catch(errorRes);
  };

  useEffect(() => {
    const clients = db.ref(`clients`);

    clients.once(
      'value',
      (snapshot: any): void => {
        const clientsData = snapshot.val();
        setClientList(clientsData);
      },
      (errorObject: any): void => {
        console.log(`The read failed: ${errorObject.name}`);
      },
    );
  }, [authState]); // TOCHECK why I cant watch clientList state

  const options = clientList.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  const { errors, handleChange, handleSubmit } = useForm<LoadJsonFormFields, ValidationError>(
    formFields,
    onSubmit,
    validateBasicFields,
  );
  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <form className={loadJsonFormClass} onSubmit={handleSubmit} noValidate>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extra-bold mb-2">{isEmptyData ? 'Import a' : 'Edit'} 360 showroom project</h1>
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-base font-medium text-medium-slate mb-2">Project Client</label>
        <select
          defaultValue={formFields.url}
          name="client"
          onChange={handleChange}
          className="client arl-text-input arl-text-input--sm"
        >
          <option disabled>-- Select a client --</option>
          {options}
        </select>
        {errors?.client && <p className="text-default-negative text-sm">{errors?.client}</p>}
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-base font-medium text-medium-slate mb-2">Project Name</label>
        <TextInput
          defaultValue={formFields.name}
          name="name"
          size={TextInputSize.sm}
          onChange={handleChange}
          placeholder="Project Name"
          block
        />
        {errors?.name && <p className="text-default-negative text-sm">{errors?.name}</p>}
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-base font-medium text-medium-slate mb-2">Project URL</label>
        <TextInput
          defaultValue={formFields.url}
          name="url"
          size={TextInputSize.sm}
          onChange={handleChange}
          placeholder="https://*.json"
          block
        />
        {errors?.url && <p className="text-default-negative text-sm">{errors?.url}</p>}
        {errUrl ? <p className="text-default-negative text-sm">{errUrl}</p> : ''}
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-base font-medium text-medium-slate mb-2">Thumbnail Optional</label>
        <TextInput
          defaultValue={formFields.thumbnail}
          name="thumbnail"
          size={TextInputSize.sm}
          onChange={handleChange}
          placeholder="https://image.png"
          block
        />
        {errors?.thumbnail && <p className="text-default-negative text-sm">{errors?.thumbnail}</p>}
      </div>

      <Button use={ButtonUse.primary} size={ButtonSize.sm} type={ButtonType.submit} block>
        {isEmptyData ? 'Import' : 'Update'} Project
      </Button>
    </form>
  );
};

export default LoadJsonForm;
