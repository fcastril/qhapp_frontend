export class HeaderMeasureControlModel {
    idHeaderMeasureControl: number;
    idTypeMeasure: number;
    dateInitial: Date;
    state: boolean;
    idPatient: number;

    constructor(){
        this.idHeaderMeasureControl = 0;
        this.idTypeMeasure = 0;
        this.state = false;
        this.idPatient = 0;
    }
}