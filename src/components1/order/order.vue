<template>
<el-container>
<el-header>
<el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    {{select_n}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="1">未审批</el-dropdown-item>
    <el-dropdown-item command="2">已审批</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<el-button @click="addUser" style="margin-left:50px;">同意</el-button>
<el-button @click="unlick_u">申请个屁！</el-button>
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
          <el-form-item label="用户名" >
            <span>{{ props.row.userAcount }}</span>
          </el-form-item>
          <el-form-item label="用户密码" >
            <span>{{ props.row.userPwd }}</span>
          </el-form-item>
          <el-form-item label="用户手机">
            <span>{{ props.row.userPhone }}</span>
          </el-form-item>
          <el-form-item label="用户 email">
            <span>{{ props.row.userMail }}</span>
          </el-form-item>
          <el-form-item label="真实姓名">
            <span>{{ props.row.userName }}</span>
          </el-form-item>
          <el-form-item label="用户类别">
             <span v-if="props.row.userType==1">平台用户</span>
            <span v-else>门店用户</span>
          </el-form-item>
          <el-form-item label="申请状态" >
            <span v-if="props.row.userStatus==1">申请中。。</span>
            <span v-else>申请通过</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
        <el-button type="primary" icon="el-icon-delete"></el-button>
    <el-table-column
      label="用户姓名"
      prop="userName">
    </el-table-column>
    <el-table-column
      label="用户手机"
      prop="userPhone">
    </el-table-column>
    <el-table-column
      label="用户 email"
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
</el-container>

</template>

<script>
    export default{
        created(){
            this.$store.dispatch("_Order/async_GetUers",1)
        },
        data(){
            return{
                select_n:"未审批",
                choose:[],
                dialogFormVisible: false,
                type_btn:0,
                radio:1,
                radio1:0
                }
        },
    
        methods: {
                user_s(val){
                     this.$store.commit("_Order/user_s",val)
                },
                user_x(val){
                     this.$store.commit("_Order/user_x",val)
                },
              
            handleSelectionChange(val){
                this.choose = val
            },  
            //增加
            addUser(){
                this.$store.dispatch('_Order/async_handleAdd',this.choose)
                this.getUser()
            },
            unlick_u(){
                this.$store.dispatch("_Order/async_Shan",this.choose)
                this.getUser()
            },
            handleSizeChange(val) {
            this.$store.commit("_Order/sizeChange",val)
             if(this.select_n === "已审批"){
                this.$store.dispatch("_Order/async_GetUers",2)
            }else{
                this.$store.dispatch("_Order/async_GetUers",1)
            }
            console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
            this.$store.commit("_Order/currentChange",val)
            if(this.select_n === "已审批"){
                this.$store.dispatch("_Order/async_GetUers",2)
            }else{
                this.$store.dispatch("_Order/async_GetUers",1)
            }
            console.log(`当前页: ${val}`);
      },

        // 下拉
        handleCommand(command) {
            console.log(command)
            this.$store.dispatch("_Order/async_GetUers",command)
            if(command==="2"){
                this.select_n = "已审批"
                this.radio =  2
            }else{
                 this.select_n = "未审批"
                 this.radio =  1
            }
         },
           //查
        getUser(){
              if(this.select_n === "已审批"){
                this.$store.dispatch("_Order/async_GetUers",2)
                }else{
                this.$store.dispatch("_Order/async_GetUers",1)
                }
        }
        },
            computed:{
             ClerkData(){
                 console.log(this.$store.state._Order.ClerkData)
                 return this.$store.state._Order.ClerkData
            },
             count(){ 
                return this.$store.state._Order.count
              },
            curPage(){ 
                return this.$store.state._Order.curPage
                },
           userType(){
                return this.$store.state._Order.form.userType
           },
           userStatus(){
                return this.$store.state._Order.form.userStatus
               
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