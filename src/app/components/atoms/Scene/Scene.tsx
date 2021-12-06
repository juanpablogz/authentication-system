/* --- DEPENDENCIES --- */
import React, { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import cn from 'classnames';
import { Icon, IconCatalog, IconStyle } from '@arleneio/editors-common-ui';
/* -------------------- */

type Props = {
  readonly sceneIndex: number;
  readonly activeSceneIndex?: number;
  readonly id: string;
  readonly defaultName?: string;
  readonly className?: string;
  readonly moveScene: (dragIndex: number, hoverIndex: number) => void;
  readonly onClick?: (sceneId: string, index: number) => void;
  readonly onEditClick?: (sceneId: string, index: number) => void;
  readonly onDeleteClick?: (sceneId: string, sceneName: string) => void;
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Scene: React.FC<Props> = ({
  sceneIndex,
  id,
  activeSceneIndex,
  defaultName = 'Scene',
  moveScene,
  onClick,
  onEditClick,
  onDeleteClick,
  className,
}) => {
  /*------------------------*/
  /*  INIT STATES & CONFIG  */
  /*------------------------*/
  const node = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'scene',
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!node.current) return;
      const dragIndex = item.index;
      const hoverIndex = sceneIndex;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = node.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      // Time to actually perform the action
      moveScene(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'scene', id, sceneIndex },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(node));

  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const sceneClass = cn(className, 'flex items-center border-b h-16', {
    'border-t border-default-primary bg-light-primary': activeSceneIndex === sceneIndex,
    'border-extra-dark-snow': !(activeSceneIndex === sceneIndex),
    'opacity-0': isDragging,
    'opacity-1': !isDragging,
  });

  const sceneNameClass = cn(className, 'flex flex-col flex-shrink-0 justify-center py-2 px-4 border-l h-full', {
    'border-default-primary font-medium': activeSceneIndex === sceneIndex,
    'border-extra-dark-snow': !(activeSceneIndex === sceneIndex),
  });
  /*-----------------*/
  /*     HANDLES     */
  /*-----------------*/
  const handleSceneClick = () => {
    if (onClick) onClick(id, sceneIndex);
  };

  const handleEditBtnClick = () => {
    if (onEditClick) onEditClick(id, sceneIndex);
  };

  const handleDeleteBtnClick = () => {
    if (onDeleteClick) onDeleteClick(id, defaultName);
  };

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div ref={node} className={sceneClass} onClick={handleSceneClick}>
      {/* DRAG INDICATOR */}
      <div
        style={{ width: '36px' }}
        className="flex flex-shrink-0 items-center justify-center space-x-1 h-full cursor-grab"
      >
        <div className="border-r border-extra-dark-smoke h-6"></div>
        <div className="border-r border-extra-dark-smoke h-6"></div>
      </div>

      <div className="flex flex-col h-full">
        {/* SCENE NAME */}
        <div className={sceneNameClass}>
          <span style={{ maxWidth: '8rem' }} className="text-sm truncate">
            {defaultName}
          </span>
          <small style={{ maxWidth: '8rem' }} className="text-light-slate truncate">
            id:{id}
          </small>
        </div>
      </div>

      {/* ACTIONS */}
      {activeSceneIndex === sceneIndex && (
        <div className="flex flex-col flex-shrink-0 items-center h-full border-l border-default-primary ml-auto">
          <div
            className="flex items-center justify-center border-b border-default-primary h-full px-2 cursor-pointer text-light-slate hover:text-dark-primary"
            onClick={handleEditBtnClick}
          >
            <Icon icon={IconCatalog.pen} iconStyle={IconStyle.light} width="16" height="16" />
          </div>
          <div
            className="flex items-center justify-center h-full px-2 cursor-pointer text-light-slate hover:text-dark-primary"
            onClick={handleDeleteBtnClick}
          >
            <Icon icon={IconCatalog.trash} iconStyle={IconStyle.light} width="16" height="16" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Scene;
