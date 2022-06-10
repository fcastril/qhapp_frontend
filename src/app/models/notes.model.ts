export class NotesModel {
    idNote: number;
    registrationDate: Date;
    note: string;
    idPatient: number;

    /**
     *
     */
    constructor() {
        this.idNote = 0;
        this.note = '';
        this.idPatient = 0;
    }
}