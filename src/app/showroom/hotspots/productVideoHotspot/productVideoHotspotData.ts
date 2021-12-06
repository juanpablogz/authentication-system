import { BaseHotspotData } from '../baseHotspot/baseHotspotData';
export interface Cta {
  readonly text: string;
  readonly link: string;
  readonly color: string;
}

export interface ProductVideoData extends BaseHotspotData {
  readonly video: string;
  readonly loop: boolean;
  readonly class: string;
  readonly icon: string;
  readonly name: string;
  readonly desc: string;
  readonly cta: Cta;
}
