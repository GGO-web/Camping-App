import { IBagItem } from '../BagItem.model';

export interface IAddBagItemRequest {
  tripId: string;
  bagItem: IBagItem
}
