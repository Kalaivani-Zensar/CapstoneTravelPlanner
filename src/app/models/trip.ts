export class Trip {
    id: number;
    destination: string;
    startDate: Date;
    endDate: Date;

    constructor(id: number, destination: string, startDate: Date, endDate: Date) {
        this.id = id;
        this.destination = destination;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}