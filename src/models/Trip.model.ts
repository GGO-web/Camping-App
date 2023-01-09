import { IBagItem } from './BagItem.model';
import type { ILocation } from './Locations.model';
import { ITeamMate } from './Teammate.model';

export interface ITripPeriod {
  startDate: string,
  endDate: string,
  formatted: string
}

export interface ITrip {
  tripId: string;
  tripName: string;
  selectedLocations: ILocation[];
  teammates: ITeamMate[];
  tripPeriod: ITripPeriod;
  latestLocation?: string;
  latestLocationsList?: ILocation[];
  bagItems: IBagItem[],
}
