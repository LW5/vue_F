
export default ({
    // 一种模式查
    namespaced:true,
    state: {
        tableData4:[{
            serviceName: "王小虎",
            serviceType: "上海市普陀区金沙江路 1518 弄",
            serviceSchedule: "1111111",
            serviceDetial: "22222",
            serviceTime: "44444",
            serviceLevel: "3213213",
            servicePrice: "222222",
          _id:"",
          row:[]
        }]
    },
    mutations: {
        assign(state,data){
            Object.assign(state.tableData,data)
        },
        // 下一页
        nextBtn(state){
            if(state.data.curPage>state.data.maxPage){
                state.data.curPage++;
            }
        },
        // 上一页
        preBtn(state){
            if(state.data.curPage>1){
                state.data.curPage--;
            }
        },
        // 首页
        firstBtn(state){
            state.data.curPage=1;
        },
        // 尾页
        wyBtn(state){
            state.data.curPage=state.data.maxPage
        },
        assign1(state,data){
            state.tableData4=data
        }
    },
    
    
    actions:{
        // 商品查询
        async getFoods(context) {     
        const data = await fetch("/goods/getFoods", {
            method: "post",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json());
       context.commit("assign1",data)
        
            // console.log(data)
         },

         
        //   // 商品查询
        // async getFoods(context,state) {     
        //     const data = await fetch("/goods/getFoods", {
        //         method: "post",
        //         body: JSON.stringify(),
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //     }).then(res => res.json());
        //     context.commit("assign",data)
            
        //     //    console.log(data)
        //      },



        //  添加食品
        async addEmp(context,data1) {
            
             await fetch("/goods/addEmp", {
                method: "post",
                body: JSON.stringify(data1),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json());
            // context.commit("assign",data)
             },

//               //  添加用品
//         async articalAdd(context,adata) {
            
//             await fetch("/goods/articalAdd", {
//                method: "post",
//                body: JSON.stringify(adata),
//                headers: {
//                    "Content-Type": "application/json"
//                }
//            }).then(res => res.json());
//            // context.commit("assign",data)
//             },

//             //  删除
//             async delet(context,data2) {
//                  await fetch("/goods/delet", {
//                     method: "post",
//                     body: JSON.stringify(data2),
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 }).then(res => res.json());
//                 // context.commit("assign",data)
//                  },
   }
})