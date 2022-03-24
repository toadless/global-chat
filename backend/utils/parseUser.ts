import { User } from "../models/user"

export type user = {
    id: number,
    username: string,
    email: string,
    creationDate: Date,
    lastUpdated: Date
}

export default function parseUser(user: User): user {
    return {
        id: (user as any)._id,
        username: user.username,
        email: user.email,
        creationDate: user.creationDate,
        lastUpdated: user.lastUpdated,
    }
}