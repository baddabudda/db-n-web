// library dependencies
const jwt = require('jsonwebtoken');
// local dependencies
const errorHandler = require('../utils/errorHandler.js');
const groupModel = require('../models/groupModel.js');
const facultyModel = require('../models/facultyModel.js');
const programModel = require('../models/programModel.js');
const userModel = require('../models/userModel.js');
const keys = require('../config/keys.js');

// check group name & course value
const checkContents = ({ group_name, course }) => {
    let errors = {
        group_name: undefined,
        course: undefined
    }
    let pass = true;
    
    if (!contents.group_name) {
        errors.group_name = 'Group name is empty';
        pass = false;
    }
    if (isNaN(parseInt(contents.course))){
        errors.course = 'Course is not a number';
        pass = false;
    }

    return { pass, errors };
}

// generate json web token
const maxAge = 1 * 24 * 60 * 60; // 1 day
const createToken = ({ group_id }) => {
    return jwt.sign({ group_id }, keys.webtoken, {
        expiresIn: maxAge
    });
}

// check whether form sent correct faculty/program ids (that corresponds to db rows)
const checkMatch = async({ faculty_id, program_id }) => {
    let errors = {
        faculty: undefined,
        program: undefined
    }
    let pass = true;

    if (!await facultyModel.findFacultyById({ faculty_id: faculty_id })) {
        errors.faculty = "Faculty with given id doesn't exist";
        pass = false;
    }
    if (!await programModel.findProgramById({ program_id: program_id })) {
        errors.program = "Program with given id doesn't exist";
        pass = false;
    }

    return { pass, errors };
}

// GET-request for showing group info
module.exports.groupInfo_get = async (req, res) => {
    try {
        let group_id = parseInt(req.params.id);
        if (isNaN(group_id)){
            throw new Error("Group id is not a number");
        }
        if (!await groupModel.getGroupById({ group_id: group_id })){
            throw new Error("Group with given id not found");
        }
        if (req.user.group_id !== group_id){
            throw new Error("Access denied: not a member");
        }

        let groupInfo = await groupModel.getGroupInfoById({ group_id: req.params.group_id });
        res.status(200).json({ 
            group_name: groupInfo.group_name, 
            faculty_name: groupInfo.faculty_name,
            program_name: groupInfo.program_name,
            course: groupInfo.course,
            group_admin: groupInfo.group_admin
        });
    } catch (error) {
        errorHandler({ res: res, code: 500, error: error.message });
    }
}

module.exports.createGroup_post = async (req, res) => {
    try {
        let content = checkContents({
            group_name: req.body.group_name,
            course: req.body.course
        });
        
        if (!content.pass) {
            throw new Error(`${ content.errors.group_name ? content.errors.group_name : content.errors.course }`);
        }

        let match = checkMatch({
            faculty_id: req.body.faculty_id,
            program_id: req.body.program_id
        }).then (result => {
            if (!result.pass) {
                throw new Error(`${ result.errors.faculty ? result.errors.faculty : result.errors.program }`);
            }
        }).catch (error => {
            throw new Error("Unexpected error in matching ids");
        })

        if (req.user.group_id) {
            throw new Error("User is a member of another group already");
        }

        // if no errors, then begin transaction
        let connection = undefined;

        try {
            // get connection
            connection = await pool.promise().getConnection();
            // if we have connection, then make queries
            // set isolation level and begin transaction
            await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
            await connection.beginTransaction();
            await connection.execute("LOCK TABLES academgroups WRITE");

            await groupModel.createGroup({
                faculty_id: req.body.faculty_id,
                program_id: req.body.program_id,
                admin_id: req.user.user_id,
                group_name: req.body.group_name,
                course: req.body.course
            });

            let group_id = await connection.execute("SELECT LAST_INSERT_ID()");

            await userModel.joinGroup({ user_id: req.user.user_id, group_id: group_id});

            await connection.execute("UNLOCK TABLES");
            // the end of transaction: commit changes and release connection {id: order, id: order, id: order}
            await connection.commit();
            pool.releaseConnection(connection);
        } catch (error) {
            // cancel transaction results and release connection
            connection.rollback();
            console.error(error);
            pool.releaseConnection(connection);
            throw new Error('Cannot execute query');
        }
    } catch (error) {
        let displayError = new Error("Couldn't create group: " + error.message);
        errorHandler({ res: res, code: 406, error: displayError});
    }
}

module.exports.editGroup_post = async (req, res) => {
    try {
        let content = checkContents({
            group_name: req.body.group_name,
            course: req.body.course
        });

        if (!content.pass) {
            throw new Error(`${ content.errors.group_name ? content.errors.group_name : content.errors.course }`);
        }

        let admin_id = await groupModel.getGroupAdmin({ group_id: req.params.group_id });
        if (req.user.user_id !== admin_id) {
            throw new Error("Access denied: not group admin");
        }

        await groupModel.editGroup({
            group_id: req.body.group_id,
            group_name: req.body.group_name,
            course: req.body.course
        });
    } catch (error) {
        let displayError = new Error("Couldn't update group info: " + error.message);
        errorHandler({ res: res, code: 406, error: displayError.message });
    }
}

// generate new token as invitation group; must return link
module.exports.generateInvitation_get = async (req, res) => {
    try {
        let admin_id = await groupModel.getGroupAdmin({ group_id: req.params.group_id });
        if (req.user.user_id !== admin_id) {
            throw new Error("Access denied: not group admin");
        }

        const token = createToken({ group_id: req.body.group_id });
        await groupModel.assignToken({
            group_id: req.body.group_id,
            access_token: token
        });

        // exam.me/join/group/:access_token
        res.status(200).json(`/join/group/${token}`);
    } catch (error) {
        errorHandler({ res: res, code: 500, error: "Can't generate token" });
    }
}

// module.exports.closeGroup_post = async (req, res) => {
//
// }