export class TreatmentDetailModel {
    idTreatmentDetail: number;
    idTreatmentHeader: number;
    idDiagnostic: number;
    idTypeMeasure: number;
    dateTreatmentDetail: Date;
    sistolica: number;
    diastolica: number;
    heartRate: number;
    evolutionRegister: string;
    pending: string;
    diagnosticComments: string;
    periodicity: number;
    idUserLogin: number;

    constructor(){
        this.idTreatmentDetail = 0;
        this.idDiagnostic = 0;
        this.idTypeMeasure = 0;
        this.dateTreatmentDetail = new Date();
        this.sistolica = 0;
        this.diastolica = 0;
        this.heartRate = 0;
        this.evolutionRegister = '';
        this.pending = '';
        this.diagnosticComments = '';
        this.periodicity = 0;
    }
}

