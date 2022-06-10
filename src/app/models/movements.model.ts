export class MovementModel{
    idMovement: number;
    idTypeMovement: number;
    consecutive: number;
    docReferen: string;
    dateMovement: Date;
    expireMovemente: Date;
    idTypePayment: number;
    idSeller: number;
    idCustomer: number;
    docCustomer: string;
    nameCustomer: string;
    multiplier: number;
    canceled: boolean;
    notes: string;
    idUserNew: number;
    dateTimeNew: Date;
    idUserUpdated: number;
    dateTimeUpdated: Date;
    idUserCanceled: number;
    dateTimeCanceled: Date;
    idTypePriceList: number;
    idReasonMovement: number;

    constructor(){
        this.idMovement = 0;
        this.idTypeMovement = 0;
        this.consecutive = 0;
        this.docReferen = '';
        this.idTypePayment = 0;
        this.idSeller = 0;
        this.idCustomer = 0;
        this.docCustomer = '';
        this.nameCustomer = '';
        this.multiplier = 0;
        this.canceled = false;
        this.notes = '';
        this.idUserNew = 0;
        this.idUserUpdated = 0;
        this.idUserCanceled = 0;
        this.dateMovement = new Date();
        this.idTypePriceList = 0;
        this.idReasonMovement = 0;
    }
}
