import request from "supertest";
import { createServer, Server } from "http";
import initApp from "../src/index";
import { mysqlDataSource } from "../src/database/MysqlDataSource";

describe("API Tests", () => {
    let server: Server;

    beforeAll(async () => {
        const app = await initApp(); // Initialize the app without starting the server
        server = createServer(app); // Create the HTTP server
        await new Promise<void>((resolve) => server.listen(3000, resolve)); // Start the server
    });

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
});
