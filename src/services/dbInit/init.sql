-- Schema: https://drive.google.com/file/d/1LXLR8uFOKzCWZ5iASw4Rbs8xYwgfgVkW/view?usp=drive_link

DROP DATABASE IF EXISTS ojdb;

CREATE DATABASE ojdb;

USE ojdb;

CREATE TABLE Users (
    user_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password CHAR(31) NOT NULL,
    role SET("AD", "PS", "CU") NOT NULL,
    created_at DATETIME NOT NULL,
    rating INT NOT NULL,
    PRIMARY KEY (user_id),
    INDEX index_user_name (user_name),
    INDEX index_rating (rating)
) ENGINE = InnoDB CHARSET = utf8;

DELIMITER $$

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

DELIMITER;

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
        "admin",
        "admin@example.com",
        "admin",
        "AD,PS,CU",
        NOW(),
        0
    );

CREATE TABLE Contests (
    contest_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    scoring_rule ENUM("IOI", "ICPC") NOT NULL,
    organizer_id INT NOT NULL,
    PRIMARY KEY (contest_id),
    FOREIGN KEY (organizer_id) REFERENCES Users (user_id),
    INDEX index_start_time (start_time),
    FULLTEXT (title)
) ENGINE = InnoDB CHARSET = utf8;

DELIMITER $$

CREATE TRIGGER trigger_before_update_contests
BEFORE UPDATE ON contests
FOR EACH ROW BEGIN
    IF OLD.contest_id = 1 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot modify special contest';
    END IF;
END$$

CREATE TRIGGER trigger_before_delete_contests
BEFORE DELETE ON contests
FOR EACH ROW BEGIN
    IF OLD.contest_id = 1 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete special contest';
    END IF;
END$$

DELIMITER;

INSERT INTO
    contests (
        title,
        start_time,
        end_time,
        scoring_rule,
        organizer_id
    )
VALUES (
        "Outside Contest",
        "2000-01-01 00:00:00",
        "2000-01-01 00:10:00",
        "IOI",
        1
    );

