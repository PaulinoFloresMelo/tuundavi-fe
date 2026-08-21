
export interface LocalitiesByMunicipalityId{
    id: number;
    name: string;
    localities: Locality[];
}

export interface Locality{
    id: string;
    name: string;
}