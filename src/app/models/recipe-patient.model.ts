export class RecipePatientModel{
    idRecipePatient: number;
    idPatient: number;
    dateRecipe: Date;
    descriptionRecipe: string;

    constructor(){
        this.idRecipePatient = 0;
        this.idPatient = 0;
        this.descriptionRecipe = '';
    }
}