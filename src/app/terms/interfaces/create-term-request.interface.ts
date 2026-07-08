import { Term } from "./term.interface";

export interface CreateTermRequest {
    term: Partial<Term>;
    imageFile: FileList | undefined;
    audioFile: File | null;
    userId: number
}