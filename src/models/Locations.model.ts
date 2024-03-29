export interface ILocationImage {
  title: string;
  altText: string;
  url: string;
  [key: string]: any;
}

export interface ILocation {
  id: string;
  name: string;
  description: string;
  images: ILocationImage[];
  addresses?: Array<{
    postalCode: string;
    city: string;
    stateCode: string;
    type: string;
    line1?: string;
    line2?: string;
    line3?: string;
  }>;
  [key: string]: any;
}
