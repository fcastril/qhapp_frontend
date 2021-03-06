export class UserModel {
    constructor(public idUser: number =0,
                public idTypeDocument: number = 0,
                public documenUser: string = '',
                public firstNameUser: string = '',
                public secondNameUser: string = '',
                public lastFirstNameUser: string = '',
                public lastSecondNameUser: string = '',
                public idGender: number = 0,
                public dateBirth: Date = new Date(),
                public emailUser: string = '',
                public idCity: number = 0,
                public addressUser: string = '',
                public cellPhoneUser: string = '',
                public medicalRegistry: string = '',
                public attendPatients: boolean = false,
                public idProfile: number = 0,
                public pictureUser: string = '',
                public signature: string = '',
                public username: string = '',
                public password: string = '',
                public active: boolean = false,){}
}