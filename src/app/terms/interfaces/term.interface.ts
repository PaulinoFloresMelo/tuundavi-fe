import { User } from "@/auth/interfaces/user.interface";

export interface TermsResponse{
    count : number;
    pages: number;
    terms: Term[];
}

export interface Term{
    id: string;
    content: string;
    category: Category;
    imageUrl: string;
    user: User;
    example: string[];
}

export interface Category{
    adverb: string;
    animal: string;
    color: string;
    dayOfTheWeek: string;
    frequentVerb: string;
    numberFromOneToHundred: string;
    schoolObject: string;
    agriculture: string;
    mood: string;
    familyAndPeople: string;
    fruitsAndVegetables: string;
    householdObjects: string;
    personalPronouns: string;
    weatherAndSeasonsOfTheYear: string;
    foodAndDrink: string;
}
