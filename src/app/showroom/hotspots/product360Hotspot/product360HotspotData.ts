import { BaseHotspotData } from '../baseHotspot/baseHotspotData';

export interface Cta {
  readonly text: string;
  readonly link: string;
  readonly color: string;
}

export interface View360 {
  readonly filename: string;
  readonly folder: string;
  readonly amount: number;
  readonly magnifier: number;
  readonly loop: boolean;
}

export interface Product360Data extends BaseHotspotData {
  readonly name: string;
  readonly subname: string;
  readonly desc: string;
  readonly price: string;
  readonly class: string;
  readonly cta: Cta;
  readonly '360': View360;
}
