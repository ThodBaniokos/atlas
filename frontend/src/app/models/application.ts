import { Grade } from "./grade";
import { Internship } from "./intership";
import { User } from "./user";

export class Application {

    constructor(opts?: Partial<Application>) {
        if (opts?.id != null) {
            this.id = opts.id;
        }
        if (opts?.reasoning != null) {
            this.reasoning = opts.reasoning;
        }
        if (opts?.cancelReasoning != null) {
            this.cancelReasoning = opts.cancelReasoning;
        }
        if (opts?.submitted != null) {
            this.submitted = opts.submitted;
        }
        if (opts?.status != null) {
            this.status = opts.status;
        }
        if (opts?.grades != null) {
            this.grades = new Grade();
            this.grades = opts.grades;
        }
        if (opts?.user != null) {
            this.user = new User();
            this.user = opts.user
        }
        if (opts?.internship != null) {
            this.internship = new Internship();
            this.internship = opts.internship;
        }
        if (opts?.seen != null) {
            this.seen = opts.seen;
        }
    }

    id!: string;
    reasoning!: string;
    cancelReasoning!: string;
    submitted!: boolean;
    status!: string;
    grades!: Grade;
    user!: User;
    internship!: Internship;
    seen!: boolean;
}
