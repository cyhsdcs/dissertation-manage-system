<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-user"></i>My students</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-table :data="studentList" style="width: 100%" border stripe height="500">
                <!-- 序号列 -->
                <el-table-column type="index"  label="Index" width="110"></el-table-column>
            
                <!-- 学生账号列 -->
                <el-table-column 
                    prop="student_account" 
                    label="Student Account"
                    width="250">
                </el-table-column>

                <!-- 学生账号列 -->
                <el-table-column 
                    prop="username" 
                    label="User Name" 
                    width="250">
                </el-table-column>

                <!-- 学生账号列 -->
                <el-table-column 
                    prop="score_progress" 
                    label="Progress Score" 
                    width="250">
                </el-table-column>

                <!-- 学生账号列 -->
                <el-table-column 
                    prop="score_final" 
                    label="Final Score" 
                    width="250">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                studentList: []
            }
        },
        mounted() {
            this.getStudentList();
        },
        methods: {
            getStudentList() {
                const self = this;	
                let username = sessionStorage.getItem('ms_username');
                console.log('account', username);
                self.$http.post('/api/user/getMyStudentList', { account: username }).then((response) => {
                    console.log('response', response);
                    let result = response.data;
                    console.log('result', result);
                    this.studentList = result;  // 直接赋值
                    console.log('studentList', this.studentList);
                }).catch((error) => {
                    console.error('Error fetching student list:', error);
                });
            }
        }
    }
</script>