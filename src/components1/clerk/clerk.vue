<template>
<el-container>
<el-header>
<el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    {{select_n}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="1">平台用户</el-dropdown-item>
    <el-dropdown-item command="2">门店用户</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<el-button type="primary" icon="el-icon-edit" style="margin-left:30px;" @click="quanxian"></el-button>
<el-button type="primary" icon="el-icon-delete" @click="shanchu"></el-button>
<el-button @click="addUser">增加</el-button>
</el-header>

  <el-table
    :data="this.ClerkData"
    style="width: 100%"
    tooltip-effect="dark"
    @selection-change="handleSelectionChange"
    >
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="用户昵称">
            <span>{{ props.row.userAcount }}</span>
          </el-form-item>
          <el-form-item label="用户密码">
            <span>{{ props.row.userPwd }}</span>
          </el-form-item>
          <el-form-item label="用户 手机">
            <span>{{ props.row.userPhone }}</span>
          </el-form-item>
          <el-form-item label="用户 邮箱">
            <span>{{ props.row.userMail }}</span>
          </el-form-item>
          <el-form-item label="用户姓名">
            <span>{{ props.row.userName }}</span>
          </el-form-item>
          <el-form-item label="用户级别">
            <span v-if="props.row.userType==1">平台用户</span>
            <span v-else>门店用户</span>
          </el-form-item>
          <el-form-item label="用户状态">
            <span v-if="props.row.userStatus==1">申请中。。</span>
            <span v-else>申请通过</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-button type="primary" icon="el-icon-delete"></el-button>
    <el-table-column
      label="用户 姓名"
      prop="userName">
    </el-table-column>
    <el-table-column
      label="用户手机"
      prop="userPhone">
    </el-table-column>
    <el-table-column
      label="用户邮箱"
      prop="userMail">
    </el-table-column>
  </el-table>
<el-footer>
      <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="curPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
  </div>
</el-footer>
<div>
        <el-dialog title="Clerk" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="ruleForm" >
            <el-form-item label="用户昵称 :" >
            <el-input v-model="form.userAcount" auto-complete="off" style="width: 220px;"></el-input>
            <span style="margin:0px 20px;display:inline-block;">用户密码 :</span>
            <el-input v-model="form.userPwd" auto-complete="off" style="width: 220px;"></el-input>
            </el-form-item>
                <el-form-item label="用户手机 :" >
            <el-input v-model="form.userPhone" auto-complete="off" style="width: 220px;"></el-input>
            <span style="margin:0px 20px;display:inline-block;">用户邮箱 :</span>
            <el-input v-model="form.userMail" auto-complete="off" style="width: 220px;"></el-input>
            </el-form-item>
                <el-form-item label="用户姓名 :" >
            <el-input v-model="form.userName" auto-complete="off" style="width: 220px;"></el-input>
            </el-form-item>
                <span style="margin:0 20px;">权限 :</span>
                 <el-radio-group v-model="radio" @change="user_s">
                    <el-radio :label="1">平台用户</el-radio>
                    <el-radio :label="2">门店用户</el-radio>
                </el-radio-group>
            <el-form-item>
                <span style="margin:0 20px;">状态 :</span>
                <el-radio-group v-model="radio1" @change="user_x">
                    <el-radio :label="1">申请审核</el-radio>
                    <el-radio :label="2">审核成功</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handeClick_qx">取 消</el-button>
            <el-button type="primary"  @click="handeClick_Add" v-model="type_btn">确 定</el-button>
        </div>
        </el-dialog>  
    </div>
</el-container>

</template>

<script>
    export default{
        created(){
            this.$store.dispatch("_Clerk/async_GetUers",1)
        },
        data(){
            return{
                select_n:"平台用户",
                choose:[],
                dialogFormVisible: false,
                type_btn:0,
                radio:1,
                radio1:1
                }
        },
    
        methods: {
                user_s(val){
                     this.$store.commit("_Clerk/user_s",val)
                },
                user_x(val){
                     this.$store.commit("_Clerk/user_x",val)
                },
               handeClick_Add(){
                if(this.type_btn===2){
                    console.log("inini")
                    // this.$store.dispatch("_Clerk/async_handleXg")
                     this.$store.dispatch("_Clerk/async_quanxian",this.choose)
                     this.getUser()
                }else{
                    console.log("s")
                    this.$store.dispatch('_Clerk/async_handleAdd')
                    this.getUser()
                        for(var name in this.$store.state._Clerk.form) {
                        this.$store.state._Clerk.form[name] = ""
                      }
                }
                this.dialogFormVisible = false
      },
            handeClick_qx(){
                for(var name in this.$store.state._Clerk.form) {
                this.$store.state._Clerk.form[name] = ""
              }
                this.dialogFormVisible = false
            },
            handleSelectionChange(val){
                this.choose = val
            },  
            //改
            quanxian(){
                this.type_btn = 2
                this.$store.commit("_Clerk/quanxian",this.choose)
                this.dialogFormVisible = true
                 if(this.select_n === "门店用户"){
                this.$store.dispatch("_Clerk/async_GetUers",2)
                }else{
                this.$store.dispatch("_Clerk/async_GetUers",1)
                }
            },
            //删
            shanchu(){
                this.$store.dispatch("_Clerk/async_Shan",this.choose)
                this.getUser()
            },
            //增加
            addUser(){
                this.type_btn = 1
                this.dialogFormVisible = true
             
            },

            handleSizeChange(val) {
            this.$store.commit("_Clerk/sizeChange",val)
             if(this.select_n === "门店用户"){
                this.$store.dispatch("_Clerk/async_GetUers",2)
            }else{
                this.$store.dispatch("_Clerk/async_GetUers",1)
            }
            console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
            this.$store.commit("_Clerk/currentChange",val)
            if(this.select_n === "门店用户"){
                this.$store.dispatch("_Clerk/async_GetUers",2)
            }else{
                this.$store.dispatch("_Clerk/async_GetUers",1)
            }
            console.log(`当前页: ${val}`);
      },

        // 下拉
        handleCommand(command) {
            console.log(command)
            this.$store.dispatch("_Clerk/async_GetUers",command)
            if(command==="2"){
                this.select_n = "门店用户"
                this.radio =  2
            }else{
                 this.select_n = "平台用户"
                 this.radio =  1
            }
         },
           //查
        getUser(){
              if(this.select_n === "门店用户"){
                this.$store.dispatch("_Clerk/async_GetUers",2)
                }else{
                this.$store.dispatch("_Clerk/async_GetUers",1)
                }
        }
        },
            computed:{
             ClerkData(){   
                 console.log(this.$store.state._Clerk.ClerkData)
                 return this.$store.state._Clerk.ClerkData
            },
             count(){ 
                return this.$store.state._Clerk.count
              },
            curPage(){ 
                return this.$store.state._Clerk.curPage
                },
            form(){ 
                return this.$store.state._Clerk.form
           },
           userType(){
                return this.$store.state._Clerk.form.userType
           },
           userStatus(){
                return this.$store.state._Clerk.form.userStatus
               
           }
           
        },
      
    }
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>