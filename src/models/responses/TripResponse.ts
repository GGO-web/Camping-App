import { IBagItem } from '../BagItem.model';
import { ILocation } from '../Locations.model';
import { ITeammate } from '../Teammate.model';

import { ITripPeriod } from '../Trip.model';

export interface ITripResponse {
  _id?: string;
  userId?: string;
  tripName: string;
  locations: ILocation[];
  teammates: ITeammate[];
  tripPeriod: ITripPeriod;
  bagItems: IBagItem[];
  completed?: boolean;
  activated?: boolean;
  [key: string]: any;
}
