import type { ITrip } from '../../models/Trip.model';

export interface ITripCollectionItem {
  trip: ITrip,
  activated: boolean
}

export interface ITripCollection {
  trips: ITripCollectionItem[]
}
