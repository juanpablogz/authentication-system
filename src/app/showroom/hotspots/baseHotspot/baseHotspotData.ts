export enum Type {
  image = 'image',
  link = 'link',
  product360 = 'product360',
  video = 'video',
  goto = 'goto',
  next = 'next',
  previous = 'previous',
  iframe = 'iframe',
  productVideo = 'product-video',
}

export enum TypeLabel {
  image = 'Image',
  link = 'Link',
  product360 = 'Product 360',
  video = 'Video',
  goto = 'Go To',
  next = 'Next point',
  previous = 'Previous point',
  iframe = 'Iframe',
  productVideo = 'Previous',
}

export enum TypeColor {
  image = '#EDFFEB',
  link = '#EBFFFF',
  product360 = '#FFEBEB',
  video = '#FFF6EB',
  goto = '#FCEBFF',
  next = '#ECEAFF',
  previous = '#EBF2FF',
  iframe = '#99FEFF',
  productVideo = '#FFF6EB',
}

export interface Location {
  yaw: number;
  pitch: number;
}

export interface BaseHotspotData {
  readonly id: string;
  readonly type: string;
  readonly location: Location;
}
