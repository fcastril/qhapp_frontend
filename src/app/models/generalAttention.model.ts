import { AnswersModel } from "./answers.model";

export class GeneralAttentionModel {
    idGeneralAttention: number;
    idPatient: number;
    registrationDate: Date;
    lastUpdate: Date;
    idDiscipline: number;
    discipline1: number;
    answers: string;

    /**
     *
     */
    constructor() {
        this.idGeneralAttention = 0;
        this.idPatient = 0;
        this.idDiscipline = 0;
        this.registrationDate = new Date();
        this.lastUpdate = new Date();
        this.answers = '';
    }
}