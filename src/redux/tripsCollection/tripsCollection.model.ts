import { IActivity } from '../../models/Activity.model';
import { ISnap } from '../../models/Snap.model';
import type { ITrip } from '../../models/Trip.model';

export interface ITripCollectionItem {
  trip: ITrip,
  activities: IActivity[],
  snaps: ISnap[],
  activated: boolean
}

export interface ITripCollection {
  trips: ITripCollectionItem[]
}
