
export interface VariantsNameResponse{
    count : number;
    pages: number;
    data: VariantName[];
}

export interface VariantName{
    id: string;
    name: string;
}

