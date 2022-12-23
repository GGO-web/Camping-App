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
  addresses?: Array<
  {
    postalCode: string,
    city: string,
    stateCode: string,
    type: string,
    line1?: string,
    line2?: string,
    line3?: string,
  }
  >,
  [key: string]: any;
}

export interface ILocationResponse {
  data: Array<ILocation>,
  [key: string]: any;
}
