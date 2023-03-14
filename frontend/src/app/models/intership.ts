import { User } from "./user";

export class Internship {
    id!: number;
    title!: string;
    description!: string;
    department!: string;
    duration!: string;
    employmentType!: string;
    employmentLocation!: string;
    startDate!: string;
    endDate!: string;
    remunerationAmt!: string;
    enabled!: boolean;
    assigned!: boolean;
    author!: User;
}
