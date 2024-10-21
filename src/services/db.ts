import mysql, { ResultSetHeader, RowDataPacket } from "mysql2";
import "dotenv/config";

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
   * @returns true if successful
   *
   * @throws An error if fail
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
    try {
      let result = this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_insert_problems(${sqlString(title)},
        ${sqlString(statement)},
        ${sqlString(difficulty)},
        ${sqlString(timeLimit)},
        ${sqlString(memoryLimit)},
        ${sqlString(inputFormat)},
        ${sqlString(outputFormat)},
        ${sqlString(solutionText)},
        ${sqlString(creatorId)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
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
   * @returns true if successful
   *
   * @throws An error if fail
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
    try {
      let result = await this.connPool.promise().execute<ResultSetHeader>(
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
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

 /**
  * Find the attributes of problems that match a list of provided conditions
  * 
  * @param title The title of the problem. Set to null to ignore the condition.
  * @param problemId The ID of the problem. Set to null or truncate to ignore the condition.
  * @param difficultyLow The lower bound for the difficulty of the problem.
  * Set to null or truncate to ignore the condition (take the default value of 0)
  * @param difficultyHigh The upper bound for the difficulty of the problem.
  * Set to null or truncate to ignore the condition (take the default value of 10000)
  * @param createdAtLow The lower bound for the difficulty of the problem in YYYY-MM-DD HH:MM:SS form.
  * Set to null or truncate to ignore the condition (take the default value of 2000-01-01 00:00:00)
  * @param createdAtHigh The upper bound for the difficulty of the problem in YYYY-MM-DD HH:MM:SS form.
  * Set to null or truncate to ignore the condition (take the default value of NOW())
  * @param resultLimitStart First parameter of SQL LIMIT x, y. Truncate to use the default value of 0
  * @param resultLimitSize Second parameter of SQL LIMIT x, y. Truncate to use the default value of 100
  * 
  * @returns A Object[] object, containing the result of the query in JSON form if successful
  * 
  * @throws An error if fail
  */
  async queryFindProblem(
    title: string | null,
    problemId: number | null = null,
    difficultyLow: number | null = null,
    difficultyHigh: number | null = null,
    createdAtLow: string | null = null,
    createdAtHigh: string | null = null,
    resultLimitStart: number = 0,
    resultLimitSize: number = 50,
  ): Promise<Array<Object>> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_select_problems(
          ${sqlString(problemId)},
          ${sqlString(title)},
          ${sqlString(difficultyLow)},
          ${sqlString(difficultyHigh)},
          ${sqlString(createdAtLow)},
          ${sqlString(createdAtHigh)},
          ${sqlString(resultLimitStart)},
          ${sqlString(resultLimitSize)})`,
      );
      return res[0][0] as Object[];
    } catch (err) {
      throw err;
    }
  }
}

export default new Database(
  process.env.MYSQL_HOST as string,
  process.env.MYSQL_USER as string,
  process.env.MYSQL_PASSWORD as string,
  process.env.MYSQL_DATABASE as string,
);
