<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i>Assign students</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-table :data="studentList" style="width: 100%" border stripe height="500">
                <!-- 序号列 -->
                <el-table-column type="index"  label="Index" width="110"></el-table-column>
            
                <!-- 学生账号列 -->
                <el-table-column 
                    prop="account" 
                    label="Student Account"
                    width="250">
                </el-table-column>

                <!-- 学生账号列 -->
                <el-table-column 
                    prop="username" 
                    label="User Name" 
                    width="250">
                </el-table-column>

                <!-- 操作列 -->
                <el-table-column label="Actions" width="200">
                    <template slot-scope="scope">
                        <el-button 
                            size="mini" 
                            type="primary"
                            @click="handleButtonClick(scope.row)">Assign</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>  
            <el-dialog title="Grade" :visible.sync="dialogVisible" width="30%">
                <el-form :model="scoreForm" label-width="120px">
                    <el-form-item prop="checkRole" label="Role">
                        <el-select v-model="scoreForm.teacher_account" placeholder="Please select your role">
                            <el-option
                                v-for="item in teacherList"
                                :key="item.account"
                                :label="item.username"
                                :value="item.account">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="submit">Submit</el-button>
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
                    account: '',
                    username: '',
                    teacher_account: '',
                    teacher_name: ''
                },
                teacherList: []
            }
        },
        mounted() {
            this.getStudentList();
        },
        methods: {
            getStudentList() {
                const self = this;	
                self.$http.post('/api/user/getAllStudent', { }).then((response) => {
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
                let self = this;
                self.$http.post('/api/user/getAllTeacher', { }).then((response) => {
                    console.log('response', response);
                    let result = response.data;
                    console.log('result', result);
                    this.teacherList = result;  // 直接赋值
                    console.log('teacherList', this.teacherList);
                    self.$http.post('/api/user/getUser',{name: self.scoreForm.teacher_account}).then((response) =>{
                        console.log('response',response);
                        let result = response.data[0];
                        console.log('result',result);
                        console.log(typeof result);
                        self.scoreForm.teacher_name = result.username;
                        this.dialogVisible = true;
                    }).catch((error) => {
                        console.error('Error fetching student list:', error);
                    });
                }).catch((error) => {
                    console.error('Error fetching student list:', error);
                });
            },
            submit() {
                console.log('submit', this.scoreForm);
                const self = this;
                self.$http.post('/api/user/assignStudent', {student_account: self.scoreForm.account, teacher_account: self.scoreForm.teacher_account}).then((response) => {
                    console.log('response', response);
                    this.$notify({
                        title: 'Success',
                        message: 'Assign Success',
                        type: 'success'
                    });
                    this.dialogVisible = false;
                }).catch((error) => {
                    console.error('Error fetching student list:', error);
                });
            }
        }
    }
</script>