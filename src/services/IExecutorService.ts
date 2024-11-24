export interface IExecutorService {
  executeCode(code: string, language: string, stdin: string): Promise<string>;
  // executeSubmission(submissionId: number): Promise<string>;
}
