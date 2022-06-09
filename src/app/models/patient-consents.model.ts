export class PatientConsentModel {

    constructor(public idPatientConsent: number = 0,
                public idPatient: number = 0,
                public dateSignature: Date = new Date(),
                public nameConsent: string = '',
                public descriptionConsent: string = '',
                public signature: string = '') {
    }
}