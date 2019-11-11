export class Event{
    id: String;
    name: String;
    eventCode: number;
    location: String;
    active: boolean;
    startDate: String;
    endDate: String;
    entryDate: String;
    modifyDate: String;

    constructor(id, name, eventCode, location, active, startDate, endDate, entryDate, modifyDate){
        this.id = id;
        this.name = name;
        this.eventCode = eventCode;
        this.location = location;
        this.active = active;
        this.startDate = startDate;
        this.endDate = endDate;
        this.entryDate = entryDate;
        this.modifyDate = modifyDate;
    }
}