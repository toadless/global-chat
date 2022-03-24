import { Request, Response } from "express";

import bcrypt from "bcrypt";

import User from "../../models/user";
import generateAccessToken from "../../auth/generateAccessToken";
import generateRefreshToken from "../../auth/generateRefreshToken";
import serverResponse from "../../utils/serverResponse";
import parseUser from "../../utils/parseUser";

export default async function login(req: Request, res: Response) {
    if ((req as any).user) res.status(200).send(serverResponse(200, "OK", { user: (req as any).user }));

    const body = req.body;

    const user = await User.findOne({ email: body.email });
    if (!user) return res.status(500).send(serverResponse(500, "An account with that email does not exist."))

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) return res.status(500).send(serverResponse(500, "Incorrect password."))

    const id = { _id: user.id };

    const accessToken = generateAccessToken(id);
    const refreshToken = generateRefreshToken(id);

    res.cookie("access-token", accessToken.token, { httpOnly: true });
    res.cookie("refresh-token", refreshToken.token, { httpOnly: true });

    user.refreshTokens = [...(user as any).refreshTokens, { tokenJti: refreshToken.payloadHash }];
    await user.save();

    res.status(200).send(serverResponse(200, "OK", parseUser(user)));
}