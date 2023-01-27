import { Provider } from "../../domain/provider.js";
import { Hotel } from "../../domain/hotel.js";
import { SearchFilter } from "../../domain/search-filter.js";
import { FlatRentSdk } from "../../../flat-rent-sdk.js";
import { HotelListResponse, HotelResponse } from "../flatRent/response.js";

const sdkFlatRentSdk = new FlatRentSdk();

export class FlatRentProvider implements Provider {
  public static provider = "flat-rent";

  public async find(filter: SearchFilter): Promise<Hotel[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await sdkFlatRentSdk.search(filter);
    this.assertIsValidResponse(response);
    return this.convertHotelListResponse(response);
  }
  public async getById(id: string): Promise<Hotel> {
    const response: HotelResponse = await sdkFlatRentSdk.get(id);
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

  private convertHotelListResponse(response: HotelListResponse[]): Hotel[] {
    return response.map((item) => {
      return this.convertHotelResponse(item);
    });
  }

  private convertHotelResponse(item): Hotel {
    return new Hotel(
      FlatRentProvider.provider,
      String(item.id),
      item.title,
      item.details,
      item.photos[0],
      item.totalPrice,
      4
    );
  }
}
