import React from 'react';
import './UpdateJsonLoader.scss';
import { Button } from '@arleneio/editors-common-ui';

type Props = {
  readonly isReady: boolean;
  readonly isDeploying: boolean;
  readonly errors: any;
  readonly hideLoader: () => void;
  readonly closeModal: () => void;
};

const UpdateJsonLoader: React.FC<Props> = ({ hideLoader, isDeploying, isReady, errors, closeModal }) => {
  const basePath = process.env.PUBLIC_URL || window.location.origin;
  const logoImgURL = `${basePath}/assets/images/arlene_logo.png`;
  const errorImgURL = `${basePath}/assets/images/alert.png`;

  const loaderInfo = (
    <div className="loader-info">
      <div className="text">The project is being {isDeploying ? 'deployed' : 'updated'}</div>
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
      <p>The project is already updated!</p>
      <Button onClick={closeModal} className="mt-6 mx-auto">
        <span>Go back to project</span>
      </Button>
    </div>
  );

  const errorInfo = (
    <div className="error-info">
      <div className="alert-error">
        <img className="error-img" src={errorImgURL} alt="Error" />
        <div>
          <h3>Oops! The project could not be updated</h3>
          <p>Please try again or contact our support service.</p>
        </div>
      </div>
      <Button onClick={hideLoader} className="mt-6 mx-auto">
        <span>Go back</span>
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

export default UpdateJsonLoader;
