import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import cn from 'classnames';
import { db } from '@config/firebase/firebaseConfig';
import { ProjectFirebaseData } from '@interfaces/data';
import { useAuth } from '@contexts/AuthContext';
import OptionPanel from '@organisms/OptionPanel/OptionPanel';
import Sidebar from '@organisms/Sidebar/Sidebar';
import Preview from '@organisms/Preview/Preview';

import { useShowroom } from '@showroom/ShowroomContext';
import * as appConstants from '@constants/appConstants';

type Props = {
  readonly className?: string;
};

const EditorPage: React.FC<Props> = ({ className }) => {
  const [dataJson, setDataJson] = useState('');
  const history = useHistory();
  const { pid } = useParams<any>();
  const { authState } = useAuth();

  const goToNotFoundPage = (): void => history.push('/404');
  const goToDashboard = (): void => history.push('/dashboard');
  const getProject = useCallback(
    async (projectId: string): Promise<ProjectFirebaseData> => {
      const usersRef = db.ref(`projects/${authState.currentUser?.uid}/360/${projectId}`);
      const snapshot = await usersRef.once('value');
      // console.log('Project: ', snapshot.val());
      return snapshot.val();
    },
    [authState],
  );

  const setProject = async (): Promise<void> => {
    const project = await getProject(pid); // Get project from firebase
    if (project) setDataJson(project.data.json);
    else goToNotFoundPage();
  };

  useEffect(() => {
    if (pid) {
      setProject();
    } else {
      goToDashboard();
    }
  }, [pid]); // eslint-disable-line react-hooks/exhaustive-deps

  const { setIsMounted, setIsMountedScene, size } = useShowroom();

  // Callback after the ARLENE_360.initArleneJSTAG is executed!
  const handleLoad = (): void => {
    setIsMounted(true);
    setIsMountedScene(true);
  };

  // Called after the showroom wrapper is mounted to make sure the div is created!
  const onWrapperLoaded = async () => {
    if ((window as any).ARLENE_360 && (window as any).ARLENE_360.initArleneJSTAG) {
      (window as any).ARLENE_360.initArleneJSTAG();
    } else {
      const now = new Date().getTime();
      const script = document.createElement('script');
      script.src = `${appConstants.SHOWROOM_SCRIPT_URL}?tm=${now}`;
      script.async = true;
      document.body.appendChild(script);
      window.addEventListener('json-loaded', handleLoad);
    }
  };

  // Load showroom script
  useEffect(() => {
    return (): void => {
      window.removeEventListener('json-loaded', handleLoad);
      setIsMounted(false);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Class assignment
  const editorPageClass = cn(className);
  /* ----------------------------------------------
   *                RENDER JSX
   * ---------------------------------------------- */
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ height: 'calc(100vh - 65px)' }} className={editorPageClass}>
        {/* MAIN SECTION */}
        <div className="flex h-full">
          {dataJson && <Sidebar />}
          <div className="flex p-8 w-full justify-center">
            <div
              className={`${
                size === 'mobile' ? 'w-6/12' : size === 'tablet' ? 'w-8/12' : 'w-full'
              } bg-white border border-extra-dark-snow h-full justify-items-center`}
            >
              {!dataJson && (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center max-w-xl p-12">
                    <span className="text-xl">Loading...</span>
                  </div>
                </div>
              )}
              {dataJson && (
                <div className="flex items-center justify-center h-full">
                  <Preview dataJson={dataJson} onLoad={onWrapperLoaded} />
                </div>
              )}
            </div>
          </div>
          <OptionPanel />
        </div>
      </div>
    </DndProvider>
  );
};

export default EditorPage;
