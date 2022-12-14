const executor = require('./executor.js');

// === QUESTION - LISTS requests ===
module.exports.getAllQuestionsByListId = ({ list_id }) => {
    return executor.execute({
        query:
            "SELECT * FROM question WHERE list_id = ?",
        params: [list_id],
        single: false
    });
};

// === QUESTION inner requests ===
module.exports.checkInDatabase = ({ questId, listId }) => {
    let res = executor.execute({
        query:
            "SELECT * FROM question WHERE question_id = ? AND list_id = ? AND is_deleted = 0",
        params: [questId, listId],
        single: false
    })
    return res;
}

// module.exports.checkOrder = ({ listId, order }) => {
//     return executor.execute({
//         query:
//             "SELECT * FROM question WHERE list_id = ? AND question_order = ? AND is_deleted = 0",
//         params: [listId, order],
//         single: true
//     });
// }

module.exports.createQuestion = ({ connection, listId, date, order, title, body }) => {
    return executor.execute({
        connection: connection,
        query:
            "INSERT INTO question (list_id, edit_date, question_order, question_title, question_body, is_deleted) " +
            "VALUE (?, ?, ?, ?, ?, 0)",
        params: [listId, date, order, title, body],
        single: true
    });
}

module.exports.selectQuestionForUpdate = ({ connection, questId }) => {
    return executor.execute({
        connection: connection,
        query: 
            "SELECT * FROM question WHERE question_id = ?",
        params: [questId],
        single: true
    });
}

module.exports.updateQuestion = ({ connection, questId, date, order, title, body }) => {
    return executor.execute({
        connection: connection,
        query:
            "UPDATE question SET edit_date = ?, question_order = ?, question_title = ?, question_body = ? WHERE question_id = ?",
        params: [date, order, title, body, questId],
        single: true
    });
}

module.exports.updateOrder = ({ connection, listId, questId, order }) => {
    return executor.execute({
        connection: connection,
        query:
            "UPDATE question SET question_order = ? WHERE question_id = ? AND list_id = ?",
        params: [order, questId, listId],
        single: true
    });
}

module.exports.markDeleted = ({ connection, listId, questId }) => {
    return executor.execute({
        connection: connection,
        query:
            "UPDATE question SET is_deleted = 1 WHERE list_id = ? AND question_id = ?",
        params: [listId, questId],
        single: true
    });
}

module.exports.getQuestionById = ({ question_id, list_id }) => {
    return executor.execute({
        query:
            "SELECT * FROM question WHERE question_id = ? AND list_id = ?",
        params: [question_id, list_id],
        single: true
    });
}

// === VERSIONED inner requests ===
module.exports.createVersion = ({ connection, date, listId, userId, questId, title, body }) => {
    return executor.execute({
        connection: connection,
        query:
            "INSERT INTO versioned (edit_date, list_id, " +
            "user_id, question_id, question_title," + 
            "question_body) " +
            "VALUES (?, ?, ?, ?, ?, ?)",
        params: [date, listId, userId, questId, title, body],
        single: true
    });
}

module.exports.checkVersion = ({ list_id, question_id, version_id }) => {
    return executor.execute({
        query:
            "SELECT * FROM versioned WHERE version_id = ? AND question_id = ? AND list_id = ?",
        params: [version_id, question_id, list_id],
        single: true
    });
}

// === QUESTION - VERSIONED requests ===

module.exports.exportToVersion = ({ connection, question_id, user_id }) => {
    return executor.execute({
        connection: connection,
        query:
            "INSERT INTO versioned (edit_date, list_id, " +
            "user_id, question_id, question_title, " +
            "question_body) SELECT edit_date, list_id, ?, " +
            "question_id, question_title, question_body FROM question " +
            "WHERE question_id = ?",
        params: [user_id, question_id],
        single: true
    });
}

module.exports.getVersionsByQuestionId = ({ questId }) => {
    return executor.execute({
        query:
            "SELECT * FROM versioned WHERE question_id = ?",
        params: [questId],
        single: false
    });
}

module.exports.updateFromVersion = ({ connection, edit_date, version_id }) => {
    return executor.execute({
        connection: connection,
        query: 
            "UPDATE question INNER JOIN versioned ON (question.question_id = versioned.question_id) " +
            "SET question.question_title = versioned.question_title, question.question_body = versioned.question_body, " +
            "question.edit_date = ?, question.is_deleted = 0 WHERE versioned.version_id = ?",
        params: [edit_date, version_id],
        single: true
    });
}

module.exports.checkAccess = ({user_id, group_host_id}) => {
    return executor.execute({
        query:
            "SELECT * FROM users WHERE users.group_id = ? AND users.user_id = ?",
        params: [group_host_id, user_id],
        single: false
    });
}