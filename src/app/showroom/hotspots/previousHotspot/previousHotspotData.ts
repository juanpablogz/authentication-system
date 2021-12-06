import { BaseHotspotData } from '../baseHotspot/baseHotspotData';

export interface PreviousData extends BaseHotspotData {
  readonly color: string;
  readonly class: string;
}
