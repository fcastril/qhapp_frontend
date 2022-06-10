export class ViewMovementsModel{
    idMovement: number;
    consecutive: number;
    dateMovement: Date;
    notes: string;
    canceled: boolean;
    idCustomer: number;
    codeTypeMovement: string;
    descriptionTypeMovement: string;
    option: string;
    quantity: number;
    valorBruto: number;
    valorImpuesto: number;
    valorDescuento: number;
    valorTotal: number; 
}