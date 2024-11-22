public without sharing class GrandchildrenCtrl {
    @AuraEnabled
    public static Account getData(Id accountId){
        return [SELECT Grandchildren__c, (SELECT Name FROM Contacts) FROM Account WHERE Id=:accountId];
    }
}