CREATE TABLE Problems (
    problem_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    statement MEDIUMTEXT NOT NULL,
    difficulty INT NOT NULL,
    time_limit INT NOT NULL,
    memory_limit INT NOT NULL,
    input_format VARCHAR(15) NOT NULL,
    output_format VARCHAR(15) NOT NULL,
    solution_text MEDIUMTEXT,
    created_at DATETIME NOT NULL,
    creator_id INT NOT NULL,
    PRIMARY KEY (problem_id),
    FOREIGN KEY (creator_id) REFERENCES Users (user_id),
    INDEX index_difficulty (difficulty),
    INDEX index_created_at (created_at),
    FULLTEXT (title)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE Submissions (
    submission_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    problem_id INT NOT NULL,
    contest_id INT NOT NULL DEFAULT 1,
    submitted_at DATETIME NOT NULL,
    source_code_language VARCHAR(15) NOT NULL,
    source_code_file_id INT NOT NULL,
    status ENUM(
        "AC",
        "P",
        "J",
        "WA",
        "TLE",
        "MLE",
        "RTE",
        "CE",
        "D"
    ) NOT NULL DEFAULT "P",
    PRIMARY KEY (submission_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id),
    FOREIGN KEY (problem_id) REFERENCES Problems (problem_id),
    FOREIGN KEY (contest_id) REFERENCES Contests (contest_id),
    INDEX index_status (status)
) ENGINE = InnoDB CHARSET = utf8;

DELIMITER $$

CREATE TRIGGER trigger_after_insert_submissions
AFTER INSERT ON submissions
FOR EACH ROW BEGIN 
    IF NEW.status NOT IN ('CE', 'P') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Only CE and P are allowed for inserting';
    ELSEIF NEW.contest_id != 1 THEN 
        IF ((SELECT COUNT(*) FROM contestsparticipated 
        WHERE user_id = NEW.user_id 
        AND contest_id = NEW.contest_id) = 0) 
        THEN
            INSERT INTO contestsparticipated (user_id, contest_id)
            VALUES (NEW.user_id, NEW.contest_id);
        END IF;
    END IF;
END$$

CREATE TRIGGER trigger_after_update_submissions
AFTER UPDATE ON submissions
FOR EACH ROW BEGIN 
    IF NEW.status = "AC" THEN
        IF ((SELECT COUNT(*) FROM problemssolved
        WHERE user_id = NEW.user_id
        AND problem_id = NEW.problem_id) = 0) THEN
            INSERT INTO problemssolved (user_id, problem_id)
            VALUES (NEW.user_id, NEW.problem_id);
        END IF;
    END IF;
END$$

DELIMITER;

CREATE TABLE ContestsParticipated (
    user_id INT NOT NULL,
    contest_id INT NOT NULL,
    PRIMARY KEY (user_id, contest_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id),
    FOREIGN KEY (contest_id) REFERENCES Contests (contest_id)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE ProblemsSolved (
    user_id INT NOT NULL,
    problem_id INT NOT NULL,
    PRIMARY KEY (user_id, problem_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id),
    FOREIGN KEY (problem_id) REFERENCES Problems (problem_id)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE ContestProblems (
    problem_id INT NOT NULL,
    contest_id INT NOT NULL,
    point INT NOT NULL,
    PRIMARY KEY (contest_id, problem_id),
    FOREIGN KEY (problem_id) REFERENCES Problems (problem_id),
    FOREIGN KEY (contest_id) REFERENCES Contests (contest_id)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE TestCases (
    test_case_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    problem_id INT NOT NULL,
    input MEDIUMTEXT NOT NULL,
    expected_output MEDIUMTEXT NOT NULL,
    PRIMARY KEY (test_case_id),
    FOREIGN KEY (problem_id) REFERENCES Problems (problem_id)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE SubmissionResults (
    submission_id INT NOT NULL,
    test_case_id INT NOT NULL,
    status ENUM(
        "AC",
        "P",
        "J",
        "WA",
        "TLE",
        "MLE",
        "RTE",
        "CE",
        "D"
    ) NOT NULL DEFAULT "P",
    PRIMARY KEY (submission_id, test_case_id),
    FOREIGN KEY (submission_id) REFERENCES Submissions (submission_id),
    FOREIGN KEY (test_case_id) REFERENCES TestCases (test_case_id)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE Achievements (
    achievement_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    attachment MEDIUMBLOB,
    isVerified BOOL NOT NULL,
    PRIMARY KEY (achievement_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE Notifications (
    notification_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    receiver_id INT NOT NULL,
    content MEDIUMTEXT NOT NULL,
    PRIMARY KEY (notification_id),
    FOREIGN KEY (receiver_id) REFERENCES Users (user_id)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE DiscussionMessages (
    message_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    sender_id INT NOT NULL,
    contest_id INT NOT NULL,
    parent_id INT,
    content MEDIUMTEXT NOT NULL,
    PRIMARY KEY (message_id),
    FOREIGN KEY (sender_id) REFERENCES Users (user_id),
    FOREIGN KEY (contest_id) REFERENCES Contests (contest_id),
    INDEX index_parent_id (parent_id)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE Tags (
    tag_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    tag_name VARCHAR(31) UNIQUE NOT NULL,
    tag_type ENUM("CATEGORY", "SOURCE") NOT NULL,
    PRIMARY KEY (tag_id),
    INDEX index_tag_name (tag_name)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE TaggedProblems (
    problem_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (problem_id, tag_id),
    FOREIGN KEY (problem_id) REFERENCES Problems (problem_id),
    FOREIGN KEY (tag_id) REFERENCES Tags (tag_id)
) ENGINE = InnoDB CHARSET = utf8;

CREATE TABLE PlagiarismReports (
    report_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    submission_id INT NOT NULL,
    moss_dump_file VARCHAR(255) NOT NULL,
    PRIMARY KEY (report_id),
    FOREIGN KEY (submission_id) REFERENCES Submissions (submission_id)
) ENGINE = InnoDB CHARSET = utf8;