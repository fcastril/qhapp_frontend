export class ProfileOptionModel {
  constructor(
    public idProfileOption: number = 0,
    public idProfile: number = 0,
    public codeOption: string = "",
    public access: boolean = true,
    public addReg: boolean = true,
    public edit: boolean = true,
    public deleteReg: boolean = true,
    public exportReg: boolean = true
  ) {}
}
