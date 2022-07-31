import { SIIGOFERequestModel } from "./SIIGOFERequest.model";
import { ProductBasicModel } from "./product-basic.model";
import { environment } from "../../environments/environment";

export class SIIGOFEProductRequestModel extends SIIGOFERequestModel {
  public productBasic: ProductBasicModel = new ProductBasicModel();
}
