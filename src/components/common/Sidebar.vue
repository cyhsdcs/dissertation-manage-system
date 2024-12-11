<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: '简介'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'assignStudents',
                        title: 'Assign students'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'userCenter',
                        title: '设置',
                        subs: [
                            {
                                index: 'upload',
                                title: '文件上传'
                            },
                            {
                                index: 'modifyUser',
                                title: '修改用户'
                            },
                            {
                                index: 'modifyPassword',
                                title: '修改密码'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created() {
            this.getUserRole();
        },
        methods: {
            getUserRole() {
                const self = this;	
				let username = sessionStorage.getItem('ms_username');
                console.log('account',username);
                self.$http.post('/api/user/getUser',{name: username}).then((response) =>{
					console.log('response',response);
					let result = response.data[0];
                    console.log('result',result);
                    console.log(typeof result);
					let temp = result.role;
                    
                    switch(temp) {
                        case 'teacher':
                            this.items = [
                                {
                                    icon: 'el-icon-setting',
                                    index: 'studentList',
                                    title: 'Student List'
                                },
                                {
                                    icon: 'el-icon-setting',
                                    index: 'grade',
                                    title: 'Grade'
                                },
                                {
                                    icon: 'el-icon-setting',
                                    index: 'userCenter',
                                    title: 'Configure',
                                    subs: [
                                        {
                                            index: 'modifyPassword',
                                            title: 'Modify Password'
                                        }
                                    ]
                                }
                            ]
                            break;
                        case 'student':
                        this.items = [
                                {
                                    icon: 'el-icon-setting',
                                    index: 'reportSubmit',
                                    title: 'Submit Report'
                                },
                                {
                                    icon: 'el-icon-setting',
                                    index: 'Upload',
                                    title: 'temp'
                                },
                                {
                                    icon: 'el-icon-setting',
                                    index: 'userCenter',
                                    title: 'Configure',
                                    subs: [
                                        {
                                            index: 'modifyPassword',
                                            title: 'Modify Password'
                                        }
                                    ]
                                }
                            ]
                            break;
                        case 'admin':
                            break;
                    }
				}).then(function(error) {
					console.log(error);
				})
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
