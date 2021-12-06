import React from 'react';
import './UpdateTilesLoader.scss';
import { Button } from '@arleneio/editors-common-ui';

type Props = {
  readonly errors: any;
  readonly hideLoader: () => void;
};

const UpdateTilesLoader: React.FC<Props> = ({ hideLoader, errors }) => {
  const basePath = process.env.PUBLIC_URL || window.location.origin;
  const logoImgURL = `${basePath}/assets/images/arlene_logo.png`;
  const errorImgURL = `${basePath}/assets/images/alert.png`;

  const loaderInfo = (
    <div className="loader-info">
      <div className="text">The project is being updated</div>
      <div className="dots">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );

  const errorInfo = (
    <div className="error-info">
      <div className="alert-error">
        <img className="error-img" src={errorImgURL} alt="Error" />
        <div>
          <h3>Oops! The project could not be updated</h3>
          <p>Please be sure that you are filling out the form properly.</p>
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

      <div className="info-container">{errors.length > 0 ? errorInfo : loaderInfo}</div>
    </div>
  );
};

export default UpdateTilesLoader;
