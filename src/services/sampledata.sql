USE ojdb;

INSERT INTO
    users (
        user_name,
        email,
        password,
        role,
        created_at,
        rating
    )
VALUES (
        "daicadihoc",
        "daicadihoc@example.com",
        "password",
        "PS,CU",
        NOW(),
        0
    );

INSERT INTO
    users (
        user_name,
        email,
        password,
        role,
        created_at,
        rating
    )
VALUES (
        "ttb06",
        "ttb06@example.com",
        "password",
        "CU",
        NOW(),
        69
    );

INSERT INTO
    users (
        user_name,
        email,
        password,
        role,
        created_at,
        rating
    )
VALUES (
        "user01",
        "user01@example.com",
        "password",
        "CU",
        NOW(),
        177013
    );

INSERT INTO
    users (
        user_name,
        email,
        password,
        role,
        created_at,
        rating
    )
VALUES (
        "user02",
        "user02@example.com",
        "password",
        "CU",
        NOW(),
        666
    );

INSERT INTO
    contests (
        title,
        start_time,
        end_time,
        scoring_rule,
        organizer_id
    )
VALUES (
        "Test Contest #01",
        "2024-10-10 00:00:00",
        "2024-10-10 03:00:00",
        "IOI",
        2
    );

INSERT INTO
    contests (
        title,
        start_time,
        end_time,
        scoring_rule,
        organizer_id
    )
VALUES (
        "Test Educational Contest #01",
        "2024-12-10 00:00:00",
        "2024-12-10 05:00:00",
        "ICPC",
        1
    );

INSERT INTO
    contests (
        title,
        start_time,
        end_time,
        scoring_rule,
        organizer_id
    )
VALUES (
        "Test Contest #02",
        "2025-12-10 00:00:00",
        "2025-12-10 03:00:00",
        "IOI",
        2
    );

INSERT INTO
    problems (
        title,
        statement,
        difficulty,
        time_limit,
        memory_limit,
        input_format,
        output_format,
        solution_text,
        created_at,
        creator_id
    )
