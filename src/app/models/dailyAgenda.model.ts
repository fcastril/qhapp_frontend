export class DailyAgendaModel {
    typeAgenda: string;
    idAppointmentRecord: number;
    dateTimeInitial: Date;
    idPatient: number;
    documentPatient: number;
    fullName: string;
    colorStatusAppointment: string;
    statusAppointment1: string;
    observation: string;
    price: number;

    constructor() {
        this.typeAgenda = '';
        this.idAppointmentRecord = 0;
        this.idPatient = 0;
        this.documentPatient = 0;
        this.fullName = '';
        this.statusAppointment1 = '';
        this.colorStatusAppointment = '';
        this.observation = '';
        this.price = 0;
    }
}