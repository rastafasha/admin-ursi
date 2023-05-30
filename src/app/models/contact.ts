export class Contact {
    id: number;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    comment: string;
    status?: 'PENDING' | 'RESOLVED';
}
