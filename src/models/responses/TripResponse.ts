import { IBagItem } from '../BagItem.model';
import { ILocation } from '../Locations.model';

import { ITripPeriod } from '../Trip.model';

import { IUser } from '../User.model';

export interface ITripResponse {
  userId?: string;
  tripId: string;
  tripName: string;
  locations: ILocation[];
  teammates: IUser[];
  tripPeriod: ITripPeriod;
  bagItems: IBagItem[];
  completed?: boolean;
  activated?: boolean;
  [key: string]: any;
}
