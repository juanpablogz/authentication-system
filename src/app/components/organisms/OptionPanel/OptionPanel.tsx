/* --- DEPENDENCIES --- */
import React from 'react';
import cn from 'classnames';
import { isNullOrUndefined } from '@utils/utils';
import GoToHotspot from './GoToHotspot/GoToHotspot';
import LinkHotspot from './LinkHotspot/LinkHotspot';
import NextHotspot from './NextHotspot/NextHotspot';
import ImageHotspot from './ImageHotspot/ImageHotspot';
import PreviousHotspot from './PreviousHotspot/PreviousHotspot';
import Product360Hotspot from './Product360Hotspot/Product360Hotspot';
import VideoHotspot from './VideoHotspot/VideoHotspot';
import IframeHotspot from './IframeHotspot/IframeHotspot';
import ProductVideoHotspot from './ProductVideoHotspot/ProductVideoHotspot';
import { Type as HotspotType, TypeLabel as HotspotTypeLabel } from '@showroom/hotspots/baseHotspot/baseHotspotData';
import { useShowroom } from '@showroom/ShowroomContext';
import './OptionPanel.scss';
/* -------------------- */

const OptionPanels = {
  [HotspotType.goto]: GoToHotspot,
  [HotspotType.link]: LinkHotspot,
  [HotspotType.next]: NextHotspot,
  [HotspotType.image]: ImageHotspot,
  [HotspotType.previous]: PreviousHotspot,
  [HotspotType.product360]: Product360Hotspot,
  [HotspotType.video]: VideoHotspot,
  [HotspotType.iframe]: IframeHotspot,
  [HotspotType.productVideo]: ProductVideoHotspot,
};

type Props = {
  readonly className?: string;
};

const OptionPanel: React.FC<Props> = ({ className }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const testId = 'OptionPanel';
  const { editableHotspot } = useShowroom();

  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const optionPanelClass = cn(
    'ase-option-panel bg-white border-l border-dark-smoke flex flex-col flex-shrink-0 text-sm',
    className,
  );

  /*---------------------------------------*/
  /*     RENDER BY CURRENT OPTION PANEL    */
  /*---------------------------------------*/
  const optionPanel = (): JSX.Element => {
    if (isNullOrUndefined(editableHotspot)) return <></>;
    const OptionPanelComponent = OptionPanels[editableHotspot!.type];
    if (isNullOrUndefined(OptionPanelComponent)) return <div>NO IMPLEMENTED</div>;

    return (
      <>
        <div className="text-xs bg-default-snow border-b border-default-smoke p-4 font-semi-bold">
          {HotspotTypeLabel[editableHotspot!.type]} item
        </div>
        <div className="option-panel-content">
          <OptionPanelComponent className="mb-8" />
        </div>
      </>
    );
  };

  return (
    <div data-testid={testId} className={optionPanelClass} style={{ width: '17rem' }}>
      {optionPanel()}
    </div>
  );
};

export default OptionPanel;
