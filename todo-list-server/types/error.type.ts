export type Error = {
    status: number;
    message: string;
}

export type ValidationError = { 
    path: string; 
    message: string; 
}