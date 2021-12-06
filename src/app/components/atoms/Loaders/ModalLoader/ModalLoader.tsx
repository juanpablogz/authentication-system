import React from 'react';
import './ModalLoader.scss';
import { Button } from '@arleneio/editors-common-ui';
import { useHistory } from 'react-router-dom';

type Props = {
  readonly projectId: string;
  readonly message: string;
  readonly isReady: boolean;
  readonly errors: any;
  readonly closeModal: () => void;
  readonly hideLoader: () => void;
};

const ModalLoader: React.FC<Props> = ({ message, isReady, projectId, errors, closeModal, hideLoader }) => {
  const history = useHistory();
  const basePath = process.env.PUBLIC_URL || window.location.origin;
  const logoImgURL = `${basePath}/assets/images/arlene_logo.png`;
  const errorImgURL = `${basePath}/assets/images/alert.png`;
  const defaultErrorMsg = 'Please be sure that you are filling out the form properly.';

  // When project is ready to open the editor
  const goToProject = (): void => {
    history.push(`/editor/${projectId}`);
    closeModal();
  };

  const loaderInfo = (
    <div className="loader-info">
      <div className="text">{message}</div>
      <div className="dots">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );

  const readyInfo = (
    <div className="ready-info">
      <p>The project is ready!</p>
      <Button onClick={goToProject} className="mt-6 mx-auto">
        <span>Go to project</span>
      </Button>
    </div>
  );

  const errorInfo = (
    <div className="error-info">
      <div className="alert-error">
        <img className="error-img" src={errorImgURL} alt="Error" />
        <div>
          <h3>Oops! The project could not be created</h3>
          <p>{errors[0]?.statusCode == 422 ? errors[0]?.message : defaultErrorMsg} </p>
        </div>
      </div>
      <Button onClick={hideLoader} className="mt-6 mx-auto">
        <span>Go back to form</span>
      </Button>
    </div>
  );

  return (
    <div className="modal-container">
      <div className="loader-container">
        <div className="loader">
          <div className="spinner-light">
            <img className="logo" src={logoImgURL} alt="Logo" />
          </div>
        </div>
      </div>

      <div className="info-container">{errors.length > 0 ? errorInfo : isReady ? readyInfo : loaderInfo}</div>
    </div>
  );
};

export default ModalLoader;
