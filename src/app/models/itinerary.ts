export class Itinerary {
    id: number
    tripId: number;
    title: string;
    activities: string[];

    constructor(id: number, tripId: number, title: string, activities: string[]) {
        this.id = id;
        this.tripId = tripId;
        this.title = title;
        this.activities = activities;
    }
}