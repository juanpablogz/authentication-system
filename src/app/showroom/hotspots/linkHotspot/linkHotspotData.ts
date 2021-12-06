import { BaseHotspotData } from '../baseHotspot/baseHotspotData';

export interface Size {
  readonly width: string;
  readonly height: string;
}

export interface LinkData extends BaseHotspotData {
  readonly link: string;
  readonly icon: string;
  readonly size: Size;
  readonly class: string;
}
