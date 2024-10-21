import mysql from "mysql2/promise";
import "dotenv/config";
import { time } from "console";

class Database {
  connPool: mysql.Pool;

  constructor(
    __host: string,
    __user: string,
    __password: string,
    __database: string,
  ) {
    this.connPool = mysql.createPool({
      host: __host,
      user: __user,
      password: __password,
      database: __database,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
    console.log("Connection pool created.");
  }

  async queryInsertProblem(
    title: string,
    statement: string,
    difficulty: number,
    timeLimit: number,
    memoryLimit: number,
    inputFormat: string,
    outputFormat: string,
    solutionText: string,
    creatorId: number,
  ): Promise<boolean> {
    try {
      if (solutionText.length === 0) {
        solutionText = "NULL";
      } else {
        solutionText = `'${solutionText}'`;
      }
      const [row, fields] = await this.connPool.query(` \
        START TRANSACTION; INSERT INTO \
          problems ( \
              title, \
              statement, \
              difficulty, \
              time_limit, \
              memory_limit, \
              input_format, \
              output_format, \
              solution_text, \
              created_at, \
              creator_id \
            ) \
        VALUES ( \
            '${title}', \
            '${statement}', \
            ${difficulty}, \
            ${timeLimit}, \
            ${memoryLimit}, \
            '${inputFormat}', \
            '${outputFormat}', \
            ${solutionText}, \
            NOW(), \
            ${creatorId} \
        ); \
 \
        COMMIT; \
      `);
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}

export default new Database(
  process.env.MYSQL_HOST as string,
  process.env.MYSQL_USER as string,
  process.env.MYSQL_PASSWORD as string,
  process.env.MYSQL_DATABASE as string,
);
