import { environment } from "../../environments/environment";
export class SIIGOFERequestModel {
  constructor(
    public username: string = environment.Username,
    public access_key: string = environment.AccessKey,
    public uri: string = environment.urlSIIGOFE
  ) {}
}
