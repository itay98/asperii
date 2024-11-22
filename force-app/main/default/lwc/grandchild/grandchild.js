import { LightningElement } from 'lwc';

export default class Grandchild extends LightningElement {
    add(){
        this.dispatchEvent(new CustomEvent('add'));
    }
}