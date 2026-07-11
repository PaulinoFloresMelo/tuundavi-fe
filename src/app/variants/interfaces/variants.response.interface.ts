import { Variant } from "./variant.interface";

export interface VariantResponse{
    count : number;
    pages: number;
    data: Variant[];
}