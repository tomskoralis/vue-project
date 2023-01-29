import type { Location } from "../types/Location";

export interface Character {
    id: number;
    name: string;
    species: string;
    gender: "Male" | "Female" | "unknown";
    location: Location;
    status: "Alive" | "Dead" | "unknown";
    image: string;
};