VALUES (
        "A cộng B",
        'Cho $2$ số nguyên $A$ và $B$. Hãy tính $A + B$.

## Input

Gồm $1$ dòng chứa $2$ số nguyên $A$ và $B$ $(1\\leq A\\leq B \\leq 1000)$, cách nhau bởi $1$ dấu cách.

## Output

Ghi ra tổng $A + B$.',
        800,
        1000,
        512,
        "stdin",
        "stdout",
        '```
#include <iostream>

using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}
```',
        NOW(),
        1
    );

INSERT INTO
    problems (
        title,
        statement,
        difficulty,
        time_limit,
        memory_limit,
        input_format,
        output_format,
        solution_text,
        created_at,
        creator_id
    )
VALUES (
        "A cộng B",
        'Cho $2$ số nguyên $A$ và $B$. Hãy tính $A + B$.

## Input

Gồm $1$ dòng chứa $2$ số nguyên $A$ và $B$ $(1\\leq A\\leq B \\leq 10^{10^6})$, cách nhau bởi $1$ dấu cách.

## Output

Ghi ra tổng $A + B$.',
        1000,
        1000,
        512,
        "stdin",
        "stdout",
        NULL,
        NOW(),
        1
    );

INSERT INTO
    problems (
        title,
        statement,
        difficulty,
        time_limit,
        memory_limit,
        input_format,
        output_format,
        solution_text,
        created_at,
        creator_id
    )
VALUES (
        "Copium Permutation (Hard version)",
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        4000,
        1000,
        512,
        "stdin",
        "stdout",
        NULL,
        NOW(),
        2
    );

INSERT INTO
    problems (
        title,
        statement,
        difficulty,
        time_limit,
        memory_limit,
        input_format,
        output_format,
        solution_text,
        created_at,
        creator_id
    )
VALUES (
        "Skibidi Toilet",
        'c b d b d dop dop yes yes',
        6969,
        1000,
        512,
        "cbdbd.inp",
        "cbdbd.out",
        "cbd dop dop dop yes yes yes",
        NOW(),
        1
    );

INSERT INTO
    problems (
        title,
        statement,
        difficulty,
        time_limit,
        memory_limit,
        input_format,
        output_format,
        solution_text,
        created_at,
        creator_id
    )
VALUES (
        "Sample Problem #5",
        'sample text',
        1000,
        1000,
        512,
        "sample.inp",
        "sample.out",
        "sample text",
        NOW(),
        2
    );

INSERT INTO
    submissions (
        user_id,
        problem_id,
        contest_id,
        submitted_at,
        source_code_language,
        source_code_file_id,
        status
    )
VALUES (
        4,
        2,
        2,
        NOW(),
        "C++",
        123,
        "AC"
    );

INSERT INTO
    submissions (
        user_id,
        problem_id,
        contest_id,
        submitted_at,
        source_code_language,
        source_code_file_id,
        status
    )
VALUES (
        3,
        2,
        2,
        NOW(),
        "Python",
        124,
        "WA"
    );

INSERT INTO
    submissions (
        user_id,
        problem_id,
        contest_id,
        submitted_at,
        source_code_language,
        source_code_file_id,
        status
    )
VALUES (
        3,
        2,
        2,
        NOW(),
        "Brainfuck",
        125,
        "CE"
    );

INSERT INTO
    submissions (
        user_id,
        problem_id,
        contest_id,
        submitted_at,
        source_code_language,
        source_code_file_id,
        status
    )
VALUES (
        5,
        1,
        3,
        NOW(),
        "C++",
        126,
        "P"
    );

INSERT INTO
    submissions (
        user_id,
        problem_id,
        contest_id,
        submitted_at,
        source_code_language,
        source_code_file_id,
        status
    )
VALUES (
        3,
        1,
        3,
        NOW(),
        "C++",
        127,
        "AC"
    );

INSERT INTO
    submissions (
        user_id,
        problem_id,
        contest_id,
        submitted_at,
        source_code_language,
        source_code_file_id,
        status
    )
VALUES (
        3,
        3,
        1,
        NOW(),
        "C++",
        127,
        "TLE"
    );

INSERT INTO
    contestsparticipated (user_id, contest_id)
VALUES (4, 2);

INSERT INTO
    contestsparticipated (user_id, contest_id)
VALUES (3, 2);

INSERT INTO
    contestsparticipated (user_id, contest_id)
VALUES (5, 3);

INSERT INTO
    contestsparticipated (user_id, contest_id)
VALUES (3, 3);

INSERT INTO problemssolved VALUES (4, 2);

INSERT INTO problemssolved VALUES (3, 1);

INSERT INTO
    contestsparticipated (user_id, contest_id)
VALUES (5, 2);

INSERT INTO
    contestproblems (problem_id, contest_id, point)
VALUES (1, 2, 100);

INSERT INTO
    contestproblems (problem_id, contest_id, point)
VALUES (2, 2, 300);

INSERT INTO
    contestproblems (problem_id, contest_id, point)
VALUES (3, 2, 1000);

INSERT INTO
    contestproblems (problem_id, contest_id, point)
VALUES (2, 3, 300);

INSERT INTO
    contestproblems (problem_id, contest_id, point)
VALUES (4, 3, 69);

INSERT INTO
    testcases (
        title,
        problem_id,
        input,
        expected_output
    )
VALUES ("Test #1", 1, "1 2", "3");

INSERT INTO
    testcases (
        title,
        problem_id,
        input,
        expected_output
    )
VALUES ("Test #2", 1, "-1 6", "5");

INSERT INTO
    testcases (
        title,
        problem_id,
        input,
        expected_output
    )
VALUES ("Test #1", 2, "1 2", "3");

INSERT INTO
    testcases (
        title,
        problem_id,
        input,
        expected_output
    )
VALUES ("Test #2", 2, "-1 6", "5");

INSERT INTO
    testcases (
        title,
        problem_id,
        input,
        expected_output
    )
VALUES (
        "Test #3",
        2,
        "111111111111111111111111111 222222222222222222222222222",
        "333333333333333333333333333"
    );

INSERT INTO
    testcases (
        title,
        problem_id,
        input,
        expected_output
    )
VALUES (
        "Test #1",
        3,
        "a",
        "b"
    );

INSERT INTO submissionresults (
    submission_id,test_case_id, status
) VALUES (
    4, 3, "AC"
);

INSERT INTO submissionresults (
    submission_id,test_case_id, status
) VALUES (
    4, 4, "AC"
)

INSERT INTO submissionresults (
    submission_id,test_case_id, status
) VALUES (
    4, 5, "AC"
)

INSERT INTO submissionresults (
    submission_id,test_case_id, status
) VALUES (
    3, 3, "AC"
)

INSERT INTO submissionresults (
    submission_id,test_case_id, status
) VALUES (
    3, 4, "WA"
)

INSERT INTO submissionresults (
    submission_id,test_case_id, status
) VALUES (
    5, 1, "AC"
)

INSERT INTO submissionresults (
    submission_id,test_case_id, status
) VALUES (
    3, 1, "AC"
)

INSERT INTO submissionresults (
    submission_id,test_case_id, status
) VALUES (
    3, 2, "AC"
)

INSERT INTO submissionresults (
    submission_id,test_case_id, status
) VALUES (
    3, 6, "TLE"
)