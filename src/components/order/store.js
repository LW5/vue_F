export default {
    namespaced: true,
    state: {
        tableData3: [],
       
    },
    mutations:{
        assign(state,chaxun){
            state.tableData3 =chaxun
        }
    },
    actions: {
        // 查询
        async  dingdancx1(context) {
            const chaxun = await fetch("/dingdan/chaxun", {
                method: "post",
                headers: {
                    "Content-type": "application/json"
                }
            }).then(res => res.json())
            // console.log(chaxun)
          context.commit("assign",chaxun)
        },
        // 修改按钮
        async xg_btn(content,date){
            // console.log(date)
           await fetch("/dingdan/xiugai",{
                method:"post",
                body:JSON.stringify(date),
                headers:{
                    "Content-type":"application/json"
                }
           }).then(res=>res.json)
        },
        //确定删除
        async shanchu(content,dell){
            // console.log(dell)
            let arr=[];
            for(let i=0;i<dell.length;i++){
                arr.push(dell[i]._id)
            }
            // console.log(arr)
            await fetch('/dingdan/shanchu',{
                method:"post",
                body:JSON.stringify(arr),
                headers:{
                    "Content-type":"application/json"
                }
            }).then(res=>res.json)
        }
    },

}