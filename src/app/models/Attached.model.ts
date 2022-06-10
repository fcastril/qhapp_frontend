export class AttachedModel {
    idAttachedDocument: number;
    dateRegistration: Date;
    nameDocument: string;
    document: string;
    description: string;
    idPatient: number;

    constructor() {
        this.idAttachedDocument = 0;
        this.nameDocument = '';
        this.document = '';
        this.description = '';
        this.idPatient = 0;
    }
}