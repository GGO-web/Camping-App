import { IActivity } from '../../models/Activity.model';
import type { ITrip } from '../../models/Trip.model';

export interface ITripCollectionItem {
  trip: ITrip,
  activities: IActivity[],
  activated: boolean
}

export interface ITripCollection {
  trips: ITripCollectionItem[]
}
