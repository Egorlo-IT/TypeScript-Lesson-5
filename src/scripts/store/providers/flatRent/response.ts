/**
 * Ответ с несколькими отелями
 */
export interface HotelListResponse {
  errorMessage?: string;
  items: HotelItem[];
}
/**
 * Ответ с одним отелем
 *  */
export interface HotelResponse {
  errorMessage?: string;
  item: HotelItem;
}

export interface HotelItem {
  id: string;
  title: string;
  details: string;
  photos: string;
  price: number;
  bookedDates: [];
  coordinates: [];
  remoteness: number;
}
