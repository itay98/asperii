import { LightningElement, api } from 'lwc';
import { updateRecord } from "lightning/uiRecordApi";
import getData from '@salesforce/apex/GrandchildrenCtrl.getData';
const recordInput = { fields: {} };
export default class Grandparent extends LightningElement {
    @api recordId;
    grandchildren;
    parent1Name;
    parent2Name;
    cannotHaveGrandchildren = ' ';
    isMarried;

    connectedCallback() {
        getData({ accountId: this.recordId })
            .then(data => {
                this.grandchildren = data.Grandchildren__c;
                this.isMarried = this.grandchildren != undefined;
                this.cannotHaveGrandchildren = data.Contacts?.length == 2 ? '' : 'Sorry, but this account cannot have grandchildren at this time';
                if (!this.cannotHaveGrandchildren) {
                    this.parent1Name = data.Contacts[0].Name;
                    this.parent2Name = data.Contacts[1].Name;
                }
            })
            .catch(error => console.log(error));
        recordInput.fields.Id = this.recordId;
    }
    connect() {
        this.update(this.grandchildren = 0);
        this.isMarried = true;
    }
    incrementGrandchildren() {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(this.update, 400, ++this.grandchildren);
    }
    update(gc) {
        recordInput.fields.Grandchildren__c = gc;
        updateRecord(recordInput).catch(error => console.log(error));
    }
}