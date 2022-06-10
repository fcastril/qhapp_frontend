import { environment } from "src/environments/environment";
import { LoginModel } from "../models/login.model";
import { AuthService } from "../services/auth.service";

export abstract class BaseClass {
  isExternal: boolean = false;

  constructor(public authService: AuthService) {}
  
  checkUser() {
    if (!this.authService.isLoggedin()) {
      let userModel: LoginModel = new LoginModel();
      userModel.login = environment.userpatients;
      userModel.password = environment.passworduserpatients;
      this.isExternal = true;
      this.authService.login(userModel).subscribe((resp:any)=>{
        localStorage.setItem("isExternal", this.isExternal ? "true" : "false");
      });
    }
  }
}
