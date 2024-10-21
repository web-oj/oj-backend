import mysql from "mysql2";
import "dotenv/config";
import { time } from "console";

class Database {
  connPool: mysql.Pool;

  /**
   * Start a database connection with constructor parameters.
   *
   * @param __host Database host
   * @param __user Database user
   * @param __password Database password (not encrypted)
   * @param __database Database name
   */
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

  /**
   * Add a new problem into the database.
   *
   * @param title Title of the problem
   * @param statement Statement of the problem in Mardown text
   * @param difficulty Difficulty of the problem in number
   * @param timeLimit Time limit (maximum amount of time available for code executing) in milliseconds
   * @param memoryLimit Memory limit (maximum amount of memory available for code executing) in MB
   * @param inputFormat The input format for the problem, can be like "stdin" or "x.inp", ...
   * @param outputFormat The output format for the problem, can be like "stdout" or "x.out", ...
   * @param solutionText The solution for the problem in Markdown text. Can be empty string
   * @param creatorId ID of the user who created the problem
   * @returns true if successful, false otherwise
   */
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
    if (solutionText.length === 0) {
      solutionText = "NULL";
    } else {
      solutionText = `'${solutionText}'`;
    }
    this.connPool.execute(
      ` CALL procedure_insert_problems('${title}',
        '${statement}',
        ${difficulty},
        ${timeLimit},
        ${memoryLimit},
        '${inputFormat}',
        '${outputFormat}',
        ${solutionText},
        ${creatorId})`,
      (err, result) => {
        if (err !== null) {
          console.log(err);
          return false;
        }
      },
    );
    return true;
  }
}

export default new Database(
  process.env.MYSQL_HOST as string,
  process.env.MYSQL_USER as string,
  process.env.MYSQL_PASSWORD as string,
  process.env.MYSQL_DATABASE as string,
);
