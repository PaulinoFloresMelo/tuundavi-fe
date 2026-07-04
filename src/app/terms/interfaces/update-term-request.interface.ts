import { Term } from "./term.interface";

export interface UpdateTermRequest {
    id: string,
    term: Partial<Term>;
}