export class AppointmentRecordModel {
    constructor(
        public colorStatusAppointment: string='',
        public dateTimeInitial: Date = new Date(),
        public dateTimeFinal: Date = new Date(),
        public dateTimeInitial_: string = '',
        public dateTimeFinal_: string = '',
        public documenUser: string = '',
        public documentPatient: string  = '',
        public firstNameUser: string = '',
        public fullName: string = '',
        public idAppointmentRecord: number = 0,
        public idPatient: number = 0,
        public idReasonAppointment: number = 0,
        public idStatusAppointment: number = 0,
        public idTypeAgenda: number = 0,
        public idUser: number = 0,
        public observation: string = '',
        public reasonAppointment: string = '',
        public statusAppointment: string = '',
        public typeAgenda: string = '',
        public price: number = 0){}
}