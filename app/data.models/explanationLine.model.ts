export class ExplanationLine {
    static TYPE_DEFAULT = 0;
    static TYPE_WARNING = 1;
    static TYPE_FAILURE = 2;
    static TYPE_SUCCESS = 3;

    public text: string;
    public type : number;

    public constructor() {
        this.text="";
        this.type = ExplanationLine.TYPE_DEFAULT;
    }
}
