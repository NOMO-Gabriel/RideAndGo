export type PersonalInfoType = {
    id: string;
    personnalInfos: {
        name: string;
        surname: string;
        phoneNumber: string;
        pseudo: string;
        email: string;
        birthday: string;
        gender: 'MALE' | 'FEMALE';
    };
    avatar?: string;
};

export const mockPersonalInfo: PersonalInfoType = {
    id: "1",
    personnalInfos: {
        name: "Dupont",
        surname: "Jean",
        phoneNumber: "+33 6 12 34 56 78",
        pseudo: "jdupont",
        email: "jean.dupont@example.com",
        birthday: "1990-05-15",
        gender: "MALE"
    },
    avatar: "/default-avatar.png"
};