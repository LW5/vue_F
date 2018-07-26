<template>
<el-container>
<el-table
    :data="chongwuguanli"
    style="width: 100%">
    <el-table-column
      label="id"
      width="280">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row._id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.chongwuName }}</p>
          <p>住址: {{ scope.row.chongwuType }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.chongwuName }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
        <el-table-column
      label="品类"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.chongwuType }}</span>
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
            <el-dialog title="PeT" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="ruleForm" >
                <el-form-item label="宠物的名字 :" >
                <el-input v-model="form.chongwuName" auto-complete="off" style="width: 220px;"></el-input>
                <span style="margin:0px 20px;display:inline-block;">宠物的品类 :</span>
                <el-input v-model="form.chongwuType" auto-complete="off" style="width: 220px;"></el-input>
                </el-form-item>
                    <el-form-item label="宠物的种类 :" >
                <el-input v-model="form.chongwuKind" auto-complete="off" style="width: 220px;"></el-input>
                <span style="margin:0px 20px;display:inline-block;">宠物的颜色 :</span>
                <el-input v-model="form.chongwuColor" auto-complete="off" style="width: 220px;"></el-input>
                </el-form-item>
                    <el-form-item label="宠物的生日 :" >
                <el-input v-model="form.chongwuData" auto-complete="off" style="width: 220px;"></el-input>
                <span style="margin:0px 20px;display:inline-block;">宠物的性情 :</span>
                <el-input v-model="form.chongwuStyle" auto-complete="off" style="width: 220px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handeClick_qx">取 消</el-button>
                <el-button type="primary"  @click="handeClick_Add" v-model="type_btn">确 定</el-button>
            </div>
            </el-dialog>  
        </div>
  <el-footer>
   <div class="block">
    <!-- <span class="demonstration">完整功能</span> -->
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
        if(!this.chongwuguanli[0]){
          console.log("inini")
          this.dialogFormVisible = true
        }
        let index = this.$store.state.Service.mendianIndex
        if(this.$store.state.Info.mendianGli.length){
             console.log("1")
             const { chongwuguanliId,_id:mendianGliId } =  this.$store.state.Info.mendianGli[index]
             localStorage.mendianGliId = mendianGliId
        }
        this.handeClick_Get()
      },
       computed:{
        chongwuguanli(){
                return this.$store.state.Pet.chongwuguanli
            },
        form(){
                return this.$store.state.Pet.form
            },
         maxPage(){ 
                return this.$store.state.Pet.maxPage
                  },
        count(){ 
                return this.$store.state.Pet.count
              },
        curPage(){ 
                return this.$store.state.Pet.curPage
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
        this.$store.commit("Pet/sizeChange",val)
         console.log(`每页 ${val} 条`);
        this.handeClick_Get()
      },
      handleCurrentChange(val) {
         console.log(val)
        this.$store.commit("Pet/currentChange",val)
        this.handeClick_Get()
        console.log(`当前页: ${val}`);
      },

      handleEdit(index, row) {
          this.type_btn = 2
          this.dialogFormVisible = true
          this.$store.state.Pet.form = row
      },    
      handleDelete(index, row) {
         this.$store.dispatch('Pet/async_handleDel',row)
         this.handeClick_Get()
      },
      handleAdd(index, row) {
        // for(var name in this.$store.state.Pet.form) {
        //       this.$store.state.Pet.form[name] = ""
        //   }
        this.dialogFormVisible = true
        this.type_btn = 1
      },
      handeClick_Add(){
         if(this.type_btn===2){
             console.log("x")
            this.$store.dispatch("Pet/async_handleXg")
            this.handeClick_Get()

         }else{
             console.log("s")
            this.$store.dispatch('Pet/async_handleAdd')
            this.handeClick_Get()
         }
         this.dialogFormVisible = false
      },
      handeClick_Get(){
        this.$store.dispatch('Pet/async_handleGet')
      },
      handeClick_qx(){
        this.handeClick_Get()
        this.dialogFormVisible = false
      }
    }
  }
</script>
<style>

</style>
