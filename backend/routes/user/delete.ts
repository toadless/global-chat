import { Request, Response } from "express";

import bcrypt from "bcrypt";

import User from "../../models/user";
import serverResponse from "../../utils/serverResponse";

export default async function deleteAccount(req: Request, res: Response) {
    const body = req.body;

    const user = await User.findOne({ email: body.email, username: body.username });
    if (!user) return res.status(401).send(serverResponse(200, "Cannot find account"));

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) return res.status(401).send(serverResponse(200, "Incorrect password"));

    res.clearCookie("access-token");
    res.clearCookie("refresh-token");

    await User.deleteOne({ email: body.email });

    return res.status(200).send(serverResponse(200, "Account deleted", {
        deleted: true,
    }));
}