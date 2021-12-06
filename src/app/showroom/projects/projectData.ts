export interface ExitData {
  readonly link?: string;
  readonly ask?: string;
  readonly yes?: { text: string; 'bg-color': string };
  readonly no?: string;
}

export interface IconData {
  readonly touchpoint?: string;
  readonly close?: string;
  readonly map?: string;
  readonly 'audio-on'?: string;
  readonly 'audio-off'?: string;
  readonly share?: string;
  readonly 'share-ios'?: string;
}

export interface ProjectData {
  readonly shareTitle?: string;
  readonly shareDesc?: string;
  readonly audio?: string;
  readonly exit?: ExitData;
  readonly icons?: IconData;
}
