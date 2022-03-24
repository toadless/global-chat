import { Request, Response } from "express";
import parseUser from "../../utils/parseUser";
import serverResponse from "../../utils/serverResponse";

export default function me(req: Request, res: Response) {
    if ((req as any).user) return res.status(200).send(serverResponse(200, "OK", parseUser((req as any).user)));
    res.status(401).send(serverResponse(401, "unauthorized"));
}