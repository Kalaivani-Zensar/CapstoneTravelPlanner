export class Itinerary {
    id: number
    tripId: number;
    title: string;
    activity: string;

    constructor(id: number, tripId: number, title: string, activity: string) {
        this.id = id;
        this.tripId = tripId;
        this.title = title;
        this.activity = activity;
    }
}