export class TypeMovementModel {
    constructor(public idTypeMovement: number = 0,
                public codeTypeMovement: string = '',
                public descriptionTypeMovement: string = '',
                public option: string = '',
                public consecutive: number = 0,
                public multiplier: number = 0,
                public isAffectCost: boolean = false,
                public isIVA: boolean = false,
                public resolutionDIAN: string = '',
                public dateResolutionDIAN: Date = new Date(),
                public initialResolutionDIAN: number = 0,
                public finalResolutionDIAN: number = 0,
                public prefix: string = ''){}
}