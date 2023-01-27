import {
  HotelListResponse,
  HotelResponse,
} from "../scripts/store/providers/flatRent/response.js";
import { SearchFilter } from "../scripts/store/domain/search-filter.js";

export class FlatRentSdk {
  book(flatId: string, checkInDateFlatRent: Date, checkOutDateFlatRent: Date);
  search(parameters: SearchFilter): HotelListResponse;
  get(id: string): HotelResponse;
}
