export interface InitialView {
  yaw: number;
  pitch: number;
  fov: number;
}

export interface SceneData {
  readonly id: string;
  readonly name: string;
  readonly bg?: string;
  readonly tiles?: string;
  readonly video?: string;
  readonly initialView: InitialView;
  readonly items: Array<Object>;
}
