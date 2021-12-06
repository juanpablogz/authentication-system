import { BaseHotspotData } from '../baseHotspot/baseHotspotData';

export interface NextData extends BaseHotspotData {
  readonly color: string;
  readonly class: string;
}
