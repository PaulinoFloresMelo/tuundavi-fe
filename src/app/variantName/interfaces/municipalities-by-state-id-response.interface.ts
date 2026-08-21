
export interface MunicipalitiesByStateId{
    id: number;
    name: string;
    municipalities: Municipality[];
}

export interface Municipality{
    id: string;
    name: string;
}

