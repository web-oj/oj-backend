-- Schema: https://drive.google.com/file/d/1LXLR8uFOKzCWZ5iASw4Rbs8xYwgfgVkW/view?usp=drive_link

DROP DATABASE IF EXISTS ojdb;

CREATE DATABASE ojdb;

USE ojdb;

CREATE TABLE Users (
    user_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password CHAR(31) NOT NULL,
    role SET('AD', 'PS', 'CU') NOT NULL,
    created_at DATETIME NOT NULL,
    rating INT NOT NULL,
    PRIMARY KEY (user_id),
    INDEX index_user_name (user_name),
    INDEX index_rating (rating)
) ENGINE = InnoDB CHARSET = utf8;

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
        'admin',
        'admin__example.com',
        'admin',
        'AD,PS,CU',
        NOW(),
        0
    );

CREATE TABLE Contests (
    contest_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description MEDIUMTEXT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    scoring_rule ENUM('IOI', 'ICPC') NOT NULL,
    organizer_id INT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    is_plagiarism_check_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (contest_id),
    FOREIGN KEY (organizer_id) REFERENCES Users (user_id) ON DELETE CASCADE,
    INDEX index_start_time (start_time),
    FULLTEXT (title)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE Problems (
    problem_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    statement MEDIUMTEXT NOT NULL,
    difficulty INT NOT NULL,
    time_limit INT NOT NULL,
    memory_limit INT NOT NULL,
    input_format VARCHAR(15) NOT NULL DEFAULT "stdin",
    output_format VARCHAR(15) NOT NULL DEFAULT "stdout",
    solution_text MEDIUMTEXT,
    created_at DATETIME NOT NULL,
    creator_id INT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (problem_id),
    FOREIGN KEY (creator_id) REFERENCES Users (user_id) ON DELETE CASCADE,
    INDEX index_difficulty (difficulty),
    INDEX index_created_at (created_at),
    FULLTEXT (title)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE Submissions (
    submission_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    problem_id INT NOT NULL,
    contest_id INT,
    submitted_at DATETIME NOT NULL,
    source_code_language VARCHAR(15) NOT NULL,
    source_code_file_id INT NOT NULL,
    status ENUM(
        'AC',
        'P',
        'J',
        'WA',
        'TLE',
        'MLE',
        'RTE',
        'CE',
        'D'
    ) NOT NULL DEFAULT 'P',
    compiler_message MEDIUMTEXT,
    PRIMARY KEY (submission_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (problem_id) REFERENCES Problems (problem_id) ON DELETE CASCADE,
    FOREIGN KEY (contest_id) REFERENCES Contests (contest_id) ON DELETE CASCADE,
    INDEX index_status (status)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE ContestsParticipated (
    user_id INT NOT NULL,
    contest_id INT NOT NULL,
    PRIMARY KEY (user_id, contest_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (contest_id) REFERENCES Contests (contest_id) ON DELETE CASCADE
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE ProblemsSolved (
    user_id INT NOT NULL,
    problem_id INT NOT NULL,
    PRIMARY KEY (user_id, problem_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (problem_id) REFERENCES Problems (problem_id) ON DELETE CASCADE
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE ContestProblems (
    problem_id INT NOT NULL,
    contest_id INT NOT NULL,
    point INT NOT NULL,
    PRIMARY KEY (contest_id, problem_id),
    FOREIGN KEY (problem_id) REFERENCES Problems (problem_id) ON DELETE CASCADE,
    FOREIGN KEY (contest_id) REFERENCES Contests (contest_id) ON DELETE CASCADE
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE TestCases (
    test_case_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    problem_id INT NOT NULL,
    input MEDIUMTEXT NOT NULL,
    expected_output MEDIUMTEXT NOT NULL,
    is_hidden BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (test_case_id),
    FOREIGN KEY (problem_id) REFERENCES Problems (problem_id) ON DELETE CASCADE
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE SubmissionResults (
    submission_id INT NOT NULL,
    test_case_id INT NOT NULL,
    time_elapsed INT NOT NULL,
    memory_used INT NOT NULL,
    output MEDIUMTEXT,
    judge_message MEDIUMTEXT DEFAULT NULL,
    status ENUM(
        'AC',
        'P',
        'J',
        'WA',
        'TLE',
        'MLE',
        'RTE',
        'CE',
        'D'
    ) NOT NULL DEFAULT 'P',
    PRIMARY KEY (submission_id, test_case_id),
    FOREIGN KEY (submission_id) REFERENCES Submissions (submission_id) ON DELETE CASCADE,
    FOREIGN KEY (test_case_id) REFERENCES TestCases (test_case_id) ON DELETE CASCADE,
    INDEX index_status (status)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE Achievements (
    achievement_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    attachment MEDIUMBLOB,
    is_verified BOOL NOT NULL,
    PRIMARY KEY (achievement_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE Notifications (
    notification_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    receiver_id INT NOT NULL,
    content MEDIUMTEXT NOT NULL,
    PRIMARY KEY (notification_id),
    FOREIGN KEY (receiver_id) REFERENCES Users (user_id) ON DELETE CASCADE
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE DiscussionMessages (
    message_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    sender_id INT NOT NULL,
    contest_id INT NOT NULL,
    parent_id INT,
    content MEDIUMTEXT NOT NULL,
    PRIMARY KEY (message_id),
    FOREIGN KEY (sender_id) REFERENCES Users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (contest_id) REFERENCES Contests (contest_id) ON DELETE CASCADE,
    INDEX index_parent_id (parent_id)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE Tags (
    tag_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    tag_name VARCHAR(31) UNIQUE NOT NULL,
    tag_type ENUM('CATEGORY', 'SOURCE') NOT NULL,
    is_selected BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (tag_id),
    INDEX index_tag_name (tag_name),
    INDEX index_is_selected (is_selected)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE TaggedProblems (
    problem_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (problem_id, tag_id),
    FOREIGN KEY (problem_id) REFERENCES Problems (problem_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tags (tag_id) ON DELETE CASCADE
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE PlagiarismReports (
    report_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    submission_id INT NOT NULL,
    moss_dump_file VARCHAR(255) NOT NULL,
    PRIMARY KEY (report_id),
    FOREIGN KEY (submission_id) REFERENCES Submissions (submission_id) ON DELETE CASCADE
) ENGINE = InnoDB CHARSET = utf8;

DELIMITER $$

CREATE FUNCTION is_submission_official(
    __submission_id INT
) RETURNS BOOLEAN DETERMINISTIC BEGIN
    DECLARE __contest_id INT;
    DECLARE __submitted_at DATETIME;
    DECLARE __contest_start_time DATETIME;
    DECLARE __contest_end_time DATETIME;

    SET __contest_id = (
        SELECT contest_id FROM submissions
        WHERE submission_id = __submission_id
    );
    SET __submitted_at = (
        SELECT submitted_at FROM submissions
        WHERE submission_id = __submission_id
    );
    SET __contest_start_time = (
        SELECT start_time FROM contests
        WHERE contest_id = __contest_id
    );
    SET __contest_end_time = (
        SELECT end_time FROM contests
        WHERE contest_id = __contest_id
    );
    RETURN (__submitted_at BETWEEN __contest_start_time AND __contest_end_time);
END$$

CREATE PROCEDURE procedure_add_problem(
    IN __title VARCHAR(255),
    IN __statement MEDIUMTEXT,
    IN __difficulty INT,
    IN __time_limit INT,
    IN __memory_limit INT,
    IN __input_format VARCHAR(15),
    IN __output_format VARCHAR(15),
    IN __solution_text MEDIUMTEXT,
    IN __creator_id INT,
    IN __is_published BOOLEAN
) BEGIN
    START TRANSACTION;
    INSERT INTO 
        problems(
            title, 
            statement, 
            difficulty, 
            time_limit, 
            memory_limit, 
            input_format, 
            output_format, 
            solution_text, 
            created_at, 
            creator_id,
            is_published
        )
    VALUES (
            __title, 
            __statement, 
            __difficulty, 
            __time_limit, 
            __memory_limit,
            COALESCE(__input_format, "stdin"),
            COALESCE(__output_format, "stdout"),
            __solution_text, 
            NOW(), 
            __creator_id,
            COALESCE(__is_published, is_published)
    );
    COMMIT;
END$$

CREATE PROCEDURE procedure_edit_problem_attr(
    IN __problem_id INT,
    IN __title VARCHAR(255),
    IN __statement MEDIUMTEXT,
    IN __difficulty INT,
    IN __time_limit INT,
    IN __memory_limit INT,
    IN __input_format VARCHAR(15),
    IN __output_format VARCHAR(15),
    IN __solution_text mediumtext,
    IN __creator_id INT,
    IN __is_published BOOLEAN
) BEGIN
    START TRANSACTION;
    UPDATE problems
    SET 
        title = COALESCE(__title, title),
        statement = COALESCE(__statement, statement),
        difficulty = COALESCE(__difficulty, difficulty),
        time_limit = COALESCE(__time_limit, time_limit),
        memory_limit = COALESCE(__memory_limit, memory_limit),
        input_format = COALESCE(__input_format, input_format),
        output_format = COALESCE(__output_format, output_format),
        solution_text = COALESCE(__solution_text, solution_text),
        creator_id = COALESCE(__creator_id, creator_id),
        is_published = COALESCE(__is_published, is_published)
    WHERE problem_id = __problem_id;
    COMMIT;
END$$

CREATE PROCEDURE procedure_get_problem_by_id(
    IN __problem_id INT
) BEGIN
    SELECT * FROM problem WHERE problem_id = __problem_id;
END$$

CREATE PROCEDURE procedure_find_problems(
    IN __problem_id INT,
    IN __title VARCHAR(255),
    IN __difficulty_low INT,
    IN __difficulty_high INT,
    IN __created_at_low DATETIME,
    IN __created_at_high DATETIME,
    IN __creator_id INT,
    IN __is_published BOOLEAN,
    IN __result_limit_start INT,
    IN __result_limit_size INT
) BEGIN
    SELECT problem_id, title, difficulty, created_at, creator_id, is_published
    FROM problems
    WHERE IF(__problem_id IS NOT NULL, problem_id = __problem_id, TRUE)
    AND IF(
        __title IS NOT NULL, 
        title LIKE CONCAT(__title, '%') OR MATCH(title) AGAINST (__title IN BOOLEAN MODE), 
        TRUE
    )
    AND difficulty 
    BETWEEN COALESCE(__difficulty_low, 0) 
    AND COALESCE(__difficulty_high, 10000) 
    AND created_at
    BETWEEN COALESCE(__created_at_low, '2000-01-01 00:00:00') 
    AND COALESCE(__created_at_high, NOW())
    AND creator_id = COALESCE(__creator_id, creator_id)
    AND is_published = COALESCE(__is_published, is_published)
    ORDER BY created_at DESC
    LIMIT __result_limit_start, __result_limit_size;
END$$

CREATE PROCEDURE procedure_find_problems_with_tags(
    IN __problem_id INT,
    IN __title VARCHAR(255),
    IN __difficulty_low INT,
    IN __difficulty_high INT,
    IN __created_at_low DATETIME,
    IN __created_at_high DATETIME,
    IN __creator_id INT,
    IN __is_published BOOLEAN,
    IN __result_limit_start INT,
    IN __result_limit_size INT
) BEGIN
    SELECT DISTINCT 
        problems_filter_result.problem_id,
        problems_filter_result.title,
        problems_filter_result.difficulty,
        problems_filter_result.created_at,
        problems_filter_result.creator_id,
        problems_filter_result.is_published
    FROM (
        SELECT * FROM problems
        WHERE IF(__problem_id IS NOT NULL, problem_id = __problem_id, TRUE)
        AND IF(
            __title IS NOT NULL, 
            title LIKE CONCAT(__title, '%') OR MATCH(title) AGAINST (__title IN BOOLEAN MODE), 
            TRUE
        )
        AND difficulty 
        BETWEEN COALESCE(__difficulty_low, 0) 
        AND COALESCE(__difficulty_high, 10000) 
        AND created_at
        BETWEEN COALESCE(__created_at_low, '2000-01-01 00:00:00') 
        AND COALESCE(__created_at_high, NOW())
        AND creator_id = COALESCE(__creator_id, creator_id)
        AND is_published = COALESCE(__is_published, is_published)
    ) AS problems_filter_result
    JOIN (
        SELECT * FROM taggedproblems JOIN (
            SELECT tag_id FROM tags 
            WHERE is_selected = TRUE
            OR (SELECT COUNT(*) FROM tags WHERE is_selected = TRUE) = 0
        ) AS activated_tags USING (tag_id)
    ) AS active_tagged_problems USING (problem_id)
    ORDER BY created_at DESC
    LIMIT __result_limit_start, __result_limit_size;
END$$

CREATE PROCEDURE procedure_delete_problem(
    IN __problem_id INT
) BEGIN 
    START TRANSACTION;
    DELETE FROM problems
    WHERE problem_id = __problem_id;
    COMMIT;
END$$

CREATE PROCEDURE procedure_add_tag (
    IN __tag_name VARCHAR(31),
    IN __tag_type ENUM('CATEGORY', 'SOURCE')
) BEGIN
    START TRANSACTION;
    INSERT INTO tags (tag_name, tag_type, is_selected)
    VALUES (__tag_name, __tag_type, FALSE);
    COMMIT;
END$$

CREATE PROCEDURE procedure_edit_tag_attr (
    IN __tag_id INT,
    IN __tag_name VARCHAR(31),
    IN __tag_type ENUM('CATEGORY', 'SOURCE'),
    IN __is_selected BOOLEAN
) BEGIN
    START TRANSACTION;
    UPDATE tags 
    SET tag_name = COALESCE(__tag_name, tag_name),
    tag_type = COALESCE(__tag_type, tag_type),
    is_selected = COALESCE(__is_selected, is_selected)
    WHERE tag_id = __tag_id;
    COMMIT;
END$$

CREATE PROCEDURE procedure_delete_tag (
    IN __tag_id INT
) BEGIN
    START TRANSACTION;
    DELETE FROM tags
    WHERE tag_id = __tag_id;
    COMMIT;
END$$

CREATE PROCEDURE procedure_find_tags (
    IN __tag_id INT,
    IN __tag_name VARCHAR(31),
    IN __tag_type ENUM('CATEGORY', 'SOURCE'),
    IN __is_selected BOOLEAN
) BEGIN
    SELECT * FROM tags
    WHERE tag_id = COALESCE(__tag_id, tag_id)
    AND tag_name LIKE CONCAT(COALESCE(__tag_name, tag_name))
    AND tag_type = COALESCE(__tag_type, tag_type)
    AND is_selected = COALESCE(__is_selected, is_selected)
    ORDER BY tag_name
    LIMIT 0, 100;
END$$

CREATE PROCEDURE procedure_add_tagged_problem(
    IN __problem_id INT,
    IN __tag_id INT
) BEGIN
    START TRANSACTION;
    INSERT INTO taggedproblems VALUES (__problem_id, __tag_id);
    COMMIT;
END$$

CREATE PROCEDURE procedure_delete_tagged_problem(
    IN __problem_id INT,
    IN __tag_id INT
) BEGIN
    START TRANSACTION;
    DELETE FROM taggedproblems 
    WHERE problem_id = __problem_id
    AND tag_id = __tag_id;
    COMMIT;
END$$

CREATE PROCEDURE procedure_add_test_case  (
    IN __title VARCHAR(255),
    IN __problem_id VARCHAR(255),
    IN __input MEDIUMTEXT,
    IN __expected_output MEDIUMTEXT,
    IN __is_hidden BOOLEAN
) BEGIN
    START TRANSACTION;
    INSERT INTO testcases (
        title,
        problem_id,
        input,
        expected_output,
        is_hidden
    ) VALUES (
        __title,
        __problem_id,
        __input,
        __expected_output,
        __is_hidden
    );
    COMMIT;
END$$

CREATE PROCEDURE procedure_edit_test_case  (
    IN __test_case_id INT,
    IN __title VARCHAR(255),
    IN __problem_id VARCHAR(255),
    IN __input MEDIUMTEXT,
    IN __expected_output MEDIUMTEXT,
    IN __is_hidden BOOLEAN
) BEGIN
    START TRANSACTION;
    UPDATE testcases
    SET title = COALESCE(__title, title),
    problem_id = COALESCE(__problem_id, problem_id),
    input = COALESCE(__input, input),
    expected_output = COALESCE(__expected_output, expected_output),
    is_hidden = COALESCE(__is_hidden, is_hidden)
    WHERE test_case_id = __test_case_id;
    COMMIT;
END$$

CREATE PROCEDURE procedure_delete_test_case (
    IN __test_case_id INT
) BEGIN
    START TRANSACTION;
    DELETE FROM testcases 
    WHERE test_case_id = __test_case_id;
    COMMIT;
END$$

CREATE PROCEDURE procedure_get_test_case_by_id (
    IN __test_case_id INT
) BEGIN
    SELECT * FROM testcases 
    WHERE test_case_id = __test_case_id;
END$$

CREATE PROCEDURE procedure_find_test_cases (
    IN __test_case_id INT,
    IN __title VARCHAR(255),
    IN __problem_id VARCHAR(255),
    IN __is_hidden BOOL,
    IN __result_limit_start INT,
    IN __result_limit_size INT
) BEGIN
    SELECT test_case_id, title, problem_id, is_hidden FROM testcases 
    WHERE test_case_id = COALESCE(__test_case_id, test_case_id)
    AND title = COALESCE(__title, title)
    AND problem_id = COALESCE(__problem_id, problem_id)
    AND is_hidden = COALESCE(__is_hidden, is_hidden)
    ORDER BY test_case_id
    LIMIT __result_limit_start, __result_limit_size;
END$$

CREATE PROCEDURE procedure_add_contest (
    IN __title VARCHAR(255),
    IN __description MEDIUMTEXT,
    IN __start_time DATETIME,
    IN __end_time DATETIME,
    IN __scoring_rule ENUM('IOI', 'ICPC'),
    IN __organizer_id INT,
    IN __is_published BOOLEAN,
    IN __is_plagiarism_check_enabled BOOLEAN
) BEGIN
    START TRANSACTION;
    INSERT INTO contests (
        title,
        description,
        start_time,
        end_time,
        scoring_rule,
        organizer_id,
        is_published,
        is_plagiarism_check_enabled
    ) VALUES (
        __title,
        __description,
        __start_time,
        __end_time,
        __scoring_rule,
        __organizer_id,
        __is_published,
        __is_plagiarism_check_enabled
    );
    COMMIT;
END$$

CREATE PROCEDURE procedure_edit_contest  (
    IN __contest_id INT,
    IN __title VARCHAR(255),
    IN __description MEDIUMTEXT,
    IN __start_time DATETIME,
    IN __end_time DATETIME,
    IN __scoring_rule ENUM('IOI', 'ICPC'),
    IN __organizer_id INT,
    IN __is_published BOOLEAN,
    IN __is_plagiarism_check_enabled BOOLEAN
) BEGIN
    START TRANSACTION;
    UPDATE contests
    SET title = COALESCE(__title, title),
    description = COALESCE(__description, description),
    start_time = COALESCE(__start_time, start_time),
    end_time = COALESCE(__end_time, end_time),
    scoring_rule = COALESCE(__scoring_rule, scoring_rule),
    organizer_id = COALESCE(__organizer_id, organizer_id),
    is_published = COALESCE(__is_published, is_published),
    is_plagiarism_check_enabled = COALESCE(__is_plagiarism_check_enabled, is_plagiarism_check_enabled)
    WHERE contest_id = __contest_id;
    COMMIT;
END$$

CREATE PROCEDURE procedure_delete_contest (
    IN __contest_id INT
) BEGIN
    START TRANSACTION;
    DELETE FROM contests 
    WHERE contest_id = __contest_id;
    COMMIT;
END$$

CREATE PROCEDURE procedure_get_contest_by_id (
    IN __contest_id INT
) BEGIN
    SELECT * FROM contest 
    WHERE contest_id = __contest_id;
END$$

CREATE PROCEDURE procedure_find_contests  (
    IN __contest_id INT,
    IN __title VARCHAR(255),
    IN __start_time DATETIME,
    IN __scoring_rule ENUM('IOI', 'ICPC'),
    IN __organizer_id INT
) BEGIN
    SELECT contest_id, title, start_time, end_time, is_published FROM contests
    WHERE IF(
        __title IS NOT NULL,
        title LIKE CONCAT(__title, "%") OR 
        MATCH(title) AGAINST (__title IN BOOLEAN MODE),
        TRUE
    )
    AND start_time = COALESCE(__start_time, start_time)
    AND scoring_rule = COALESCE(__scoring_rule, scoring_rule)
    AND organizer_id = COALESCE(__organizer_id, organizer_id);
END$$

CREATE PROCEDURE procedure_add_problem_to_contest (
    IN __contest_id INT,
    IN __problem_id INT,
    IN __point INT
) BEGIN 
    START TRANSACTION;
    INSERT INTO contestproblems (contest_id, problem_id, point)
    VALUES (__contest_id, __problem_id, __point);
    COMMIT;
END$$

CREATE PROCEDURE procedure_edit_problem_point_in_contest (
    IN __contest_id INT,
    IN __problem_id INT,
    IN __point INT
) BEGIN 
    START TRANSACTION;
    UPDATE contestproblems
    SET point = __point
    WHERE contest_id = __contest_id
    AND problem_id = __problem_id;
    COMMIT;
END$$

CREATE PROCEDURE procedure_delete_problem_from_contest (
    IN __contest_id INT,
    IN __problem_id INT
) BEGIN 
    START TRANSACTION;
    DELETE FROM contestproblems
    WHERE contest_id = __contest_id
    AND problem_id = __problem_id;
    COMMIT;
END$$

CREATE PROCEDURE procedure_get_problems_in_contest (
    IN __contest_id INT
) BEGIN
    SELECT problem_id FROM contestproblems
    WHERE contest_id = __contest_id;
END$$

CREATE PROCEDURE procedure_get_problems_in_contest_ex (
    IN __contest_id INT
) BEGIN
    SELECT problems.problem_id, problems.title,
    problems.difficulty, contestproblems.point
    FROM contestproblems
    JOIN problems USING (problem_id)
    WHERE contest_id = __contest_id;
END$$

CREATE PROCEDURE procedure_add_submission (
    IN __user_id INT,
    IN __problem_id INT,
    IN __contest_id INT,
    IN __source_code_language VARCHAR(15),
    IN __source_code_file_id INT,
    IN __status ENUM(
        'AC',
        'P',
        'J',
        'WA',
        'TLE',
        'MLE',
        'RTE',
        'CE',
        'D'
    ),
    IN __compiler_message MEDIUMTEXT
) BEGIN
    START TRANSACTION;
    INSERT INTO submissions (
        user_id,
        problem_id,
        contest_id,
        submitted_at,
        source_code_language,
        source_code_file_id,
        status,
        compiler_message
    ) VALUES (
        __user_id,
        __problem_id,
        __contest_id,
        NOW(),
        __source_code_language,
        __source_code_file_id,
        __status,
        __compiler_message
    );
    COMMIT;
END$$

CREATE PROCEDURE procedure_edit_submission (
    IN __submission_id INT,
    IN __user_id INT,
    IN __problem_id INT,
    IN __contest_id INT,
    IN __source_code_language VARCHAR(15),
    IN __source_code_file_id INT,
    IN __status ENUM(
        'AC',
        'P',
        'J',
        'WA',
        'TLE',
        'MLE',
        'RTE',
        'CE',
        'D'
    ),
    IN __compiler_message MEDIUMTEXT
) BEGIN
    START TRANSACTION;
    UPDATE submissions 
    SET user_id = COALESCE(__user_id, user_id),
    problem_id = COALESCE(__problem_id, problem_id),
    contest_id = COALESCE(__contest_id, contest_id),
    source_code_language = COALESCE(__source_code_language, source_code_language),
    source_code_file_id = COALESCE(__source_code_file_id, source_code_file_id),
    status = COALESCE(__status, status),
    compiler_message = COALESCE(__compiler_message, compiler_message)
    WHERE submission_id = __submission_id;
    COMMIT;
END$$

CREATE PROCEDURE procedure_delete_submission (
    IN __submission_id INT
) BEGIN
    START TRANSACTION;
    DELETE FROM submissions
    WHERE submission_id = __submission_id;
    COMMIT;
END$$

CREATE PROCEDURE procedure_get_submission_by_id (
    IN __submission_id INT
) BEGIN
    SELECT * FROM submissions
    WHERE submission_id = __submission_id;
END$$

CREATE PROCEDURE procedure_find_submissions(
    IN __submission_id INT,
    IN __user_id INT,
    IN __problem_id INT,
    IN __contest_id INT,
    IN __source_code_language VARCHAR(15),
    IN __source_code_file_id INT,
    IN __status ENUM(
        'AC',
        'P',
        'J',
        'WA',
        'TLE',
        'MLE',
        'RTE',
        'CE',
        'D'
    )
) BEGIN
    SELECT submission_id, user_id, problem_id, 
    contest_id, submitted_at, source_code_language, status
    FROM submissions 
    WHERE submission_id = __submission_id
    AND user_id = COALESCE(__user_id, user_id)
    AND problem_id = COALESCE(__problem_id, problem_id)
    AND contest_id = COALESCE(__contest_id, contest_id)
    AND source_code_language = COALESCE(__source_code_language, source_code_language)
    AND source_code_file_id = COALESCE(__source_code_file_id, source_code_file_id)
    AND status = COALESCE(__status, status);
END$$

CREATE PROCEDURE procedure_find_official_submissions_in_contest (
    IN __contest_id INT
) BEGIN
    SELECT submission_id, user_id, problem_id, 
    contest_id, submitted_at,
    source_code_language, status FROM submissions
    WHERE contest_id = __contest_id 
    AND is_submission_official(submission_id);
END$$

DROP PROCEDURE IF EXISTS procedure_get_contest_ranking;

CREATE PROCEDURE procedure_get_contest_ranking (
    IN __contest_id INT,
    IN __limit_range_start INT,
    IN __limit_range_size INT
) BEGIN
    DECLARE __scoring_rule ENUM("IOI", "ICPC");
    DECLARE __contest_start_time DATETIME;
    DECLARE __contest_end_time DATETIME;
    DECLARE __contest_duration INT;

    SET __scoring_rule = (
        SELECT scoring_rule FROM contests
        WHERE contest_id = __contest_id
    );
    SET __contest_start_time = (
        SELECT start_time FROM contests
        WHERE contest_id = __contest_id
    );
    SET __contest_end_time = (
        SELECT end_time FROM contests
        WHERE contest_id = __contest_id
    );
    SET __contest_duration = 
    TIMESTAMPDIFF(MINUTE, __contest_start_time, __contest_end_time);
    
    SELECT current_contest_official_accepted_submissions.user_id 
    AS user_id,
    IF(
        __scoring_rule = "ICPC", 
        COUNT(problem_id) * 10000 -
        SUM(TIMESTAMPDIFF(MINUTE, __contest_start_time, solved_at)) -
        (SUM(number_of_submissions) - COUNT(problem_id)) * 20, 
        SUM(
            problem_score * 
            (TIMESTAMPDIFF(MINUTE, solved_at, __contest_end_time)
            - 10 * (number_of_submissions - 1))
        ) DIV __contest_duration
    ) AS score
    FROM (
        SELECT user_id, problem_id, 
        MAX(submitted_at) AS solved_at FROM submissions
        WHERE contest_id = __contest_id
        AND is_submission_official(submission_id)
        AND status = "AC"
        GROUP BY user_id, problem_id
    ) AS current_contest_official_accepted_submissions
    JOIN (
        SELECT user_id, problem_id, COUNT(*) AS number_of_submissions 
        FROM submissions
        WHERE contest_id = __contest_id
        AND is_submission_official(submission_id)
        GROUP BY user_id, problem_id
    ) AS current_contest_number_of_official_submissions USING (user_id, problem_id)
    JOIN (
        SELECT problem_id, point AS problem_score FROM contestproblems
        WHERE contest_id = __contest_id
    ) AS current_contest_problem_score USING (problem_id) 
    GROUP BY user_id
    ORDER BY score DESC
    LIMIT __limit_range_start, __limit_range_size;
END$$

CREATE PROCEDURE procedure_get_solved_problems_in_contest_by_user (
    IN __contest_id INT,
    IN __user_id INT
) BEGIN
    SELECT current_contest_official_accepted_submissions.problem_id
    AS problem_id,
    current_contest_official_accepted_submissions.solved_at 
    AS solved_at,
    current_contest_number_of_official_submissions.number_of_submissions 
    AS number_of_submissions
    FROM (
        SELECT problem_id, 
        MAX(submitted_at) AS solved_at FROM submissions
        WHERE user_id = __user_id
        AND contest_id = __contest_id
        AND is_submission_official(submission_id)
        AND status = "AC"
        GROUP BY problem_id
    ) AS current_contest_official_accepted_submissions
    JOIN (
        SELECT problem_id, COUNT(*) AS number_of_submissions FROM submissions
        WHERE user_id = __user_id
        AND contest_id = __contest_id
        AND is_submission_official(submission_id)
        GROUP BY user_id, problem_id
    ) AS current_contest_number_of_official_submissions USING (problem_id);
END$$

CREATE PROCEDURE procedure_add_submission_results_by_submission(
    IN __submission_id INT,
    IN __test_case_id INT,
    IN __time_elapsed INT,
    IN __memory_used INT,
    IN __output MEDIUMTEXT,
    IN __judge_message MEDIUMTEXT,
    IN __status ENUM(
        'AC',
        'P',
        'J',
        'WA',
        'TLE',
        'MLE',
        'RTE',
        'CE',
        'D'
    )
) BEGIN
    START TRANSACTION;
    INSERT INTO submissionresults (
        submission_id,
        test_case_id,
        time_elapsed,
        memory_used,
        output,
        judge_message,
        status
    ) VALUES (
        __submission_id,
        __test_case_id,
        __time_elapsed,
        __memory_used,
        __output,
        __judge_message,
        __status
    );
    COMMIT;
END

CREATE PROCEDURE procedure_delete_all_submission_results_of_problem_by_submission (
    IN __submission_id INT,
    IN __problem_id INT
) BEGIN
    START TRANSACTION;
    DELETE FROM submissionresults
    WHERE submission_id = __submission_id
    AND test_case_id IN (
        SELECT test_case_id FROM testcases
        WHERE problem_id = __problem_id
    );
    COMMIT;
END;

CREATE PROCEDURE procedure_get_submission_results_by_submission (
    IN __submission_id INT
) BEGIN
    SELECT * FROM submissionresults
    WHERE submission_id = __submission_id;
END;

CREATE PROCEDURE procedure_add_user (
    IN __user_name VARCHAR(15),
    IN __email VARCHAR(255),
    IN __password VARCHAR(31),
    IN __role SET("AD", "PS", "CU")
) BEGIN
    START TRANSACTION;
    INSERT INTO users (
        user_name,
        email,
        password,
        role,
        created_at,
        rating
    ) VALUES (
        __user_name,
        __email,
        __password,
        __role,
        NOW(),
        0
    );
    COMMIT;
END$$

CREATE PROCEDURE procedure_edit_user_attr (
    IN __user_id INT,
    IN __user_name VARCHAR(15),
    IN __email VARCHAR(255),
    IN __password VARCHAR(31),
    IN __role SET("AD", "PS", "CU"),
    IN __rating INT
) BEGIN
    START TRANSACTION;
    UPDATE users
    SET user_name = COALESCE(__user_name, user_name),
    email = COALESCE(__email, email),
    password = COALESCE(__password, password),
    role = COALESCE(__role, role),
    rating = COALESCE(__rating, rating)
    WHERE user_id = COALESCE(__user_id, user_id);
    COMMIT;
END$$

CREATE PROCEDURE procedure_delete_user(
    IN __user_id INT
) BEGIN
    START TRANSACTION;
    DELETE FROM users
    WHERE user_id = __user;
    COMMIT;
END$$

CREATE PROCEDURE procedure_get_user_by_id(
    IN __user_id INT
) BEGIN
    SELECT * FROM users
    WHERE user_id = __user_id;
END$$

CREATE PROCEDURE procedure_find_users(
    IN __user_id INT,
    IN __user_name VARCHAR(15),
    IN __email VARCHAR(255),
    IN __role SET("AD", "PS", "CU"),
    IN __rating_low INT,
    IN __rating_high INT,
    IN __limit_range_start INT,
    IN __limit_range_size INT
) BEGIN
    SELECT user_id, user_name, role, rating FROM users
    WHERE user_id = COALESCE(__user_id, user_id)
    AND user_name = COALESCE(__user_name, user_name)
    AND email = COALESCE(__email, email)
    AND role = COALESCE(__role, role)
    AND rating BETWEEN COALESCE(__rating_low, 0)
    AND COALESCE(__rating_high, 1000000)
    ORDER BY rating DESC
    LIMIT __limit_range_start, __limit_range_size;
END$$

CREATE PROCEDURE procedure_add_achievement(
    IN __user_id INT,
    IN __title VARCHAR(255)
) BEGIN
    START TRANSACTION;
    INSERT INTO achievements(
        user_id, 
        title,
        is_verified
    )
    VALUES (
        __user_id,
        __title,
        FALSE
    );
    COMMIT;
END$$

CREATE PROCEDURE procedure_edit_achievement_attr(
    IN __achievement_id INT,
    IN __title VARCHAR(255),
    IN __attachment MEDIUMBLOB,
    IN __is_verified BOOLEAN
) BEGIN
    START TRANSACTION;
    UPDATE achievements
    SET title = COALESCE(__title, title),
    attachment = COALESCE(__attachment, attachment),
    is_verified = COALESCE(__is_verified, is_verified)
    WHERE achievement_id = __achievement_id;
    COMMIT;
END$$

CREATE PROCEDURE procedure_delete_achievement(
    IN __achievement_id INT
) BEGIN
    START TRANSACTION;
    DELETE FROM achievements
    WHERE achievement_id = __achievement_id;
    COMMIT;
END$$

CREATE PROCEDURE procedure_get_achievement_by_id(
    IN __achievement_id INT
) BEGIN 
    SELECT * FROM achievements
    WHERE achievement_id = __achievement_id;
END$$

CREATE PROCEDURE procedure_get_achievements_by_user(
    IN __user_id INT
) BEGIN
    SELECT achievement_id, title, is_verified FROM achievements
    WHERE user_id = __user_id;
END$$

CREATE TRIGGER trigger_after_insert_submissions
AFTER INSERT ON submissions
FOR EACH ROW BEGIN 
    IF NEW.status NOT IN ('CE', 'P') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Only CE and P are allowed for inserting';
    ELSE
        IF ((SELECT COUNT(*) FROM contestsparticipated 
        WHERE user_id = NEW.user_id 
        AND contest_id = NEW.contest_id) = 0 AND 
        is_submission_official(NEW.submission_id)) 
        THEN
            INSERT INTO contestsparticipated (user_id, contest_id)
            VALUES (NEW.user_id, NEW.contest_id);
        END IF;
    END IF;
END$$

CREATE TRIGGER trigger_after_update_submissions
AFTER UPDATE ON submissions
FOR EACH ROW BEGIN 
    IF NEW.status = 'AC' THEN
        IF ((SELECT COUNT(*) FROM problemssolved
        WHERE user_id = NEW.user_id
        AND problem_id = NEW.problem_id) = 0) THEN
            INSERT INTO problemssolved (user_id, problem_id)
            VALUES (NEW.user_id, NEW.problem_id);
        END IF;
    END IF;
END$$

CREATE TRIGGER trigger_before_update_users
BEFORE UPDATE ON users
FOR EACH ROW BEGIN
    IF OLD.user_id = 1 THEN
        IF (OLD.user_name != NEW.user_name)
        OR (OLD.role != NEW.role)
        THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Cannot modify user_name and role of admin user';
        END IF;
    END IF;
END$$

CREATE TRIGGER trigger_before_delete_users
BEFORE DELETE ON users
FOR EACH ROW BEGIN
    IF OLD.user_id = 1 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete admin user';
    END IF;
END$$

CREATE TRIGGER trigger_after_insert_submission_results
AFTER INSERT ON submissionresults
FOR EACH ROW BEGIN
    IF (NEW.status != "AC") THEN
        UPDATE submissions 
        SET status = NEW.STATUS
        WHERE submission_id = NEW.submission_id;
    ELSE
        IF (
            (
                SELECT COUNT(*) FROM submissionresults
                WHERE submission_id = NEW.submission_id
                AND status = "AC"
            ) = (
                SELECT COUNT(*) FROM testcases
                WHERE testcases.problem_id = (
                    SELECT problem_id FROM submissions
                    WHERE submission_id = NEW.submission_id
                )
            )
        ) THEN
            UPDATE submissions 
            SET status = "AC"
            WHERE submission_id = NEW.submission_id;
        ELSE 
            UPDATE submissions 
            SET status = "J"
            WHERE submission_id = NEW.submission_id;
        END IF;
    END IF;
END$$

CREATE TRIGGER trigger_after_update_submission_results
AFTER UPDATE ON submissionresults
FOR EACH ROW BEGIN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Submission results for each test case should not be edited. 
    Please delete all related submission and insert again instead.';
END$$

DELIMITER;