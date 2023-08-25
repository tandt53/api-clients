export interface Pet {
    id: string;
    name: string;
    category: {
        id: string;
        name: string;
    },
    photoUrls: string[];
    tags: [{
        id: string;
        name: string;
    }],
    status: string;
}
