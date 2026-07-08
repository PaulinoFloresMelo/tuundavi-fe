import { User } from "@/auth/interfaces/user.interface";

export interface TermsResponse{
    count : number;
    pages: number;
    terms: Term[];
}

export interface Term{
    id: string;
    content: string;
    category: string;
    imageUrl: string;
    audioUrl: string;
    userId?: number;
    user: {
        id: string,
        username: string;
    };
    example: string[];
}

