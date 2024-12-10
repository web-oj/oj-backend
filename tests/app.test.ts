import request from "supertest";
import { createServer, Server } from "http";
import initApp from "../src/index";
import { mysqlDataSource } from "../src/database/MysqlDataSource";
import { env } from "../src/config/config";
import { ApiResponse, LoginResponse } from "../src/types/types";
import { SubmissionResult } from "../src/entities/SubmissionResult";

describe("App Tests", () => {
    let server: Server;
    let token: string;

    beforeAll(async () => {
        const app = await initApp(); // Initialize the app without starting the server
        server = createServer(app); // Create the HTTP server
        await new Promise<void>((resolve) => server.listen(3000, resolve)); // Start the server
        await mysqlDataSource.dropDatabase();
        await mysqlDataSource.synchronize();
    }, 10000);

    afterAll(async () => {
        await new Promise<void>((resolve, reject) => {
            server.close((err) => {
                if (err) reject(err); // Handle errors during server close
                else resolve();       // Successfully close the server
            });
        });
        if (mysqlDataSource.isInitialized) {
            await mysqlDataSource.destroy(); // Properly close the database connection
        }
    });

    test("GET /ping", async () => {
        const response = await request(server).get("/ping");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: "hello",
        });
    });

    test("POST /user", async () => {
        const response = await request(server)
            .post("/user")
            .send({
                handle: "test",
                email: "test@gmail.com",
                password: "test1234",
            });

        expect(response.status).toBe(200);
    });

    test("POST /user/login", async () => {
        const response = await request(server)
            .post("/user/login")
            .send({
                handle: "test",
                password: "test1234",
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        token = response.body.data.token;
    });

    test("POST /problem", async () => {
        const response = await request(server)
            .post("/problem")
            .set("x-access-token", token)
            .send({
                title: "Test Problem",
                statement: "Test Problem Statement",
                timeLimit: 100,
                memoryLimit: 256,
                inputFormat: "Test Input Format",
                outputFormat: "Test Output Format",
            });
        expect(response.status).toBe(200);
    });

    test("POST /contest", async () => {
        const response = await request(server)
            .post("/contest")
            .set("x-access-token", token)
            .send({
                title: "Test Contest",
                scoringRule: "ACM",
                startTime: Date.now(),
                endTime: Date.now() + 100000,
                organizerId: 1,
            });

        expect(response.status).toBe(200);
    });

    test("POST /contest/{id}/problem", async () => {
        const response = await request(server)
            .post("/contest/1/problem")
            .set("x-access-token", token)
            .send({
                problemId: 1,
                score: 100,
            });

        expect(response.status).toBe(200);
    });

    test("POST /problem/{id}/testcase", async () => {
        const response = await request(server)
            .post("/problem/1/testcase")
            .set("x-access-token", token)
            .send({
                input: "1 2",
                output: "3",
            });
        expect(response.status).toBe(200);
    });

    test("POST /submission", async () => {
        const cppCode = `
            #include <iostream>
            int main() {
                int a, b;
                std::cin >> a >> b;
                std::cout << a + b << std::endl;
                return 0;
            }
        `;

        const response = await request(server)
            .post("/submission")
            .set("x-access-token", token)
            .send({
                problemId: 1,
                contestId: 1,
                code: Buffer.from(cppCode).toString("base64"),
            });
        expect(response.status).toBe(200);
    });
    
    test("GET /submission/{id}", async () => {
        const response = await request(server).get("/submission/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        const results = response.body.data.result as SubmissionResult[];
        expect(results.length).toBeGreaterThan(0);
    });
});
