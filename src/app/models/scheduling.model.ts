export class SchedulingModel {
    constructor(public id: number =0,
                public start: Date = new Date(),
                public end: Date = new Date(),
                public title: string = '',
                public description: string = '',
                public backgroundColor: string = '',
                public borderColor: string = '',
                public textColor: string = '',
                public resourceId: string = ''){}
}