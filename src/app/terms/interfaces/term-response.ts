import { Variant } from "src/app/variants/interfaces/variant.interface";

export interface TermResponse{
    id: string,
    category: string,
    meaning: string,
    imageUrl: string,
    variants: Variant[],
    terms: TermNahuatl[];
}

interface TermNahuatl {
    audioUrl: string,
    content: string,
    createdAt: string,
    email: string,
    example: string,
    id: string,
    isActive: true,
    localityId: string,
    locality: {
        id: string,
        municipalityId: string,
        name: string
    }
    meaningId: string,
    municipalityId: string,
    stateId: string,
    translationExample: string,
    updatedAt: string,
    variantId: number
}
