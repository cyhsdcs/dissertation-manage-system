<template>
	<div>
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit"></i> Modify Password</el-breadcrumb-item>
            </el-breadcrumb>
		</div>
		<div class="userContent">
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-form-item prop="pass" label="Password">
					<el-input v-model="form.pass" type="password" placeholder="Please enter password"></el-input>
				</el-form-item>
				<el-form-item prop="checkPass" label="Confirm Password">
					<el-input v-model="form.checkPass" type="password" placeholder="Please enter password again"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="visible = true">Confirm</el-button>
					<el-button @click="onCancle()">Cancel</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div>
			<el-dialog title="Confirm" :visible.sync="visible" width="30%">
				<span>Are you sure to modify the password?</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="visible = false">Cancel</el-button>
					<el-button type="primary" @click="onSubmit('form')">Confirm</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('Please enter password'));
				} else {
					if(this.form.checkPass !== '') {
						this.$refs.form.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('Please enter password again'));
				} else if (value !== this.form.pass) {
					callback(new Error('The two passwords are inconsistent'));
				} else {
					callback();
				}
			};
            return {
				form: {
					pass: '',
					checkPass: ''
				},
				rules: {
					pass: [
                        { validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
				},
				visible: false
			}
        },
        methods:{
        	onSubmit(formName) {
				const self = this;
				let formData = {
					id: sessionStorage.getItem('ms_username'),
					pass: self.form.pass,
					checkPass: self.form.checkPass
				};			
				self.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.$http.post('/api/user/modifyPassword',formData).then(function(response) {
							console.log(response);
							self.$router.push('/login');
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
        		this.$router.push('/userCenter');
        	}        	
        }
	}
</script>

<style>
	.userContent {
		width: 400px;
		margin: 0 auto;
	}
</style>
   