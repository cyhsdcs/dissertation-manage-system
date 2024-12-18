var sqlMap = {
    user: {
        add: 'insert into user (username, account, password, repeatPass, role) values (?,?,?,?,?)',
        select_name: 'select * from user', 
        update_user: 'update user set password = ?, repeatPass = ? where account = ?',
        select_my_student: 'select ts.student_account, u.username, ss.score_progress, ss.score_final from teacher_student as ts left join user as u on ts.student_account = u.account left join student_score as ss on ts.student_account = ss.student_account',
        select_not_graded: 'select ts.student_account, u.username, ss.score_progress, ss.score_final from teacher_student as ts left join user as u on ts.student_account = u.account left join student_score as ss on ts.student_account = ss.student_account where ss.score_final is null or ss.score_progress is null',
        insert_score: 'INSERT INTO student_score (student_account, score_progress, score_final)  VALUES ( ?, ?, ?)',
        update_score: 'UPDATE student_score SET score_progress = ?, score_final = ? WHERE student_account = ?',
        select_score: 'SELECT * FROM student_score WHERE student_account = ?',
        select_student_by_account: 'SELECT * FROM user left join teacher_student on user.account = teacher_student.student_account WHERE user.role = \'student\'',
        select_teacher: 'SELECT username, account FROM user WHERE role = \'teacher\';',
        insert_assign_student: 'INSERT INTO teacher_student (teacher_account, student_account) VALUES (?, ?);',
        update_assign_student: 'UPDATE teacher_student SET teacher_account = ? WHERE student_account = ?;'
    }
}

module.exports = sqlMap;