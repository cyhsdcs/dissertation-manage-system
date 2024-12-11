CREATE TABLE `user` (
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `account` varchar(50) NOT NULL COMMENT '账号',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `repeatPass` varchar(100) NOT NULL COMMENT '重复密码',
  `role` varchar(10) NOT NULL COMMENT '角色'
);

CREATE TABLE `teacher_student` (
  `teacher_account` varchar(255) NOT NULL COMMENT '教师ID',
  `student_account` varchar(255) NOT NULL COMMENT '学生ID'
);

CREATE TABLE `student_score` (
  `student_account` varchar(255) NOT NULL COMMENT '学生ID',
  `score_progress` varchar(255)  COMMENT '分数1',
  `score_final` varchar(255)  COMMENT '分数2'
);

INSERT INTO teacher_student (teacher_account, student_account) 
VALUES ('teacher', 'student1');

INSERT INTO teacher_student (teacher_account, student_account) 
VALUES ('teacher', 'student2');

INSERT INTO teacher_student (teacher_account, student_account) 
VALUES ('teacher', 'student3');

INSERT INTO user values('admin','admin','admin','admin','admin');
INSERT INTO user values('teacher','teacher','teacher','teacher','teacher');
INSERT INTO user values('teacher2','teacher2','teacher2','teacher2','teacher');
INSERT INTO user values('teacher3','teacher3','teacher3','teacher3','teacher');
INSERT INTO user values('student1','student1','student1','student1','student');
INSERT INTO user values('student2','student2','student2','student2','student');
INSERT INTO user values('student3','student3','student3','student3','student');
INSERT INTO user values('student4','student4','student4','student4','student');
INSERT INTO user values('student5','student5','student5','student5','student');
INSERT INTO user values('student6','student6','student6','student6','student');
INSERT INTO user values('student7','student7','student7','student7','student');
INSERT INTO user values('student8','student8','student8','student8','student');
INSERT INTO user values('student9','student9','student9','student9','student');

INSERT INTO student_score values('student1','90','80');
INSERT INTO student_score values('student2','80',NULL);

