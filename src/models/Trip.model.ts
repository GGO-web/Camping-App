import type { ITeamMate } from '../screens/NewTrip/NewTrip.model';
import type { ILocation } from './Locations.model';

export interface ITripPeriod {
  startDate: string,
  endDate: string,
  formatted: string
}

export interface ITrip {
  tripName: string;
  selectedLocations: ILocation[];
  teammates: ITeamMate[];
  tripPeriod: ITripPeriod;
  latestLocation?: string;
  latestLocationsList?: ILocation[];
  bagItems: string[]
}
