export class TreatmentDetailLaserModel {
    idTreatmentDetailLaser: number;
    idTreatmentHeader: number;
    dateTreatmentLaser: Date;
    skinType: number;
    jcm: number;
    pulseDuration: number;
    pulseNumber: number;
    laserObservation: string;
    idUserLogin: number;

    constructor(){
        this.idTreatmentDetailLaser = 0;
        this.dateTreatmentLaser = new Date();
        this.skinType = 0;
        this.jcm = 0;
        this.pulseDuration = 0;
        this.pulseNumber = 0;
        this.laserObservation = '';
    }
}