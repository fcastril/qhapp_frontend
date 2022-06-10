export class TreatmentHeaderModel {
    idTreatmentHeader: number;
    idReasonAppointment: number;
    idUser: number;
    idPatient: number;
    numberSessionsAssigned: number;
    numberSessionsAttended: number;
    dateStartAttention: Date;
    dateLastAttention: Date;
    attentionStatus: boolean;

    constructor(){
        this.numberSessionsAssigned = 0;
        this.numberSessionsAttended = 0;
        this.dateStartAttention = new Date();
        this.dateLastAttention = new Date();
        this.attentionStatus = false;
    }
}