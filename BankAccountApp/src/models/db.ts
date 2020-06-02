import Dexie from 'dexie';

export class AppDatabase extends Dexie {

    users: Dexie.Table<IUser, number>;  // number = type of the primkey


    constructor () {
        super('AppDatabase');
        this.version(1).stores({
            users: '++id, firstName, lastName, userName, password',
        });
        // The following line is needed if your typescript
        // is compiled using babel instead of tsc:
        this.users = this.table('users');
    }
}



interface IUser {
    id?: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
}