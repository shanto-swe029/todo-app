const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'My_taskminder',
    password: '1234',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  }).promise();

const showTasks = async (email) => {
    let sql = `
        SELECT * FROM tasks
        WHERE email = ?
        ORDER BY timestamp_column ASC;
    `;
    return await pool.query(sql, [email]);
}

const addTask = async (taskId, taskName, email) => {
    let sql = `
        INSERT INTO tasks(taskId, taskName, email)
        VALUES (?, ?, ?)
    `;

    const something =  await pool.query(sql, [taskId, taskName, email]);
    console.log("something",something);
    return something;
}

const deleteTask = async (taskId) => {
    let sql = `
        DELETE FROM tasks
        WHERE taskId = ?
    `;

    return await pool.query(sql, taskId);
}

const editTask = async (taskId, taskName) => {
    console.log(taskId,taskName);
    let sql = `
        UPDATE tasks
        SET taskName = ?
        WHERE taskId = ?
    `;

    return await pool.query(sql, [taskName, taskId]);
}

const getTaskName = async (id) => {
    let sql = `
        SELECT taskName 
        FROM tasks 
        WHERE taskId = ?
    `
    return await pool.query(sql, id);
}

const addUser = async (username, email, hashedPassword) => {
    let sql = `
        INSERT INTO users
        VALUES("${username}", "${email}", "${hashedPassword}")
    `;

    return await pool.query(sql);
}

const getUser = async (email) => {
    console.log('check');
    let sql = `
        SELECT * FROM users
        WHERE email = "${email}"` ;
    const something = await pool.query(sql);
    console.log(something);
    
    return something;
}

module.exports = { showTasks, addTask, editTask, deleteTask, getTaskName, addUser, getUser }