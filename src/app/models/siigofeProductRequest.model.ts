import { ProductBasicModel } from "./product-basic.model";
import { SIIGOFERequestModel } from './siigofeRequest.model';

export class SIIGOFEProductRequestModel extends SIIGOFERequestModel {
  public productBasic: ProductBasicModel = new ProductBasicModel();
}
