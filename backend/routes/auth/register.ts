import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../../models/user";
import serverResponse from "../../utils/serverResponse";

export default async function register(req: Request, res: Response) {
    const body = req.body;

    if ((req as any).user) res.status(200).send(serverResponse(200, "OK", { user: (req as any).user }));

    const findByEmail = await User.findOne({ email: body.email });
    if (findByEmail) res.status(500).send(serverResponse(500, "An account with that email already exists."));

    const findByUsername = await User.findOne({ username: body.username });
    if (findByUsername) res.status(500).send(serverResponse(500, "An account with that username already exists."));

    const hashedPassword = await bcrypt.hash(body.password, 12);

    const user = await User.create({
        email: body.email,
        username: body.username,
        password: hashedPassword,

        creationDate: new Date(),
        lastUpdated: new Date(),
    });

    return res.status(200).send(serverResponse(200, "OK", { user }));
}