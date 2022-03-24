import { Request, Response } from "express";
import checkToken from "../../auth/checkToken";

import User from "../../models/user";

export default async function logout(req: Request, res: Response) {
    if (!(req as any).user) return false;

    const refreshToken = req.cookies["refresh-token"];

    res.clearCookie("access-token");
    res.clearCookie("refresh-token");

    const user = await User.findOne({ _id: (req as any).user._id });

    if (user) {
        const token = checkToken(refreshToken);
        if (!token) return false;

        user.refreshTokens = user.refreshTokens.filter(tkn => tkn.tokenJti != (token as any).jti);
        await user.save();
    }

    return true;
}