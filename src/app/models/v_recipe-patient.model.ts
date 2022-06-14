export class ViewRecipePatientModel {
  idRecipePatient: number;
  idPatient: number;
  documentPatient: string;
  firstName: string;
  secondName: string;
  lastName: string;
  lastSecondName: string;
  dateRecipe: Date;
  descriptionRecipe: string;

  constructor() {
    this.idRecipePatient = 0;
    this.idPatient = 0;
    this.documentPatient = "";
    this.firstName = "";
    this.secondName = "";
    this.lastName = "";
    this.lastSecondName = "";
    this.descriptionRecipe = "";
  }
}
