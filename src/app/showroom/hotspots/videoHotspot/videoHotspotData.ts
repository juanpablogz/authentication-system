import { BaseHotspotData } from '../baseHotspot/baseHotspotData';

export interface VideoData extends BaseHotspotData {
  readonly url: string;
  readonly video: string;
  readonly autoplay: boolean;
  readonly chroma: boolean;
  readonly width: number;
  readonly aspect: string;
  readonly class: string;
  readonly perspective: {
    radius: number;
    extraTransforms: string;
  };
}
