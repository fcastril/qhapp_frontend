export class PqrModel {
    public idPqr: number;
    public contactPqr: string;
    public emailPqr: string;
    public cellPhonePqr: string;
    public subject: string;
    public typePqr: number;
    public body: string;
    public answer: string;
    public dateTimePQR: Date;

    constructor() {
        this.idPqr=0;
        this.contactPqr='';
        this.emailPqr='';
        this.cellPhonePqr='';
        this.subject='';
        this.typePqr=0;
        this.answer='';
        this.body='';
        this.dateTimePQR= new Date();
    }
}
