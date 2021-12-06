/* --- DEPENDENCIES --- */
import React from 'react';
import { Button, Icon, IconCatalog, IconStyle, useBodyClass } from '@arleneio/editors-common-ui';
import { useShowroom } from '@showroom/ShowroomContext';
/* -------------------- */

type Props = {
  readonly onClose: () => void;
  readonly id: string;
};
const DeleteHotspotModal: React.FC<Props> = ({ onClose, id }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { updateJsonHotspot } = useShowroom();
  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/

  /*-------------------*/
  /* APPEND BODY CLASS */
  /*-------------------*/
  useBodyClass('opened-modal');

  /*--------------------*/
  /*       HANDLES      */
  /*--------------------*/
  const handleCancelClick = (): void => onClose();

  const handleDeleteBtnClick = (): void => {
    const data = {
      id: id,
    };
    const currentHotspot = document.getElementById(id);
    currentHotspot?.remove();
    handleCancelClick();
    updateJsonHotspot(data);
  };

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div aria-modal aria-hidden role="dialog">
      <div className="bg-white h-full mb-20">
        {/* HEADER */}
        <div className="flex w-full p-6 pr-4 md:p-8 md:mb-10">
          <span className="cursor-pointer ml-auto" onClick={handleCancelClick}>
            <Icon
              icon={IconCatalog.close}
              iconStyle={IconStyle.light}
              className="text-default-slate"
              width="24"
              height="24"
            />
          </span>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col container mx-auto px-6 md:max-w-2xl mt-40">
          <h1 className="font-bold text-2xl mt-4 text-center">Are you sure to delete this touchpoint?</h1>

          <p className="text-xl mt-4 text-center">- This action cannot be undone -</p>

          <Button className="ml-4 mt-4" onClick={handleDeleteBtnClick}>
            <span>Delete Hotspot</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteHotspotModal;
