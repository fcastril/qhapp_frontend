export class MovementsDetailModel{
    idMovementDetail: number;
    idMovement: number;
    idProduct: number;
    idWarehouse: number;
    quantity: number;
    value: number;
    taxAdd: number;
    discount: number;
    taxDiscount: number;
    idUen: number;

    constructor(){
        this.idMovementDetail = 0;
        this.idMovement = 0;
        this.idProduct = 0;
        this.idWarehouse = 0;
        this.quantity = 1;
        this.value = 0;
        this.taxAdd = 0;
        this.discount = 0;
        this.taxDiscount = 0;
        this.idUen = 0;
    }
}