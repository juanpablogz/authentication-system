/* --- DEPENDENCIES --- */
import React, { useEffect, useState } from 'react';
import { ReactMediaLibrary, FileMeta, FileLibraryListItem } from '@arleneio/editors-common-ui';
import { useMedia } from '@contexts/MediaContext';
import apiConfig from '@config/config';
import axios from 'axios';
import { useAuth } from '@src/app/common/contexts/AuthContext';

/* -------------------- */
export interface FormFields {
  size: number;
  fileName: string;
  type: string;
  file: string;
}

type Props = {
  readonly changeFile?: (value) => void;
};

const MediaLibraryWrapper: React.FC<Props> = ({ changeFile }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { getToken } = useAuth();
  const [fileLibraryList, setFileLibraryList] = useState(Array<FormFields>());
  const { mediaModal, setMediaModal } = useMedia();
  const currentUrl = window.location.href.split('/');
  const pid = currentUrl[currentUrl.length - 1];
  /*--------------------*/
  /*       HANDLES      */
  /*--------------------*/
  useEffect(() => {
    getFiles();
  }, [pid]);

  const getFiles = async () => {
    const token = await getToken();
    const headers = {
      headers: { Authorization: token },
    };
    const toDeployURL = `${apiConfig.api.uriMedia}/media/360/${pid}/files`;
    axios
      .get(toDeployURL, headers)
      .then((res) => {
        console.log('assets:', res.data.files);
        setFileLibraryList(res.data.files);
      })
      .catch((err) => {
        console.error('Error reading file list:', err);
      });
  };

  const fileUpload = async (fileBase64: string, fileMeta: FileMeta): Promise<any> => {
    const currentUrl = window.location.href.split('/');
    const pid = currentUrl[currentUrl.length - 1];

    const deployURL = `${apiConfig.api.uriMedia}/media/360/${pid}/files`;
    const token = await getToken();
    console.log(fileBase64);
    const base64 = fileBase64.replace(
      /^data:(?:image|application|video|)\/(?:gif|png|jpeg|bmp||zip|webp|svg\+xml)(?:;charset=utf-8)?;base64/,
      '',
    );
    console.log(base64);

    const jsonData = {
      filename: fileMeta.fileName,
      file: base64,
      type: fileMeta.type,
      size: fileMeta.size,
    };
    console.log('Uploading', jsonData.filename);
    const headers = {
      headers: { Authorization: token },
    };
    axios
      .post(deployURL, jsonData, headers)
      .then(getFiles)
      .catch((err) => console.error('File upload error', err));
    return { success: true };
  };

  const fileDelete = async (fileId: number): Promise<any> => {
    console.log(fileId);
    return { success: true };
  };

  async function uploadCallback(fileBase64: string, fileMeta: FileMeta): Promise<any> {
    // TODO Upload file to backend APIs
    const result = await fileUpload(fileBase64, fileMeta);

    if (result.success) {
      // New file uploaded
      // TODO Reacquire new file list from database
      // const newFileList = await getNewFileList();
      // setFileLibraryList(newFileList);
      // Return true to display upload success in modal
      return true;
    } else {
      // Return false to display upload failed in modal
      return false;
    }
  }

  function selectCallback(item: FileLibraryListItem) {
    if (changeFile) {
      changeFile(item.url);
    }
    onHide();
  }

  async function deleteCallback(item: FileLibraryListItem) {
    const result = await fileDelete(item);
    if (result.success) {
    }
  }

  const onHide = () => {
    setMediaModal(false);
  };
  return (
    <div>
      <ReactMediaLibrary
        show={mediaModal}
        fileUploadCallback={uploadCallback}
        fileLibraryList={fileLibraryList}
        onHide={onHide}
        fileSelectCallback={selectCallback}
        fileDeleteCallback={deleteCallback}
      />
    </div>
  );
};

export default MediaLibraryWrapper;
