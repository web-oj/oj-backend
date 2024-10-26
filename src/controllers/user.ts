/**
 * @file user.ts
 * @summary User controller class.
 * @description This file contains function(s) which call our respective service(s) to get the data.
 * @function
 *          - addUser()
 *          - deleteUser()
 *          - getUserById()
 *          - getUsers()
 *          - updateUser()
 *          - login()
 *          - logout()
 * @return Express JSON Response
 */

import { Request, Response } from "express";
import keccak256 from "keccak256";
import Database from "../services/Database";
import { sign } from "jsonwebtoken";
import "dotenv/config";

export class UserController {
  public static async addUser(req: Request, res: Response) {
    let body = req.body;
    body.password = keccak256(body.password).toString("hex");

    await Database.queryAddUser(
      body.userName,
      body.email,
      body.password,
      body.role,
    )
      .then(() => {
        return res.status(201).send({
          status: "success",
        });
      })
      .catch((err: Error) => {
        return res.status(500).send({
          status: "error",
          message: `Database query error: ${err}`,
        });
      });
  }

  public static async deleteUser(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);

    await Database.queryDeleteUser(id)
      .then(() => {
        return res.status(200).send({
          status: "success",
        });
      })
      .catch((err: Error) => {
        return res.status(500).send({
          status: "error",
          message: `Database query error: ${err}`,
        });
      });
  }

  public static async getUserById(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);

    await Database.queryGetUserById(id)
      .then((result) => {
        return res.status(200).send({
          status: "success",
          data: JSON.parse(result.toString()),
        });
      })
      .catch((err: Error) => {
        return res.status(500).send({
          status: "error",
          message: `Database query error: ${err}`,
        });
      });
  }

  public static async updateUser(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const body = req.body;

    await Database.queryEditUserAttr(id, body.email, body.password, body.rating)
      .then(() => {
        return res.status(200).send({
          status: "success",
        });
      })
      .catch((err: Error) => {
        return res.status(500).send({
          status: "error",
          message: `Database query error: ${err}`,
        });
      });
  }

  public static async updateUserRole(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const role = req.body.role;

    await Database.queryEditUserAttr(id, null, null, null, role)
      .then(() => {
        return res.status(200).send({
          status: "success",
        });
      })
      .catch((err: Error) => {
        return res.status(500).send({
          status: "error",
          message: `Database query error: ${err}`,
        });
      });
  }

  public static async getUsers(req: Request, res: Response) {
    const body = req.body;

    await Database.queryFindUsers(
      body.userId,
      body.userName,
      body.email,
      body.ratingLow,
      body.ratingHigh,
    )
      .then((result) => {
        if (result.length > 0) {
          return res.status(200).send({
            status: "success",
            results: JSON.parse(result.toString()),
          });
        } else {
          return res.status(404).send({
            status: "error",
            message: "User not found",
          });
        }
      })
      .catch((err: Error) => {
        return res.status(500).send({
          status: "error",
          message: `Database query error: ${err}`,
        });
      });
  }

  public static async login(req: Request, res: Response) {
    const body = req.body;

    await Database.queryFindUsers(null, null, body.email)
      .then(async (result) => {
        if (result === null || result === undefined) {
          return res.status(401).send({
            status: "error",
            message: "Invalid email or password",
          });
        }

        let jsonResult = JSON.parse(result.toString())[0];

        let id = jsonResult.user_id;
        let userInfo = await Database.queryGetUserById(id);

        const success =
          JSON.parse(userInfo)[0].password ===
          keccak256(body.password).toString("hex");
        if (success) {
          const jwt = sign(jsonResult, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
          });
          return res.status(200).send({
            status: "success",
            token: jwt,
          });
        } else {
          return res.status(401).send({
            status: "error",
            message: "Invalid email or password",
          });
        }
      })
      .catch((err: Error) => {
        return res.status(500).send({
          status: "error",
          message: `Database query error: ${err}`,
        });
      });
  }

  public static async logout(req: Request, res: Response) {
    // const token = req.body.token;
    // await Database.queryDeleteToken(token)
    //   .then(() => {
    //     return res.status(200).send({
    //       status: "success",
    //     });
    //   })
    //   .catch((err: Error) => {
    //     return res.status(500).send({
    //       status: "err",
    //       message: `Token not found: ${err}`,
    //     });
    //   });
  }
}
