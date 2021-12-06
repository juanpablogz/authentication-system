import React from 'react';
import { Button, ButtonSize, ButtonType, ButtonUse, Switch, SwitchSize } from '@arleneio/editors-common-ui';
// import './UpdateTilesForm.scss';

type Props = {
  readonly onSuccess: (data: any) => void;
};

const UploadTilesForm: React.FC<Props> = ({ onSuccess }) => {
  const formData = new FormData();
  formData.set('toReplace', 'false');

  const updateValue = ({ target }) => {
    const { name } = target;

    switch (target.type) {
      case 'checkbox':
        formData.set(name, target.checked);
        break;

      case 'file':
        const file = target.files[0];
        const filename = target.files[0].name;
        formData.set(name, file, filename);
        break;

      default:
        console.log('target default');
        break;
    }
  };

  const toSubmit = (event) => {
    if (event) event.preventDefault();
    onSuccess(formData);
  };

  return (
    <form onSubmit={toSubmit} noValidate className="updateTilesForm">
      {/* <div className="text-center mb-8">
        <h1 className="text-2xl font-extra-bold mb-2">Update tiles</h1>
      </div> */}

      <div className="flex flex-col mb-6">
        <label className="text-base font-medium text-medium-slate mb-2">Tiles</label>
        <input type="file" name="tiles" id="favicon" accept=".zip" onChange={updateValue} />
        {/*{errors?.favicon && <p className="text-default-negative text-sm">{errors?.favicon}</p>}*/}
      </div>

      <div className="flex mb-8">
        <Switch name="toReplace" onChange={updateValue} size={SwitchSize.sm} />
        <p className="text-sm ml-2 leading-snug">Replace existing tiles</p>

        {/*{errors?.favicon && <p className="text-default-negative text-sm">{errors?.favicon}</p>}*/}
      </div>

      <div className="flex items-center w-full">
        <Button className="ml-auto" use={ButtonUse.primary} size={ButtonSize.sm} type={ButtonType.submit}>
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default UploadTilesForm;
