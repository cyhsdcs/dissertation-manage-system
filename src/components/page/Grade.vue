<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-user"></i>Grade</el-breadcrumb-item>
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
                    width="200">
                </el-table-column>

                <!-- 学生账号列 -->
                <el-table-column 
                    prop="username" 
                    label="User Name" 
                    width="200">
                </el-table-column>

                <!-- 学生账号列 -->
                <el-table-column 
                    prop="score_progress" 
                    label="Progress Score" 
                    width="200">
                </el-table-column>

                <!-- 学生账号列 -->
                <el-table-column 
                    prop="score_final" 
                    label="Final Score" 
                    width="200">
                </el-table-column>

                <!-- 操作列 -->
                <el-table-column label="Actions" width="200">
                    <template slot-scope="scope">
                        <el-button 
                            size="mini" 
                            type="primary"
                            @click="handleButtonClick(scope.row)">Grade</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>  
            <el-dialog title="Grade" :visible.sync="dialogVisible" width="30%">
                <el-form :model="scoreForm" label-width="120px">
                    <el-form-item label="Progress Score">
                        <el-input v-model="scoreForm.score_progress" type="number"
                        :disabled=temp></el-input>
                    </el-form-item>
                    <el-form-item label="Final Score">
                        <el-input v-model="scoreForm.score_final" type="number"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="submitScores">Submit</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                studentList: [],
                dialogVisible: false,
                scoreForm: {
                    username: '',
                    student_account: '',
                    score_progress: '',
                    score_final: ''
                },
                temp: false
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
                self.$http.post('/api/user/getNotGraded', { account: username }).then((response) => {
                    console.log('response', response);
                    let result = response.data;
                    console.log('result', result);
                    this.studentList = result;  // 直接赋值
                    console.log('studentList', this.studentList);
                }).catch((error) => {
                    console.error('Error fetching student list:', error);
                });
            },
            handleButtonClick(row) {
                console.log('row', row);
                this.scoreForm = row;
                console.log('scoreForm', this.scoreForm);
                if(this.scoreForm.score_progress !== null && this.scoreForm.score_progress !== '') {
                    this.temp = true;
                }
                this.dialogVisible = true;
            },
            submitScores() {
                console.log('submitScores', this.scoreForm);
                const self = this;	
                self.$http.post('/api/user/submitScores', self.scoreForm).then((response) => {
                    console.log('response', response);
                    this.$notify({
                        title: 'Success',
                        message: 'Submit Success',
                        type: 'success'
                    });
                    this.temp = false;
                    this.dialogVisible = false;
                }).catch((error) => {
                    console.error('Error submiting:', error);
                });
            }
        }
    }
</script>