import { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
    res.send("hello")
};
export const createProduct = async (req: Request, res: Response) => {};