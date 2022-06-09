export class AdverseEventModel {
    idAdverseEvent: number;
    idPatient: number;
    dateRegistration: Date;
    eventDescription: string;
    physicalExamination: string;
    answers: string;
    definition: string;
    correction: string;

    constructor() {
        this.idAdverseEvent = 0;
        this.eventDescription = '';
        this.physicalExamination = '';
        this.definition = '';
    }
}

export class AnswerModel {
    Fisicas: boolean;
    Administrativas: boolean;
    Humanas: boolean;
    Naturales: boolean;
    Otras: boolean;

    TareasTecnologia: boolean;
    Individuo: boolean;
    Colectivo: boolean;
    Paciente: boolean;
    MedioAmbiente: boolean;
    Organizacional: boolean;

    Prevenible: boolean;
    NoPrevenible: boolean;
    Incidente: boolean;
    NoClasificado: boolean;

    constructor() {
        this.Fisicas = false;
        this.Administrativas = false;
        this.Humanas = false;
        this.Naturales = false;
        this.Otras = false;

        this.TareasTecnologia = false;
        this.Individuo = false;
        this.Colectivo = false;
        this.Paciente = false;
        this.MedioAmbiente = false;
        this. Organizacional = false;

        this.Prevenible = false;
        this.NoPrevenible = false;
        this.Incidente = false;
        this.NoClasificado = false;
    }
}