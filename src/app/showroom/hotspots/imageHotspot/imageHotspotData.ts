import { BaseHotspotData } from '../baseHotspot/baseHotspotData';

export interface Cta {
  readonly text: string;
  readonly link: string;
  readonly color: string;
}

export interface ImageData extends BaseHotspotData {
  readonly name: string;
  readonly image: string;
  readonly desc: string;
  readonly class: string;
  readonly cta: Cta;
}
