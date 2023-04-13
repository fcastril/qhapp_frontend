export class ViewMovementsModel{
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

    documentCustomer: string;
    fullNameCustomer: string;
    codeTypeMovement: string;
    descriptionTypeMovement: string;
    codeTypePayment: string;
    descriptionTypePayment: string;
    option: string;
    quantity: number;
    valorBruto: number;
    valorImpuesto: number;
    valorDescuento: number;
    valorTotal: number;
}
