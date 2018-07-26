<template>
    <el-container>
        <el-header > 
          <!-- 增加订单 -->
          <el-button type="primary" @click="dingdan_add"><i class="el-icon-upload el-icon--right"></i> 手 动 添 加</el-button>
          <!-- 更新、查询订单 -->
          <el-button type="primary" @click="dingdan_cx" icon="el-icon-refresh"> 刷 新 </el-button>
          <!-- 修改订单 -->
          <el-button type="primary" @click="dingdan_xg" icon="el-icon-edit">修 改 订 单</el-button>
          <!-- 删除订单 -->
          <el-button type="primary" @click="dingdan_sc" icon="el-icon-delete">删 除 订 单</el-button>
        </el-header>
        <!-- 修改对话框 -->
          <el-dialog title="修改订单" width="500px" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                  <el-form-item label="商 品 名 称 ：" :label-width=formLabelWidth>
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="购 买 商 店 ：" :label-width=formLabelWidth>
                        <el-input  v-model="form.shop" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="购 买 客 户 ：" :label-width=formLabelWidth>
                        <el-input v-model="form.id" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="付 款 状 态 ：" :label-width=formLabelWidth>
                        <el-input v-model="form.address" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="发 货 状 态 ：" :label-width=formLabelWidth>
                        <el-input  v-model="form.address1" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="订 单 号 ：" :label-width=formLabelWidth>
                        <el-input  v-model="form.date" auto-complete="off"></el-input>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="xg_btn">确 定</el-button>
              </div>
          </el-dialog>
         <!-- 增加对话框 -->
          <el-dialog title="手动添加订单" width="500px" :visible.sync="dialogFormVisible1">
              <el-form :model="adddd">
                  <el-form-item label="商 品 名 称 ：" :label-width=formLabelWidth>
                        <el-input  v-model="adddd.name"  auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="购 买 商 店 ：" :label-width=formLabelWidth>
                        <el-input  v-model="adddd.shop"  auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="购 买 客 户 ：" :label-width=formLabelWidth>
                        <el-input v-model="adddd.id"  auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="付 款 状 态 ：" :label-width=formLabelWidth>
                        <el-input  v-model="adddd.address" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="发 货 状 态 ：" :label-width=formLabelWidth>
                        <el-input   v-model="adddd.address1"  auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="订 单 号 ：" :label-width=formLabelWidth>
                        <el-input   v-model="adddd.date"  auto-complete="off"></el-input>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                  <el-button type="primary" @click="dingdan_add_btn">确 定</el-button>
              </div>
          </el-dialog>
          <el-main>
            <el-table
              ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              stripe
              @selection-change="handleSelectionChange">
              <el-table-column
              type="expand"
                width="100">
                <template slot-scope="props">
                  <!-- 商品详情 -->
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="商品名称 :">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="购买商店 :">
                      <span>{{ props.row.shop }}</span>
                    </el-form-item>
                    <el-form-item label="购买客户 :">
                      <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="付款状态 :">
                      <span>{{ props.row.address }}</span>
                    </el-form-item>
                    <el-form-item label="发货状态 :">
                      <span>{{ props.row.address1 }}</span>
                    </el-form-item>
                    <el-form-item label="订单号 :">
                      <span>{{ props.row.date }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                type="selection"
                width="100">
              </el-table-column>
              

              <el-table-column
                label="订单号"
                width="300">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="商品名字"
                width="245">
              </el-table-column>
              <el-table-column
                prop="address"
                label="付款状态"
                
                width="245">
              </el-table-column>
              <el-table-column
                prop="address1"
                label="发货状态"
                width="245" 
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </el-main>
    </el-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("order");
export default {
  data() {
    return {
      adddd: {
        date: "",
        name: "",
        address: "",
        address1: "",
        id: "",
        shop: ""
      },
      multipleSelection: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {
        date: "",
        name: "",
        address: "",
        address1: "",
        id: "",
        shop: ""
      },

      formLabelWidth: "120px"
    };
  },
  computed: {
    ...mapState(["tableData3"])
    // ...mapGetters(["dingdan_cx1"])
    // ...mapActions("order",["dingdancx1"])
  },

  methods: {
    // 增加
    dingdan_add() {
      this.dialogFormVisible1 = true;
    },
    dingdan_add_btn() {
      const data = {
        date: this.adddd.date, //商品订单号
        name: this.adddd.name, //商品名字
        address: this.adddd.address, //商品付款状态
        address1: this.adddd.address1, //商品发货状态
        id: this.adddd.id, //客户
        shop: this.adddd.shop //商店
      };
      // console.log(data)
      fetch("/dingdan/addDD", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json"
        }
      });
      this.dialogFormVisible1 = false;
      this.$store.dispatch("order/dingdancx1");
    },
    // 刷新按钮查询
    dingdan_cx() {
      this.$store.dispatch("order/dingdancx1");
    },
    // 修改
    dingdan_xg() {
      const date = this._data.multipleSelection[0];
      this.form = date;
      // console.log(date);
      this.dialogFormVisible = true;
      return date;
    },
    xg_btn() {
      const date = this._data.multipleSelection[0];
      // console.log(date)
      this.dialogFormVisible = false;
      this.$store.dispatch("order/xg_btn", date);
      this.$store.dispatch("order/dingdancx1");
      console.log('in')
    },

    // 删除
    dingdan_sc() {
      const dell = this._data.multipleSelection;
      // console.log(dell[0]);
      if (dell[0] == undefined) {
        // console.log("in");
        this.$confirm("还未选择", "提示！", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.$store.dispatch("order/shanchu",dell)
             this.$store.dispatch("order/dingdancx1");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style>
.demo-table-expand {
  margin-left: 200px;
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  display: inline-block;
  width: 40%;
}
.el-main {
  background-color: #e9eef3;
  /* color: #333; */
  /* text-align: center; */
  /* line-height: 160px; */
}
.el-header {
  /* background-color: #B3C0D1; */
  /* color: #333; */
  line-height: 60px;
}
</style>