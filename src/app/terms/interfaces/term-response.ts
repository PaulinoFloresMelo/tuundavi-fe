import { Variant } from "src/app/variants/interfaces/variant.interface";

export interface TermResponse{
    id: string,
    category: string,
    meaning: string,
    imageUrl: string,
    variants: Variant[];
}
