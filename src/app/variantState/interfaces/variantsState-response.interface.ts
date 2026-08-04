
export interface VariantsStateResponse{
    count : number;
    pages: number;
    data: VariantSate[];
}

export interface VariantSate{
    id: string;
    name: string;
}
