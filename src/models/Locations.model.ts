export interface ILocation {
  id: string;
  name: string;
  description: string;
  images: Array<{
    title: string;
    altText: string;
    url: string;
    [key: string]: any;
  }>,
  [key: string]: any;
}

export interface ILocationResponse {
  data: Array<ILocation>,
  [key: string]: any;
}
