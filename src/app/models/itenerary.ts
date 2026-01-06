export class Itenerary {
    id: number;
    title: string;
    location: string;
    activities: string[];

    constructor(
        id: number,
        title: string,
        location: string,
        activities: string[]
    ) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.activities = activities;
    }
}