/* --- DEPENDENCIES --- */
import React, { useState } from 'react';
import cn from 'classnames';
import {
  Type as HotspotType,
  TypeLabel as HotspotTypeLabel,
  TypeColor as HotspotTypeColor,
} from '@showroom/hotspots/baseHotspot/baseHotspotData';
import { Icon, IconCatalog, IconStyle, Popover, PopoverPlacement } from '@arleneio/editors-common-ui';
/* -------------------- */

type Props = {
  readonly className?: string;
  readonly onItemClick: (option: OptionMenu) => void;
};

export type OptionMenu = HotspotType;

const AddHotspotMenu: React.FC<Props> = ({ className, onItemClick }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const addHotspotMenuClass = cn(className, 'relative');

  const triggerClass = cn(
    'rounded-md text-sm px-3 py-2 flex items-center space-x-2 hover:bg-dark-snow cursor-pointer',
    {
      'bg-dark-snow': menuIsOpen,
    },
  );

  /*--------------------*/
  /*       HANDLES      */
  /*--------------------*/
  const handleItemClick = (option: OptionMenu) => (): void => {
    console.log(option);
    setMenuIsOpen(false);
    onItemClick(option);
  };

  const handleTriggerClick = (): void => setMenuIsOpen(!menuIsOpen);

  const handleOutsideClick = (): void => setMenuIsOpen(false);

  const popoverContent = (
    <div className="flex">
      <div className="w-1/2 border-r border-dark-snow p-4">
        <div className="text-sm text-default-primary font-medium mb-4">Info items</div>
        <div className="flex flex-col">
          {/* PRODUCT 360 HOTSPOT */}
          <div
            className="flex items-center space-x-3 cursor-pointer hover:bg-default-snow hover:font-medium rounded-md p-2"
            onClick={handleItemClick(HotspotType.product360)}
          >
            <div className="p-1 rounded-md" style={{ backgroundColor: HotspotTypeColor.product360 }}>
              <Icon icon={IconCatalog.product360} iconStyle={IconStyle.light} width="22" height="22" />
            </div>
            <span>{HotspotTypeLabel[HotspotType.product360]}</span>
          </div>

          {/* IMAGE HOTSPOT */}
          <div
            className="flex items-center space-x-3 cursor-pointer hover:bg-default-snow hover:font-medium rounded-md p-2"
            onClick={handleItemClick(HotspotType.image)}
          >
            <div className="p-1 rounded-md" style={{ backgroundColor: HotspotTypeColor.image }}>
              <Icon icon={IconCatalog.image} iconStyle={IconStyle.light} width="22" height="22" />
            </div>
            <span>{HotspotTypeLabel[HotspotType.image]}</span>
          </div>

          {/* LINK HOTSPOT */}
          <div
            className="flex items-center space-x-3 cursor-pointer hover:bg-default-snow hover:font-medium rounded-md p-2"
            onClick={handleItemClick(HotspotType.link)}
          >
            <div className="p-1 rounded-md" style={{ backgroundColor: HotspotTypeColor.link }}>
              <Icon icon={IconCatalog.link} iconStyle={IconStyle.light} width="22" height="22" />
            </div>
            <span>{HotspotTypeLabel[HotspotType.link]}</span>
          </div>

          {/* VIDEO HOTSPOT */}
          <div
            className="flex items-center space-x-3 cursor-pointer hover:bg-default-snow hover:font-medium rounded-md p-2"
            onClick={handleItemClick(HotspotType.video)}
          >
            <div className="p-1 rounded-md" style={{ backgroundColor: HotspotTypeColor.video }}>
              <Icon icon={IconCatalog.video} iconStyle={IconStyle.light} width="22" height="22" />
            </div>
            <span>{HotspotTypeLabel[HotspotType.video]}</span>
          </div>
          {/* PRODUCT VIDEO HOTSPOT */}
          <div
            className="flex items-center space-x-3 cursor-pointer hover:bg-default-snow hover:font-medium rounded-md p-2"
            onClick={handleItemClick(HotspotType.productVideo)}
          >
            <div className="p-1 rounded-md" style={{ backgroundColor: HotspotTypeColor.productVideo }}>
              <Icon icon={IconCatalog.video} iconStyle={IconStyle.light} width="22" height="22" />
            </div>
            {/* <span>{HotspotTypeLabel[HotspotType.productVideo]}</span> */}
            <span>Product Video</span>
          </div>
          {/* IFRAME HOTSPOT */}
          <div
            className="flex items-center space-x-3 cursor-pointer hover:bg-default-snow hover:font-medium rounded-md p-2"
            onClick={handleItemClick(HotspotType.iframe)}
          >
            <div className="p-1 rounded-md" style={{ backgroundColor: HotspotTypeColor.iframe }}>
              <Icon icon={IconCatalog.video} iconStyle={IconStyle.light} width="22" height="22" />
            </div>
            <span>{HotspotTypeLabel[HotspotType.iframe]}</span>
          </div>
        </div>
      </div>

      <div className="w-1/2 p-4">
        <div className="text-sm text-default-primary font-medium mb-4">Navigation items</div>
        <div className="flex flex-col">
          {/* GO TO HOTSPOT */}
          <div
            className="flex items-center space-x-3 cursor-pointer hover:bg-default-snow hover:font-medium rounded-md p-2"
            onClick={handleItemClick(HotspotType.goto)}
          >
            <div className="p-1 rounded-md" style={{ backgroundColor: HotspotTypeColor.goto }}>
              <Icon icon={IconCatalog.externalLink} iconStyle={IconStyle.light} width="22" height="22" />
            </div>
            <span>{HotspotTypeLabel[HotspotType.goto]}</span>
          </div>

          {/* NEXT HOTSPOT */}
          <div
            className="flex items-center space-x-3 cursor-pointer hover:bg-default-snow hover:font-medium rounded-md p-2"
            onClick={handleItemClick(HotspotType.next)}
          >
            <div className="p-1 rounded-md" style={{ backgroundColor: HotspotTypeColor.next }}>
              <Icon icon={IconCatalog.arrowAltFromBottom} iconStyle={IconStyle.light} width="22" height="22" />
            </div>
            <span>{HotspotTypeLabel[HotspotType.next]}</span>
          </div>

          {/* PREVIOUS HOTSPOT */}
          <div
            className="flex items-center space-x-3 cursor-pointer hover:bg-default-snow hover:font-medium rounded-md p-2"
            onClick={handleItemClick(HotspotType.previous)}
          >
            <div className="p-1 rounded-md" style={{ backgroundColor: HotspotTypeColor.previous }}>
              <Icon icon={IconCatalog.arrowAltFromTop} iconStyle={IconStyle.light} width="22" height="22" />
            </div>
            <span>{HotspotTypeLabel[HotspotType.previous]}</span>
          </div>
        </div>
      </div>
    </div>
  );

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <Popover
      isOpen={menuIsOpen}
      className={addHotspotMenuClass}
      content={popoverContent}
      placement={PopoverPlacement.bottom}
      onOutsideClick={handleOutsideClick}
    >
      <div className={triggerClass} onClick={handleTriggerClick}>
        <Icon icon={IconCatalog.plus} iconStyle={IconStyle.regular} width="16" height="16" />
        <span className="truncate font-medium">Add Item</span>
      </div>
    </Popover>
  );
};

export default AddHotspotMenu;
