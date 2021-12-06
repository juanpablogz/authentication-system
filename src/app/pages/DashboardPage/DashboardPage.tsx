/* --- DEPENDENCIES --- */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { db } from '@config/firebase/firebaseConfig';
import { ProjectFirebaseData } from '@interfaces/data';
import { useModal, Modals } from '@contexts/ModalContext';
import { useAuth } from '@contexts/AuthContext';
import {
  Divider,
  DividerSpacing,
  DividerColor,
  DropdownMenu,
  Item,
  Menu,
  MenuPlacement,
  Button,
  Icon,
  IconCatalog,
  IconStyle,
} from '@arleneio/editors-common-ui';
import ProjectCard from '@atoms/Cards/ProjectCard/ProjectCard';
import ProjectList from '@atoms/Lists/ProjectList/ProjectList';
/* -------------------- */

type Props = {
  readonly className?: string;
};

const DashboardPage: React.FC<Props> = ({ className }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const history = useHistory();
  const { authState } = useAuth();
  const { setCurrentModal } = useModal();
  const [showGridView, setGridView] = useState(true);
  const [projects, setProjects] = useState<Array<ProjectFirebaseData>>([]);
  let gridToggleBtnClassName = 'p-2 hover:bg-dark-snow cursor-pointer rounded-md';
  let listToggleBtnClassName = 'p-2 hover:bg-dark-snow cursor-pointer rounded-md';

  if (showGridView) {
    gridToggleBtnClassName += ' bg-dark-snow cursor-default';
    listToggleBtnClassName = 'p-2 hover:bg-dark-snow cursor-pointer rounded-md';
  } else {
    gridToggleBtnClassName = 'p-2 hover:bg-dark-snow cursor-pointer rounded-md';
    listToggleBtnClassName += ' bg-dark-snow cursor-default';
  }

  const loadProjects = (currentUser: any) => {
    const userProjects = db.ref(`projects/${currentUser.uid}/360/`);

    // Listen: firebase user projects
    userProjects.on(
      'value',
      (snapshot: any): void => {
        const data = snapshot.val();

        if (!data) {
          return;
        }

        // fix old projects structure
        for (const key in data) {
          if (!data[key].pid) {
            data[key].pid = key;
          }
          if (!data[key].updated_at) {
            data[key].updated_at = Date.now() / 1000;
          }
        }

        const projects: Array<ProjectFirebaseData> = Object.values(data);
        setProjects(projects);
      },
      (errorObject: any): void => {
        console.log(`The read failed: ${errorObject.name}`, errorObject);
      },
    );
  };

  const goToProject = (projectId: string): void => history.push(`/editor/${projectId}`);

  const saveProject = (data: any): void => {
    console.log('data: ', data);
    const userRef = db.ref(`projects/${authState.currentUser?.uid}/360/`);
    const newProject = userRef.push({ data });

    const projectId = newProject.key || 'default';
    const project = userRef.child(projectId);
    project.update({
      uid: projectId,
      updated_at: Date.now() / 1000,
    });
  };

  const cloneProject = (projectId: string): void => {
    const project = db.ref(`projects/${authState.currentUser?.uid}/360/${projectId}`);

    // Get project from firebase
    project.once(
      'value',
      (snapshot: any): void => {
        const clonedData = snapshot.val().data;
        clonedData.name = `Clone ${clonedData.name}`;
        saveProject(clonedData);
      },
      (errorObject: any): void => {
        console.log(`The read failed: ${errorObject.name}`);
      },
    );
  };

  const updateProject = (projectId: string): void => {
    setCurrentModal({
      name: Modals.ImportProjectModal,
      props: {
        project: {
          uid: projectId,
        },
        onClose: (): void => setCurrentModal(null),
      },
    });
  };

  const deleteProject = (projectId: string): void => {
    const project = db.ref(`projects/${authState.currentUser?.uid}/360/${projectId}`);
    project.set({}); // set as an empty project
  };

  const projectCallbacks: any = {
    delete: deleteProject,
    update: updateProject,
    clone: cloneProject,
    view: goToProject,
  };

  useEffect(() => {
    if (authState.currentUser) loadProjects(authState.currentUser);
  }, [authState]);

  const dashboardPageClass = cn(className);

  /* ----------------------------------------------
   *                EVENT HANDLERS
   * ---------------------------------------------- */
  const toogleView = (isGridView: boolean) => (): void => setGridView(isGridView);
  const openCreateProjectModal = (): void => {
    setCurrentModal({
      name: Modals.CreateProjectModal,
      props: {
        project: {},
        onClose: (): void => setCurrentModal(null),
      },
    });
  };
  const openImportProjectModal = (): void => {
    setCurrentModal({
      name: Modals.ImportProjectModal,
      props: {
        project: {},
        onClose: (): void => setCurrentModal(null),
      },
    });
  };

  /* ----------------------------------------------
   *                RENDER JSX
   * ---------------------------------------------- */
  const renderProjectGridView = projects.map((project: ProjectFirebaseData) => (
    <div id={`project-${project.pid}`} key={project.pid} className="w-1/4 p-3">
      <ProjectCard project={project} projectCallbacks={projectCallbacks} />
    </div>
  ));

  const renderProjectList = projects.map((project: ProjectFirebaseData) => (
    <div id={`project-${project.pid}`} key={project.pid}>
      <Divider spacing={DividerSpacing.md} color={DividerColor.extraDarkSnow} />
      <ProjectList project={project} projectCallbacks={projectCallbacks} />
    </div>
  ));

  return (
    <div className={dashboardPageClass}>
      {/* HEADER  */}
      <div className="bg-white flex w-full border-b border-extra-dark-snow py-8 mb-10">
        <div className="flex items-center container mx-auto px-3">
          {/* PROJECT DROPDOWN MENU */}
          <DropdownMenu>
            <div className="cursor-pointer flex items-center space-x-2">
              <span className="text-2xl font-medium">My 360 Projects</span>
              <Icon icon={IconCatalog.chevronDown} iconStyle={IconStyle.solid} width="20" height="20" />
            </div>
            <Menu className="border border-extra-dark-snow z-20" placement={MenuPlacement.bottomRight}>
              <Item className="font-regular">
                <span>My VTO Projects</span>
              </Item>
              <Item className="font-regular">
                <span>My 360 Projects</span>
              </Item>
            </Menu>
          </DropdownMenu>

          <div className="ml-auto flex">
            <Button onClick={openImportProjectModal}>
              <span>Import Project</span>
            </Button>
            <Button onClick={openCreateProjectModal} className="ml-4">
              <span>Create New Project</span>
            </Button>
          </div>
        </div>
      </div>

      {/* PROJECT LIST */}
      <div className="flex flex-col flex-shrink container mx-auto mb-20" style={{ flexBasis: '100%' }}>
        <div className="flex items-center ml-auto space-x-3 px-3 mb-2">
          {/* SORT BY */}
          <DropdownMenu>
            <div className="hover:bg-dark-snow cursor-pointer rounded-md px-3 py-2 flex items-center space-x-2">
              <span className="text-sm truncate font-regular">Sort by Type</span>
              <Icon icon={IconCatalog.chevronDown} iconStyle={IconStyle.regular} width="16" height="16" />
            </div>
            <Menu className="border border-extra-dark-snow z-20" placement={MenuPlacement.bottomRight}>
              <Item className="font-regular">
                <span>Name</span>
              </Item>
              <Item className="font-regular">
                <span>Created by</span>
              </Item>
              <Item className="font-regular">
                <span>Type</span>
                <Icon
                  className="text-default-primary ml-auto"
                  width="16"
                  height="16"
                  iconStyle={IconStyle.solid}
                  icon={IconCatalog.check}
                ></Icon>
              </Item>
              <Item className="font-regular">
                <span>Last modified</span>
              </Item>
            </Menu>
          </DropdownMenu>

          {/* GRID VIEW */}
          <div className={gridToggleBtnClassName} onClick={toogleView(true)}>
            <Icon icon={IconCatalog.borderAll} iconStyle={IconStyle.light} width="20" height="20" />
          </div>

          {/* LIST VIEW */}
          <div className={listToggleBtnClassName} onClick={toogleView(false)}>
            <Icon icon={IconCatalog.bars} iconStyle={IconStyle.light} width="20" height="20" />
          </div>
        </div>

        {showGridView && <div className="flex justify-start flex-wrap">{renderProjectGridView}</div>}

        {!showGridView && (
          <div className="flex flex-col">
            {renderProjectList}
            <Divider spacing={DividerSpacing.md} color={DividerColor.extraDarkSnow} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
