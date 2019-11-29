export interface User {
    uid: string;
    email?: string | null;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    displayName?: string;
    photo?: File;
}