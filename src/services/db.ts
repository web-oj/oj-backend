import mysql from "mysql2";
import "dotenv/config";
import { time } from "console";

const sqlString = (val: string | number | null): string | number | null => {
  if (val === null || (val as string).length === 0) {
    return "NULL";
  }
  if (typeof val === "string") {
    return `'${val}'`;
  }
  return val;
};

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
    console.log("MySQL connection pool created.");
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
    solutionText: string | null,
    creatorId: number,
  ): Promise<boolean> {
    this.connPool.execute(
      ` CALL procedure_insert_problems(${sqlString(title)},
        ${sqlString(statement)},
        ${sqlString(difficulty)},
        ${sqlString(timeLimit)},
        ${sqlString(memoryLimit)},
        ${sqlString(inputFormat)},
        ${sqlString(outputFormat)},
        ${sqlString(solutionText)},
        ${sqlString(creatorId)})`,
      (err, result) => {
        if (err !== null) {
          console.log(err);
          return false;
        }
      },
    );
    return true;
  }

  /**
   * Update the attributes of a problem in the database.
   *
   * @param problem_id The unique ID of the problem. Can be acquired from querySelectProblem
   * @param title Title of the problem. Set to null to keep old value
   * @param statement Statement of the problem in Mardown text. Set to null to keep old value
   * @param difficulty Difficulty of the problem in number. Set to null to keep old value
   * @param timeLimit Time limit (maximum amount of time available for code executing) in milliseconds. 
   * Set to null to keep old value
   * @param memoryLimit Memory limit (maximum amount of memory available for code executing) in MB. 
   * Set to null to keep old value
   * @param inputFormat The input format for the problem, can be like "stdin" or "x.inp", ...
   *  Set to null to keep old value
   * @param outputFormat The output format for the problem, can be like "stdout" or "x.out", ... 
   * Set to null to keep old value
   * @param solutionText The solution for the problem in Markdown text. Can be empty string. 
   * Set to null to keep old value
   * @param creatorId ID of the user who created the problem. Set to null to keep old value
   * @returns true if successful, false otherwise
   */
  async queryUpdateProblem(
    problemId: number,
    title: string | null,
    statement: string | null,
    difficulty: number | null,
    timeLimit: number | null,
    memoryLimit: number | null,
    inputFormat: string | null,
    outputFormat: string | null,
    solutionText: string | null,
    creatorId: number | null,
  ): Promise<boolean> {
    this.connPool.execute(
      ` CALL procedure_update_problems(
        ${sqlString(problemId)},
        ${sqlString(title)},
        ${sqlString(statement)},
        ${sqlString(difficulty)},
        ${sqlString(timeLimit)},
        ${sqlString(memoryLimit)},
        ${sqlString(inputFormat)},
        ${sqlString(outputFormat)},
        ${sqlString(solutionText)},
        ${sqlString(creatorId)})`,
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
