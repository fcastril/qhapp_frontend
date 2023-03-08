import { CustomerBasicModel } from "./customer-basic.model";
import { SIIGOFERequestModel } from './siigofeRequest.model';

export class SIIGOFECustomerRequestModel extends SIIGOFERequestModel {
  public customerBasic: CustomerBasicModel = new CustomerBasicModel();
}
