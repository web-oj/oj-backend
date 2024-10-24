import mysql, { ResultSetHeader, RowDataPacket } from "mysql2";
import "dotenv/config";

const sqlString = (
  val: string | number | boolean | null,
): string | number | boolean | null => {
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

  async queryAddProblem(
    title: string,
    statement: string,
    difficulty: number,
    timeLimit: number,
    memoryLimit: number,
    inputFormat: string | null,
    outputFormat: string | null,
    solutionText: string | null,
    creatorId: number,
    isPublished: boolean | null = false,
  ): Promise<boolean> {
    try {
      let result = this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_add_problem(${sqlString(title)},
        ${sqlString(statement)},
        ${sqlString(difficulty)},
        ${sqlString(timeLimit)},
        ${sqlString(memoryLimit)},
        ${sqlString(inputFormat)},
        ${sqlString(outputFormat)},
        ${sqlString(solutionText)},
        ${sqlString(creatorId)},
        ${sqlString(isPublished)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryEditProblemAttr(
    problemId: number,
    title: string | null = null,
    statement: string | null = null,
    difficulty: number | null = null,
    timeLimit: number | null = null,
    memoryLimit: number | null = null,
    inputFormat: string | null = null,
    outputFormat: string | null = null,
    solutionText: string | null = null,
    creatorId: number | null = null,
    isPublished: boolean | null = null,
  ): Promise<boolean> {
    try {
      let result = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_edit_problem_attr(
          ${sqlString(problemId)},
          ${sqlString(title)},
          ${sqlString(statement)},
          ${sqlString(difficulty)},
          ${sqlString(timeLimit)},
          ${sqlString(memoryLimit)},
          ${sqlString(inputFormat)},
          ${sqlString(outputFormat)},
          ${sqlString(solutionText)},
          ${sqlString(creatorId)},
          ${sqlString(isPublished)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryDeleteProblem(problemId: number): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        `CALL procedure_delete_problem(
          ${sqlString(problemId)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryGetProblemById(problemId: number): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_get_problem_by_id(
          ${sqlString(problemId)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryFindProblems(
    problemId: number | null = null,
    title: string | null = null,
    difficultyLow: number | null = null,
    difficultyHigh: number | null = null,
    createdAtLow: string | null = null,
    createdAtHigh: string | null = null,
    creatorId: number | null = null,
    isPublished: boolean | null = null,
    resultLimitStart: number = 0,
    resultLimitSize: number = 50,
  ): Promise<string> {
    try {
      let res = await this.connPool.promise().query<RowDataPacket[]>(
        `CALL procedure_find_problems(
          ${sqlString(problemId)},
          ${sqlString(title)},
          ${sqlString(difficultyLow)},
          ${sqlString(difficultyHigh)},
          ${sqlString(createdAtLow)},
          ${sqlString(createdAtHigh)},
          ${sqlString(creatorId)},
          ${sqlString(isPublished)},
          ${sqlString(resultLimitStart)},
          ${sqlString(resultLimitSize)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryFindProblemsWithTags(
    problemId: number | null = null,
    title: string | null = null,
    difficultyLow: number | null = null,
    difficultyHigh: number | null = null,
    createdAtLow: string | null = null,
    createdAtHigh: string | null = null,
    creatorId: number | null = null,
    isPublished: boolean | null = null,
    resultLimitStart: number | null = 0,
    resultLimitSize: number | null = 50,
  ): Promise<string> {
    try {
      let res = await this.connPool.promise().query<RowDataPacket[]>(
        `CALL procedure_find_problems_with_tags(
          ${sqlString(problemId)},
          ${sqlString(title)},
          ${sqlString(difficultyLow)},
          ${sqlString(difficultyHigh)},
          ${sqlString(createdAtLow)},
          ${sqlString(createdAtHigh)},
          ${sqlString(creatorId)},
          ${sqlString(isPublished)},
          ${sqlString(resultLimitStart)},
          ${sqlString(resultLimitSize)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryAddTag(tagName: string, tagType: string): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_add_tag(
        ${sqlString(tagName)},
        ${sqlString(tagType)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryEditTagAttr(
    tagId: number,
    tagName: string | null = null,
    tagType: string | null = null,
    isSelected: boolean | null = null,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_edit_tag_attr(
        ${sqlString(tagId)},
        ${sqlString(tagName)},
        ${sqlString(tagType)},
        ${sqlString(isSelected)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryDeleteTag(tagId: number): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        `CALL procedure_delete_tag(
          ${sqlString(tagId)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryFindTags(
    tagId: number | null = null,
    tagName: string | null = null,
    tagType: string | null = null,
    isSelected: boolean | null = null,
  ): Promise<string> {
    try {
      let res = await this.connPool.promise().query<RowDataPacket[]>(
        ` CALL procedure_find_tags(
        ${sqlString(tagId)},
        ${sqlString(tagName)},
        ${sqlString(tagType)},
        ${sqlString(isSelected)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryAddTaggedProblem(
    problemId: number,
    tagId: number,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_add_tagged_problem(
        ${sqlString(problemId)},
        ${sqlString(tagId)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryDeleteTaggedProblem(
    problemId: number,
    tagId: number,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_delete_tagged_problem(
        ${sqlString(problemId)},
        ${sqlString(tagId)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryFindTagsByProblem(problemId: number): Promise<string> {
    try {
      let res = await this.connPool.promise().query<RowDataPacket[]>(
        ` CALL procedure_find_tags_by_problem(
        ${sqlString(problemId)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryAddTestCase(
    title: string,
    problemId: number,
    input: string,
    expectedOutput: string,
    isHidden: boolean = false,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_add_test_case(
        ${sqlString(title)},
        ${sqlString(problemId)},
        ${sqlString(input)},
        ${sqlString(expectedOutput)},
        ${sqlString(isHidden)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryEditTestCase(
    testCaseId: number,
    title: string | null = null,
    problemId: number | null = null,
    input: string | null = null,
    expectedOutput: string | null = null,
    isHidden: boolean | null = null,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_edit_test_case(
        ${sqlString(testCaseId)},
        ${sqlString(title)},
        ${sqlString(problemId)},
        ${sqlString(input)},
        ${sqlString(expectedOutput)},
        ${sqlString(isHidden)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryDeleteTestCase(testCaseId: number): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_delete_test_case(
        ${sqlString(testCaseId)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryGetTestCaseById(testCaseId: number): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_get_test_case_by_id(
          ${sqlString(testCaseId)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryFindTestCases(
    testCaseId: number | null = null,
    title: string | null = null,
    problemId: number | null = null,
    isHidden: boolean | null = null,
    resultLimitStart: number = 0,
    resultLimitSize: number = 100,
  ): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_find_test_cases(
          ${sqlString(testCaseId)},
          ${sqlString(title)},
          ${sqlString(problemId)},
          ${sqlString(isHidden)},
          ${sqlString(resultLimitStart)},
          ${sqlString(resultLimitSize)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryAddContest(
    title: string,
    description: string | null,
    startTime: string,
    endTime: string,
    scoringRule: string,
    organizerId: number,
    isPublished: boolean = false,
    isPlagiarismCheckEnabled: boolean = false,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_add_contest(
        ${sqlString(title)},
        ${sqlString(description)},
        ${sqlString(startTime)},
        ${sqlString(endTime)},
        ${sqlString(scoringRule)},
        ${sqlString(organizerId)},
        ${sqlString(isPublished)},
        ${sqlString(isPlagiarismCheckEnabled)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryEditContest(
    contestId: number,
    title: string | null = null,
    description: string | null = null,
    startTime: string | null = null,
    endTime: string | null = null,
    scoringRule: string | null = null,
    organizerId: number | null = null,
    isPublished: boolean | null = null,
    isPlagiarismCheckEnabled: boolean | null = null,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_edit_contest(
        ${sqlString(contestId)},
        ${sqlString(title)},
        ${sqlString(description)},
        ${sqlString(startTime)},
        ${sqlString(endTime)},
        ${sqlString(scoringRule)},
        ${sqlString(organizerId)},
        ${sqlString(isPublished)},
        ${sqlString(isPlagiarismCheckEnabled)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryDeleteContest(contestId: number): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_delete_contest(
        ${sqlString(contestId)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryGetContestById(contestId: number): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_get_contest_by_id(
          ${sqlString(contestId)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryFindContests(
    contestId: number | null = null,
    title: string | null = null,
    scoringRule: string | null = null,
    organizerId: number | null = null,
  ): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_find_contests(
          ${sqlString(contestId)},
          ${sqlString(title)},
          ${sqlString(scoringRule)},
          ${sqlString(organizerId)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryAddProblemToContest(
    contestId: number,
    problemId: number,
    point: number,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_add_problem_to_contest(
        ${sqlString(contestId)},
        ${sqlString(problemId)},
        ${sqlString(point)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryEditProblemPointInContest(
    contestId: number,
    problemId: number,
    point: number | null,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_edit_problem_point_in_contest(
        ${sqlString(contestId)},
        ${sqlString(problemId)},
        ${sqlString(point)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryDeleteProblemFromContest(
    contestId: number,
    problemId: number,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_delete_problem_from_contest(
        ${sqlString(contestId)},
        ${sqlString(problemId)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryGetProblemsInContest(contestId: number): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_get_problems_in_contest(
          ${sqlString(contestId)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryAddSubmission(
    userId: number,
    problemId: number,
    contestId: number,
    sourceCodeLanguage: string,
    sourceCodeFileId: number,
    status: string,
    compilerMessage: string | null,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_add_submission(
        ${sqlString(userId)},
        ${sqlString(problemId)},
        ${sqlString(contestId)},
        ${sqlString(sourceCodeLanguage)},
        ${sqlString(sourceCodeFileId)},
        ${sqlString(status)},
        ${sqlString(compilerMessage)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryEditSubmission(
    submissionId: number,
    userId: number | null = null,
    problemId: number | null = null,
    contestId: number | null = null,
    sourceCodeLanguage: string | null = null,
    sourceCodeFileId: number | null = null,
    status: string | null = null,
    compilerMessage: string | null = null,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_edit_submission(
        ${sqlString(submissionId)},
        ${sqlString(userId)},
        ${sqlString(problemId)},
        ${sqlString(contestId)},
        ${sqlString(sourceCodeLanguage)},
        ${sqlString(sourceCodeFileId)},
        ${sqlString(status)},
        ${sqlString(compilerMessage)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryDeleteSubmission(submissionId: number): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_delete_submission(
        ${sqlString(submissionId)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryGetSubmissionById(submissionId: number): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_get_submission_by_id(
          ${sqlString(submissionId)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryFindSubmissions(
    submissionId: number | null = null,
    userId: number | null = null,
    problemId: number | null = null,
    contestId: number | null = null,
    sourceCodeLanguage: string | null = null,
    sourceCodeFileId: number | null = null,
    status: string | null = null,
  ): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_find_submissions(
          ${sqlString(submissionId)},
        ${sqlString(userId)},
        ${sqlString(problemId)},
        ${sqlString(contestId)},
        ${sqlString(sourceCodeLanguage)},
        ${sqlString(sourceCodeFileId)},
        ${sqlString(status)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryFindOfficialSubmissionsInContests(
    contestId: number,
    userId: number | null = null,
  ): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_find_official_submissions_in_contest(
          ${sqlString(contestId)},
          ${sqlString(userId)})`,
      );
      return JSON.stringify(res[0][0]);
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
