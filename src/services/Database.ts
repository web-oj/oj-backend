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
    limitRangeStart: number = 0,
    limitRangeSize: number = 50,
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
          ${sqlString(limitRangeStart)},
          ${sqlString(limitRangeSize)})`,
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
    limitRangeStart: number | null = 0,
    limitRangeSize: number | null = 50,
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
          ${sqlString(limitRangeStart)},
          ${sqlString(limitRangeSize)})`,
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
    limitRangeStart: number = 0,
    limitRangeSize: number = 100,
  ): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_find_test_cases(
          ${sqlString(testCaseId)},
          ${sqlString(title)},
          ${sqlString(problemId)},
          ${sqlString(isHidden)},
          ${sqlString(limitRangeStart)},
          ${sqlString(limitRangeSize)})`,
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

  async queryGetContestRanking(
    contestId: number,
    limitRangeStart: number = 0,
    limitRangeSize: number = 100,
  ): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_get_contest_ranking(
          ${sqlString(contestId)},
          ${sqlString(limitRangeStart)},
          ${sqlString(limitRangeSize)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryGetSolvedProblemsInContestByUser(
    contestId: number,
    userId: number,
  ): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_get_solved_problems_in_contest_by_user(
          ${sqlString(contestId)},
          ${sqlString(userId)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryAddSubmissionResultBySubmission(
    submissionId: number,
    testCaseId: number,
    timeElapsed: number,
    memoryUsed: number,
    output: string | null,
    judgeMessage: string | null,
    judgedAt: string,
    status: string,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_add_submission_result_by_submission(
        ${sqlString(submissionId)},
        ${sqlString(testCaseId)},
        ${sqlString(timeElapsed)},
        ${sqlString(memoryUsed)},
        ${sqlString(output)},
        ${sqlString(judgeMessage)},
        ${sqlString(judgedAt)},
        ${sqlString(status)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryDeleteAllSubmissionResultsBySubmission(
    submissionId: number,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_delete_all_submission_results_by_submission(
        ${sqlString(submissionId)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryGetSubmissionResultBySubmission(
    submissionId: number,
  ): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_get_submission_results_by_submission(
          ${sqlString(submissionId)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryAddUser(
    userName: string,
    email: string,
    password: string,
    role: string[],
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_add_user(
        ${sqlString(userName)},
        ${sqlString(email)},
        ${sqlString(password)},
        ${sqlString(Array.from(role).join(","))})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryEditUserAttr(
    userId: number,
    userName: string | null = null,
    email: string | null = null,
    password: string | null = null,
    role: string[] = [],
    rating: number | null = null,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_edit_user_attr(
        ${sqlString(userId)},
        ${sqlString(userName)},
        ${sqlString(email)},
        ${sqlString(password)},
        ${sqlString(Array.from(role).join(","))},
        ${sqlString(rating)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryDeleteUser(userId: number): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_delete_user(
        ${sqlString(userId)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryGetUserById(userId: number): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_get_user_by_id(
          ${sqlString(userId)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryFindUsers(
    userId: number | null = null,
    userName: string | null = null,
    email: string | null = null,
    role: string | null = null,
    ratingLow: number | null = null,
    ratingHigh: number | null = null,
    limitRangeStart: number = 0,
    limitRangeSize: number = 100,
  ): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_find_users(
        ${sqlString(userId)},
        ${sqlString(userName)},
        ${sqlString(email)},
        ${sqlString(role)},
        ${sqlString(ratingLow)},
        ${sqlString(ratingHigh)},
        ${sqlString(limitRangeStart)},
        ${sqlString(limitRangeSize)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryAddAchievement(userId: number, title: string): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_add_achievement(
        ${sqlString(userId)},
        ${sqlString(title)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryEditAchievementAttr(
    achievementId: number,
    title: string | null = null,
    attachment: string | null = null,
    isVerified: boolean | null = null,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_edit_achievement_attr(
        ${sqlString(achievementId)},
        ${sqlString(title)},
        ${sqlString(attachment)},
        ${sqlString(isVerified)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryDeleteAchievement(achievementId: number): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_delete_achievement(
        ${sqlString(achievementId)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryGetAchievementById(achievementId: number): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_get_achievement_by_id(
          ${sqlString(achievementId)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryGetAchievementsByUser(userId: number): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        `CALL procedure_get_achievements_by_user(
          ${sqlString(userId)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryAddNotification(
    receiverId: number,
    content: string,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_add_notification(
        ${sqlString(receiverId)},
        ${sqlString(content)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryEditNotificationAttr(
    notificationId: number,
    receiverId: number | null = null,
    content: string | null = null,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_edit_notification_attr(
        ${sqlString(notificationId)},
        ${sqlString(receiverId)},
        ${sqlString(content)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryDeleteNotification(notificationId: number): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_delete_notification(
        ${sqlString(notificationId)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryFindNotifications(
    notificationId: number | null = null,
    receiverId: number | null = null,
    limitRangeStart: number = 0,
    limitRangeSize: number = 100,
  ): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        ` CALL procedure_find_notifications(
        ${sqlString(notificationId)},
        ${sqlString(receiverId)},
        ${sqlString(limitRangeStart)},
        ${sqlString(limitRangeSize)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryAddDiscussionMessage(
    senderId: number,
    problemId: number,
    parentId: number | null,
    content: string,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_add_discussion_message(
        ${sqlString(senderId)},
        ${sqlString(problemId)},
        ${sqlString(parentId)},
        ${sqlString(content)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryEditDiscussionMessageAttr(
    messageId: number,
    senderId: number | null = null,
    problemId: number | null = null,
    parentId: number | null = null,
    content: string | null = null,
  ): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_edit_discussion_message_attr(
        ${sqlString(messageId)},
        ${sqlString(senderId)},
        ${sqlString(problemId)},
        ${sqlString(parentId)},
        ${sqlString(content)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryDeleteDiscussionMessage(messageId: number): Promise<boolean> {
    try {
      let res = await this.connPool.promise().execute<ResultSetHeader>(
        ` CALL procedure_delete_discussion_message(
        ${sqlString(messageId)})`,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }

  async queryFindDiscussionMessages(
    messageId: number | null = null,
    senderId: number | null = null,
    problemId: number | null = null,
    parentId: number | null = null,
    limitRangeStart: number = 0,
    limitRangeSize: number = 100,
  ): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        ` CALL procedure_find_discussion_messages(
        ${sqlString(messageId)},
        ${sqlString(senderId)},
        ${sqlString(problemId)},
        ${sqlString(parentId)},
        ${sqlString(limitRangeStart)},
        ${sqlString(limitRangeSize)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryFindRootDiscussionMessages(
    messageId: number | null = null,
    senderId: number | null = null,
    problemId: number | null = null,
    limitRangeStart: number = 0,
    limitRangeSize: number = 100,
  ): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        ` CALL procedure_find_root_discussion_messages(
        ${sqlString(messageId)},
        ${sqlString(senderId)},
        ${sqlString(problemId)},
        ${sqlString(limitRangeStart)},
        ${sqlString(limitRangeSize)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryGetSolvedProblemsByUser(userId: number): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        ` CALL procedure_get_solved_problems_by_user(
        ${sqlString(userId)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryGetSolvedUsersByProblem(problemId: number): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        ` CALL procedure_get_solved_users_by_problem(
        ${sqlString(problemId)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }

  async queryGetParticipatedContestsByUser(userId: number): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        ` CALL procedure_get_participated_contests_by_user(
        ${sqlString(userId)})`,
      );
      return JSON.stringify(res[0][0]);
    } catch (err) {
      throw err;
    }
  }
  async queryGetContestParticipants(contestId: number): Promise<string> {
    try {
      let res = await this.connPool.promise().execute<RowDataPacket[]>(
        ` CALL procedure_get_contest_participants(
        ${sqlString(contestId)})`,
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
