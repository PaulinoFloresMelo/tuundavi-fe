import { User } from "@/auth/interfaces/user.interface";

export interface TermsResponse{
    count : number;
    pages: number;
    terms: Term[];
    category: string;
}

export interface Term{
    id: string;
    content: string;
    meaning: string;
    category: string;
    translationExample: string
    imageUrl: string;
    audioUrl: string;
    userId?: number;
    user: {
        id: string;
        username: string;
        paternalName: string;
        maternalName: string;
    },
    variant:{
        id: number,
        name: string,
        description: string;
        localityName: string;
    }
    example: string[];
}

