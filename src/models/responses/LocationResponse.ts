import { ILocation } from '../Locations.model';

export interface ILocationResponse {
  data: Array<ILocation>;
  [key: string]: any;
}
