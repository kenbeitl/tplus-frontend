export interface User {}

export interface UserFormData {
    firstName?: string;
    lastName?: string;
    companyName?: string;
    email?: string;
    password?: string;
}

export const userServices = {    
    update: async (id: string | number, data: Partial<UserFormData>): Promise<User> => {
        return {};
    }
}