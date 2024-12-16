const mysql = require('mysql2/promise');

// Create Connection Pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'qwe123',
    database: 'stupen',
});

// Define Schema
const query = async (sql, params) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(sql, params);
        return rows;
    } finally {
        connection.release();
    }
};
(async () => {

    await query(`
        CREATE TABLE IF NOT EXISTS courses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NULL,
            description TEXT NULL,
            category_id INT NULL,
            canva_url TEXT NULL,
            youtube_url TEXT NULL,
            image TEXT NULL,
            certificate TEXT NULL,
            summary TEXT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt DATETIME NULL,
            FOREIGN KEY (category_id) REFERENCES category_courses(id) ON DELETE CASCADE
        );
    `);
    await query(`
        CREATE TABLE IF NOT EXISTS course_modules (
            id INT AUTO_INCREMENT PRIMARY KEY,
            course_id INT NULL,
            title VARCHAR(255) NULL,
            description TEXT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt DATETIME NULL,
            FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
        );
    `);
    await query(`
        CREATE TABLE IF NOT EXISTS articles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255),
            description TEXT,
            category_id INT,
            image TEXT,
            source TEXT,
            deletedAt DATETIME,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES category_articles(id) ON DELETE CASCADE
        );
    `);
    await query(`
        CREATE TABLE IF NOT EXISTS article_comments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            comment_id INT,
            article_id INT,
            \`like\` INT,
            comment TEXT,
            deletedAt DATETIME,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
        );
    `);
    await query(`
        CREATE TABLE IF NOT EXISTS article_comment_likes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NULL,
            comment_id INT NULL,
            article_id INT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt DATETIME NULL
        );
    `);
    await query(`
        CREATE TABLE IF NOT EXISTS category_articles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt DATETIME NULL
        );
    `);
    await query(`
        CREATE TABLE IF NOT EXISTS category_courses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt DATETIME NULL
        );
    `);
    await query(`
        CREATE TABLE IF NOT EXISTS course_quizzes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            course_id INT NULL,
            question TEXT NULL,
            choices TEXT NULL,
            answer INT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt DATETIME NULL
        );
    
    `);
    await query(`
        CREATE TABLE IF NOT EXISTS course_quiz_users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NULL,
            quiz_id INT NULL,
            course_id INT NULL,
            answer TINYINT NULL,
            correct TINYINT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt DATETIME NULL
        );
    `);
    await query(`
        CREATE TABLE IF NOT EXISTS course_users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NULL,
            course_id INT NULL,
            step INT NULL,
            score INT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt DATETIME NULL
        );
    `);
    await query(`
        CREATE TABLE IF NOT EXISTS forum (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NULL,
            title TEXT NULL,
            question TEXT NULL,
            category_id INT NULL,
            image TEXT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt DATETIME NULL
        );
    `);
    await query(`
        CREATE TABLE IF NOT EXISTS forum_comment (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NULL,
            comment_id INT NULL,
            forum_id INT NULL,
            \`like\` INT NULL,
            comment TEXT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt DATETIME NULL
        );
    `);
    await query(`
        CREATE TABLE IF NOT EXISTS forum_comment_like (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NULL,
            comment_id INT NULL,
            forum_id INT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt DATETIME NULL
        );
    `);
    await query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NULL,
            dob DATE NULL,
            city VARCHAR(255) NULL,
            email VARCHAR(255) NULL,
            mobile_no VARCHAR(255) NULL,
            role_id VARCHAR(255) NULL,
            password TEXT NULL,
            image TEXT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt DATETIME NULL
        );
    `);
})();

module.exports = query;

