import { ThemeService } from "ng2-charts";

export class AddNoteModel {
    idAddNote: number;
    nameNote: string;
    descriptionNote: string;

    constructor() {
        this.idAddNote = 0;
        this.nameNote = '';
        this.descriptionNote = '';
    }
}