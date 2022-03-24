import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import checkToken from "./checkToken";
import generateAccessToken from "./generateAccessToken";
import User from "../models/user";

export default async function setUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
        (req as any).user = null;
        return next();
    }

    let token = checkToken(accessToken);

    if (!token) {
        // If the access token is invalid or expired and they have a refresh token
        // we will "refesh" their access token.

        const refreshToken = req.cookies["refresh-token"];
        if (!refreshToken) {
            (req as any).user = null;
            return next();
        }

        const validRefreshToken = checkToken(refreshToken);
        if (!validRefreshToken) {
            (req as any).user = null;
            return next();
        }

        const user = await User.findOne({ _id: (validRefreshToken as any)._id });
        if (!user) {
            (req as any).user = null;
            return next();
        }

        const refreshTokenJTI = (jwt.decode(refreshToken) as any)!.jti;

        let hasRefreshToken = false;
        user.refreshTokens.map((tkn: { tokenJti: any; }) => {
            if (tkn.tokenJti === refreshTokenJTI) hasRefreshToken = true;
        })
        if (!hasRefreshToken) {
            (req as any).user = null;
            return next();
        }

        const accessToken = generateAccessToken({ where: { _id: user.id } });
        res.cookie("accessToken", accessToken.token, { httpOnly: true, }); // Sending the newly generated access token to the user
        token = checkToken((accessToken.token as string));
    }

    const user = await User.findOne({ _id: (token as any)._id });
    if (!user) {
        (req as any).user = null;
        return next();
    }

    (req as any).user = user;
    return next();
}