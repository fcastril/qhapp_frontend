export class UploadItem{
    public idUpload: number;
    public idPart: number;
    public idSubPart: number;
    public documentName: string;
    public route: string;

    constructor(  ){
        this.idUpload = 0;
        this.idPart = 0;
        this.idSubPart = 0;
        this.documentName = '';
        this.route = '';
    }
}
