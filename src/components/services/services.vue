<template>
<div>
  <el-table
    :data="this.tableData4"
    style="width: 100%"
    max-height="250">
   <el-table-column
     prop="serviceName"
        label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="serviceType"
        label="服务类别"
      width="120">
    </el-table-column>
    <el-table-column
      prop="serviceSchedule"
        label="排期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="serviceDetial"
        label="服务规格"
      width="120">
    </el-table-column>
    <el-table-column
     prop="serviceTime"
        label="耗时"
      width="120">
    </el-table-column>
     <el-table-column
     prop="serviceLevel"
        label="服务等级"
      width="120">
    </el-table-column>
     <el-table-column
    prop="servicePrice"
        label="价格"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="dialogTableVisible = true">修改</el-button>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData4)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="text" @click="dialogFormVisible = true"></el-button>
        <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.serviceName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="服务类别" :label-width="formLabelWidth">
            <el-input v-model="form.serviceType" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="排期" :label-width="formLabelWidth">
            <el-input v-model="form.serviceSchedule" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="服务规格" :label-width="formLabelWidth">
            <el-input v-model="form.serviceDetial" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="耗时" :label-width="formLabelWidth">
            <el-input v-model="form.serviceTime" auto-complete="off"></el-input>
            </el-form-item>
             <el-form-item label="服务等级" :label-width="formLabelWidth">
            <el-input v-model="form.serviceLevel" auto-complete="off"></el-input>
            </el-form-item>
             <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.servicePrice" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRow">确 定</el-button>
        </div>
        </el-dialog>
        <el-dialog title="修改" :visible.sync="dialogTableVisible">
        <el-table :data="tableData4">
             <el-table-column property="serviceName" label="姓名" width="200"></el-table-column>
            <el-table-column property="serviceType" label="服务类别"></el-table-column>
            <el-table-column property="serviceSchedule" label="排期"></el-table-column>
            <el-table-column property="serviceDetial" label="规格"></el-table-column>
            <el-table-column property="serviceTime" label="耗时"></el-table-column>
            <el-table-column property="serviceLevel" label="服务等级"></el-table-column>
            <el-table-column property="servicePrice" label="价格"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="chageRow">确 定</el-button>
        </div>
        </el-dialog>
        <template>
          <el-row>
            <el-button type="text" size="small" @click="dialogFormVisible = true" >添加</el-button>
         </el-row>
      </template>
        </div>
</template>


<script>
import { mapState,mapActions } from "vuex"
export default {
  
  methods: {
    deleteRow(index, rows) {
       /* console.log(this.tableData4) */
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: rows.splice(index, 1),
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addRow() {
      
      this.dialogFormVisible = false;
       const data1=this.form;
       this.$store.dispatch('goods/addEmp',data1)
    },
    
         chageRow(){
       this.dialogTableVisible =false;
       console.log(this.form)
        
    },
     
   
  }, 
   computed:{
     ...mapState("goods",["tableData4"]),
    ...mapActions("goods",["addEmp"]) 
   } ,

   created(){
         
      this.$store.dispatch("goods/getFoods")
    },
  
   data() {
    return {
  
      dialogTableVisible: false,
      dialogFormVisible: false,
       form: {
         serviceName: "",
         serviceType: "",
         serviceSchedule: "",
         serviceDetial: "",
         serviceTime: "",
         serviceLevel: "",
         servicePrice: "",
         rows: []
       },
      formLabelWidth: "120px"
    };
  }
};
</script>