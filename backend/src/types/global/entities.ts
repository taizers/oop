export type UserType = {
    id: number;
    email: string;
    name: string | null;
    role: string;
    avatar: string | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
};

export type CompanyType = {
    id: number;
    name: string;
    age: string;
    location: string;
    scope: string;
    ceo: string;
    avatar: string | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
};

export type EmployeeType = {
    id: number;
    name: string;
    age: string;
    education: string;
    courses: string;
    foreign_level: string;
    adress: string;
    company_id: number;
    avatar: string | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
};