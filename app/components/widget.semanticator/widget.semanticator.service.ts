import {Injectable} from "angular2/core";

@Injectable()
export class WidgetSemanticatorService {
    enitities : Array<any>;
    tags : Array<string>;
    taxonomy : Array<string>;

    constructor() {
        this.enitities = [
            {type:'Company', value :  'Apple'},
            {type:'FieldTerminology', value :  'tech company'},
            {type:'Person', value :  'Tim Cook'}
        ];
        this.tags = ['Apple', 'large multinational companies', 'European Commission officials', 'Apple chief executive'];
        this.taxonomy = ['technology and computing', 'portable computer', 'hardware', 'portable computer'];
    }

    getEnitities() {
        return  this.enitities;
    }

    getTags() {
        return  this.tags;
    }

    getTaxonomy() {
        return  this.taxonomy;
    }
}
