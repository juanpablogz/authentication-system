import React, { useState } from 'react';
import axios from 'axios';
import apiConfig from '@config/config';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonUse,
  TextInput,
  TextInputSize,
  // TODO Select form
  // useForm,
} from '@arleneio/editors-common-ui';
// import { isEmpty } from '@utils/utils';
import {
  // ValidationError,
  // validateBasicFields,
  CreateProjectFormFields,
} from '@src/app/common/validators/createProjectFormValidator';
import './CreateProjectForm.scss';

interface Errors {
  name?: string;
  client?: string;
}

interface ProjectData {
  name: string;
  client: string;
  template: string;
}

type Props = {
  readonly onSuccess: (data: any) => void;
  readonly clientList: any;
};

const CreateProjectForm: React.FC<Props> = ({ onSuccess, clientList }) => {
  /*
  const onSubmit = (formData, errors): void => {
    console.log('formData: ', formData)
    if (isEmpty(errors)) onSuccess(formData);
  };

  const { errors, handleChange, handleSubmit } = useForm<CreateProjectFormFields, ValidationError>(
    formFields,
    onSubmit,
    validateBasicFields,
  );
  */
  const [errors, setErrors] = useState<Errors>({});
  const [projectData, setProjectData] = useState<ProjectData>({
    name: '',
    client: '',
    template: '',
  });

  // TODO input type file
  const formFields: CreateProjectFormFields = {
    name: '',
    client: '',
    template: '',
  };

  const validateProjectName = () => {
    const validationURL = apiConfig.api.uri360 + '/projects/360/validations';
    const dataPrj = {
      client: projectData.client,
      name: projectData.name,
      template: projectData.template,
    };

    const successRes = () => {
      setErrors({});
    };

    const errorRes = (err) => {
      if (err.response) {
        const { data, status } = err.response;

        if (status === 422) {
          setErrors({ name: data.message });
        }
      }
    };
    console.log('Validating', dataPrj);
    axios.post(validationURL, dataPrj).then(successRes).catch(errorRes);
  };

  const updateValue = ({ target }) => {
    const errMsgs: Errors = { ...errors };
    // console.log(target.name, target.value);
    switch (target.name) {
      case 'projectData[name]':
        delete errMsgs.name;

        setErrors(errMsgs);
        setProjectData({ ...projectData, name: target.value });
        break;

      case 'projectData[template]':
        delete errMsgs.name;

        setErrors(errMsgs);
        setProjectData({ ...projectData, template: target.value });
        break;

      case 'projectData[client]':
        delete errMsgs.client;

        setErrors(errMsgs);
        setProjectData({ ...projectData, client: target.value });
        break;
    }
  };

  const toSubmit = (event) => {
    if (event) event.preventDefault();

    const errMsgs: Errors = { ...errors };
    const projectName: string = projectData.name.replace(/\s/g, '');

    if (projectName === '') errMsgs.name = 'Please enter a project name';
    if (projectData.client === '') errMsgs.client = 'Please select a project client';

    setErrors(errMsgs);

    // TODO fix hooks validation
    if (Object.keys(errors).length === 0 && Object.keys(errMsgs).length === 0) {
      const formData = new FormData();

      formData.set('client', projectData.client);
      formData.set('name', projectData.name);
      formData.set('template', projectData.template);

      // On organisms/Forms/CreateProjectModal - createProject function:
      onSuccess(formData);
    }
  };

  const options = clientList.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  return (
    <form onSubmit={toSubmit} noValidate>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extra-bold mb-2">Create a new 360 showroom project</h1>
      </div>

      {/* TODO llevar funcionalidad a la libreria de editor-common-ui */}
      <div className="flex flex-col mb-4">
        <label className="text-base font-medium text-medium-slate mb-2">Project Client</label>
        <select name="projectData[client]" onChange={updateValue} className="client arl-text-input arl-text-input--sm">
          <option value="">-- Select a client --</option>
          {options}
        </select>
        {errors?.client && <p className="text-default-negative text-sm">{errors?.client}</p>}
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-base font-medium text-medium-slate mb-2">Project Name</label>
        <TextInput
          defaultValue={formFields.name}
          name="projectData[name]"
          size={TextInputSize.sm}
          onChange={updateValue}
          onBlur={validateProjectName}
          placeholder="Project Name"
          block
        />
        {errors?.name && <p className="text-default-negative text-sm">{errors?.name}</p>}
      </div>

      {/*
      <label className="text-base font-medium text-medium-slate mb-2">Template</label>
      <TextInput
        defaultValue={formFields.template}
        name="projectData[template]"
        size={TextInputSize.sm}
        onChange={updateValue}
        onBlur={validateProjectName}
        placeholder="template url"
        block
      />
      {errors?.name && <p className="text-default-negative text-sm">{errors?.name}</p>}
      */}

      <Button className="mt-2" use={ButtonUse.primary} size={ButtonSize.sm} type={ButtonType.submit} block>
        Create Project
      </Button>
      {/* <pre>{JSON.stringify(projectData, null, 2)}</pre> */}
    </form>
  );
};

export default CreateProjectForm;
