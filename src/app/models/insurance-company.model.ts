
export class InsuranceCompanyModel {
    constructor(public idInsuranceCompany: number = 0, 
                public idTypeDocument: number = 0,
                public documentInsuranceCompany: string = '',
                public dvinsuranceCompany: string = '',
                public nameInsuranceCompany: string = '',
                public idTypeTaxpayer: number = 0,
                public codeInsuranceCompany: string = '',
                public codeContract: string = '',
                public idCity: number = 0,
                public addressInsuranceCompany: string = '',
                public contactInsuranceCompany: string = '',
                public telephoneContact: string = '',
                public emailContact: string = '',
                public cellPhoneContact: string = '',
                public active: boolean = false,
                public idTypePayment: number = 0,
                public contactBilling: string = '',
                public addressBilling: string = '',
                public emailBilling: string = '',
                public idCityBilling: number = 0){}
}