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
  id: number;
  name: string;
  description: string;
  image: string;
  remoteness: number;
  price: number;
  bookedDates: [];
}
