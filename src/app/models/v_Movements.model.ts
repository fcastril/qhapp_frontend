export class ViewMovementsModel{
    idMovement: number;
    consecutive: number;
    dateMovement: Date;
    expireMovemente: Date;
    notes: string;
    canceled: boolean;
    idCustomer: number;
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
