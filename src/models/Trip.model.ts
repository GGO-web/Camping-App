import { IBagItem } from './BagItem.model';

import type { ILocation } from './Locations.model';

import { IUser } from './User.model';

export interface ITripPeriod {
  startDate: string;
  endDate: string;
  formatted: string;
}

export interface ITrip {
  userId?: string;
  tripId: string;
  tripName: string;
  selectedLocations: ILocation[];
  teammates: IUser[];
  tripPeriod: ITripPeriod;
  latestLocation?: string;
  latestLocationsList?: ILocation[];
  bagItems: IBagItem[];
  completed?: boolean;
  activated?: boolean;
  [key: string]: any;
}
