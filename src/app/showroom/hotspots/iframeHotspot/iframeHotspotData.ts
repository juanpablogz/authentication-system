import { BaseHotspotData } from '../baseHotspot/baseHotspotData';

export interface IframeData extends BaseHotspotData {
  readonly class: string;
  readonly goback: string;
  readonly url: string;
  readonly size: {
    readonly width: string;
    readonly height: string;
  };
}
