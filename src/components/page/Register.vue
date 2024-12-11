<template>
	<div>
		<div class="crumbs crumbs-register">
			<el-breadcrumb separator="/" class="register-title">
                <el-breadcrumb-item><i class="el-icon-setting"></i>注册</el-breadcrumb-item>
            </el-breadcrumb>
		</div>
		<div class="userContent">
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-form-item prop="name" label="Username">
					<el-input v-model="form.name" placeholder="Please enter your username"></el-input>
				</el-form-item>
				<el-form-item prop="account" label="Account">
					<el-input v-model="form.account" placeholder="Please enter your account"></el-input>
				</el-form-item>
				<el-form-item prop="pass" label="Password">
					<el-input v-model="form.pass" type="password" placeholder="Please enter your password"></el-input>
				</el-form-item>
				<el-form-item prop="checkPass" label="Confirm Password">
					<el-input v-model="form.checkPass" type="password" placeholder="Please enter your password again"></el-input>
				</el-form-item>
				<el-form-item prop="checkRole" label="Role">
					<el-select v-model="form.role" placeholder="Please select your role">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit('form')">Confirm</el-button>
					<el-button @click="onCancle()">Cancel</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import Util from '../../utils/utils';
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.form.checkPass !== '') {
						this.$refs.form.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.pass) {
					callback(new Error('两次输入的密码不一致'));
				} else {
					callback();
				}
			};
            return {
				form: {
					name: '',
					account: '',					
					pass: '',
					checkPass: '',
					role: ''
                },
				options: [{
					value: 'teacher',
					label: 'Teacher'
				}, {
					value: 'student',
					label: 'Student'
				}],
                rules: {
                    name: [
                        { required: true, message: 'Please enter your username', trigger: 'blur' }
                    ],
                    account: [
                        { required: true, message: 'Please enter your account', trigger: 'blur' }
                    ],
                    pass: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true, validator: validatePass2, trigger: 'blur' }
                    ]
                }
			}
        },
        methods:{
        	onSubmit(formName) {
				if (this.form.role === '') {
					this.$message.error('Please select your role');
					return;
				}
				const self = this;			
				self.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.$http.post('/api/user/addUser',self.form).then(function(response) {
							console.log(response);
							self.$router.push('/register-success');
						}).then(function(error) {
							console.log(error);
						})
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
				
        	},
        	onCancle() {
        		this.$router.push('/login');
			},
			getDateTimes(str) {
				var str = new Date(str);
        		return str;
			}       	
        }
	}
</script>

<style>
	.crumbs-register {
		background-color: #324157;
		height: 50px;
		line-height: 50px;
	}
	.register-title {
		line-height: 50px;
		margin: 0 auto;
    	width: 50px;
    	font-size: 16px;
	}	
	.userContent {
		width: 400px;
		margin: 0 auto;
	}
	.select-sex {
		width: 320px;
	}
</style>