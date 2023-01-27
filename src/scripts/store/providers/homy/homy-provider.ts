import { Provider } from "../../domain/provider.js";
import { Hotel } from "../../domain/hotel.js";
import { HttpHelper } from "../../utils/http-helper.js";
import { SearchFilter } from "../../domain/search-filter.js";
import { HotelListResponse, HotelResponse } from "../homy/response.js";

export class HomyProvider implements Provider {
  public static provider = "homy";
  private static apiUrl = "http://localhost:3030";

  public async find(filter: SearchFilter): Promise<Hotel[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await HttpHelper.fetchAsJson<HotelListResponse>(
      HomyProvider.apiUrl +
        "/places?" +
        // создадим соответствующую строку запроса из объекта фильтра
        this.convertFilterToQueryString(filter)
    );
    // проверим, что с ответ корректный
    this.assertIsValidResponse(response);
    return this.convertHotelListResponse(response);
  }

  public async getById(id: string): Promise<Hotel> {
    const response: HotelResponse = await HttpHelper.fetchAsJson<HotelResponse>(
      HomyProvider.apiUrl + "/hotel/" + id
    );
    // проверим, что с ответ корректный
    this.assertIsValidResponse(response);
    return this.convertHotelResponse(response.item);
  }

  private assertIsValidResponse(
    response: HotelResponse | HotelListResponse
  ): void {
    if (response.errorMessage != null) {
      throw new Error(response.errorMessage);
    }
  }

  private convertFilterToQueryString(filter: SearchFilter): string {
    return (
      `coordinates=${filter.coordinates}` +
      `&checkInDate=${filter.checkInDate.getTime()}` +
      `&checkOutDate=${filter.checkOutDate.getTime()}` +
      `&maxPrice=${filter.priceLimit}`
    );
  }

  private convertHotelListResponse(response: HotelListResponse[]): Hotel[] {
    return response.map((item) => {
      return this.convertHotelResponse(item);
    });
  }
  /**
   * Здесь находится логика преобразования объекта отеля из источника
   * в экземпляр Order нашего приложения
   */
  private convertHotelResponse(item): Hotel {
    return new Hotel(
      HomyProvider.provider,
      String(item.id),
      item.name,
      item.description,
      item.image,
      item.price,
      item.remoteness
    );
  }
}
