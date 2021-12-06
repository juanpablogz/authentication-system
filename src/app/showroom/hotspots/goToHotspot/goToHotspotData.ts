import { BaseHotspotData } from '../baseHotspot/baseHotspotData';

export interface GoToData extends BaseHotspotData {
  readonly target: string;
  readonly color: string;
  readonly class: string;
}
