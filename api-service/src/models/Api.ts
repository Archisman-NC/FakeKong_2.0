export type ApiStatus = "active" | "disabled";

export interface Api {
    id:string;

    name:string;
    description?:string;

    baseUrl:string;

    organizationId:string;
    createdBy:string;

    status:ApiStatus;

    createdAt:Date;
}

export interface CreateApiInput{
    name:string;
    description?:string;
    baseUrl:string;
}

export interface ApiResponse{
    id:string;
    name:string;
    
    description?:string;
    baseUrl:string;
    organizationId: string;
    
    status:ApiStatus;

    createdAt:Date;
}