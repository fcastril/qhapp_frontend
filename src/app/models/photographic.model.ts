export class PhotographicModel {
    idPhotographicEvolution: number;
    dateRegistration: Date;
    namePhotographic: string;
    idReasonsAppointment: number;
    image: string;
    description: string;
    idPatient: number;

    /**
     *
     */
    constructor() {
        this.idPhotographicEvolution = 0;
        this.namePhotographic = '';
        this.idReasonsAppointment = 0;
        this.image = '';
        this.description = '';
        this.idPatient = 0;
    }
}