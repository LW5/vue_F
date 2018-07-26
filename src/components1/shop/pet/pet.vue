<template>
<el-container>
  <el-table
    :data="this.chongwuguanli"
    style="width: 100%"
    tooltip-effect="dark"
    >
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.chongwuName }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.chongwuType }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.chongwuKind }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.chongwuColor }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.chongwuData }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.chongwuStyle }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.userStatus }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
  <el-table-column>
        <el-button type="primary" icon="el-icon-delete"></el-button>
   </el-table-column>
    <el-table-column
      label="商品 ID"
      prop="chongwuName">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="chongwuType">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="chongwuType">
    </el-table-column>
  </el-table>
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
          console.log("inin")
         this.handeClick_Get()
      },
     computed:{
        chongwuguanli(){
                return this.$store.state._Pet.chongwuguanli
            },
         maxPage(){ 
                return this.$store.state._Pet.maxPage
                  },
        count(){ 
                return this.$store.state._Pet.count
              },
        curPage(){ 
                return this.$store.state._Pet.curPage
            },
    },
     data() {
      return {
        dialogFormVisible: false,
      };
    },
    methods: {
      handeClick_Get(){
        this.$store.dispatch('_Pet/async_handleGet')
      }, handleSizeChange(val) {
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
    }
  }
</script>
<style>

</style>
