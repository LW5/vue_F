<template>
<el-container>
<el-table
    :data="chongzhu"
    style="width: 100%">
    <el-table-column
      label="id"
      width="250">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row._id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="用户昵称"
      width="80">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>真实姓名: {{ scope.row.memberName }}</p>
          <p>送货住址: {{ scope.row.memberAdd }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.memberAcount }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
        <el-table-column
      label="区域"
      width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.memberArea }}</span>
      </template>
    </el-table-column>
        </el-table-column>
        <el-table-column
      label="电话号码"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.memberPhone }}</span>
      </template>
    </el-table-column>
        </el-table-column>
        <el-table-column
      label="会员卡"
      width="80">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.menberCard }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="积分"
      width="80">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.memberPoint }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        <el-button
          size="mini"
          @click="handleAdd(scope.$index, scope.row)">增加</el-button>
      </template>
    </el-table-column>
  </el-table>
      <div>
            <el-dialog title="User" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="ruleForm" >
                <el-form-item label="用户昵称 :" >
                <el-input v-model="form.memberAcount" auto-complete="off" style="width: 220px;"></el-input>
                <span style="margin:0px 20px;display:inline-block;">用户姓名 :</span>
                <el-input v-model="form.memberName" auto-complete="off" style="width: 220px;"></el-input>
                </el-form-item>
                    <el-form-item label="用户手机:" >
                <el-input v-model="form.memberPhone" auto-complete="off" style="width: 220px;"></el-input>
                <span style="margin:0px 20px;display:inline-block;">送货地址 :</span>
                <el-input v-model="form.memberAdd" auto-complete="off" style="width: 220px;"></el-input>
                </el-form-item>
                    <el-form-item label="用户区域 :" >
                <el-input v-model="form.memberArea" auto-complete="off" style="width: 220px;"></el-input>
                <span style="margin:0px 20px;display:inline-block;">用户会员 :</span>
                <el-input v-model="form.menberCard" auto-complete="off" style="width: 220px;"></el-input>
                </el-form-item>
                   <el-form-item label="用户积分 : " >
                <el-input v-model="form.memberPoint" auto-complete="off" style="width: 220px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handeClick_qx">取 消</el-button>
                <el-button type="primary"  @click="handeClick_Add" v-model="type_btn">确 定</el-button>
            </div>
            </el-dialog>  
        </div>
  <el-footer>
   <div class="block1">
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
  export default {
       created(){
            this.handeClick_Get()
        //    this.dialogFormVisible = true
            // this.handeClick_Add()
      },
       computed:{
        chongzhu(){
                return this.$store.state.User.chongzhu
            },
        form(){
                return this.$store.state.User.form
            },
         maxPage(){ 
                return this.$store.state.User.maxPage
                  },
        count(){ 
                return this.$store.state.User.count
              },
        curPage(){ 
                return this.$store.state.User.curPage
            },
    },
     data() {
      return {
        dialogFormVisible: false,
        type_btn:0,
      }
    },
    methods: {
       handleSizeChange(val) {
         console.log(val)
        this.$store.commit("User/sizeChange",val)
         console.log(`每页 ${val} 条`);
        this.handeClick_Get()
      },
      handleCurrentChange(val) {
         console.log(val)
        this.$store.commit("User/currentChange",val)
        this.handeClick_Get()
        console.log(`当前页: ${val}`);
      },

      handleEdit(index, row) {
          this.type_btn = 2
          this.dialogFormVisible = true
          this.$store.state.User.form = row
          this.handeClick_Get()
      },    
      handleDelete(index, row) {
         this.$store.dispatch('User/async_handleDel',row)
         this.handeClick_Get()
      },
      handleAdd(index, row) {
        this.dialogFormVisible = true
        this.type_btn = 1
      },
      handeClick_Add(){
         if(this.type_btn===2){
            this.$store.dispatch("User/async_handleXg")
            this.handeClick_Get()
         }else{
             console.log("s")
            this.$store.dispatch('User/async_handleAdd')
            this.handeClick_Get()
         }
         this.dialogFormVisible = false
      },
      handeClick_Get(){
        this.$store.dispatch('User/async_handleGet')
      },
      handeClick_qx(){
        this.dialogFormVisible = false
          for(var name in this.$store.state.User.form) {
                this.$store.state.User.form[name] = ""
              }
      }
    }
  }
</script>

<style>

</style>


