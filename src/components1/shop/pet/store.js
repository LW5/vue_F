export default {
    namespaced: true,
     state: {
        chongwuguanli:[],
            curPage: 1,
            eachPage: 10,
            count: 0,
            maxPage: 0,
       },
     mutations:{
        handeClick(state,index){
            console.log(index)
        },
        getPetData(state,petData){
            const { chongwuguanli,count } = petData
            state.chongwuguanli = chongwuguanli
            state.count = count
        },
        currentChange(state,curPage){
            state.curPage = curPage
        },
        sizeChange(state,eachPage){
            state.eachPage = eachPage
        }
     },
     actions:{
        async async_handleGet({state,commit}) {
            const curPage =  state.curPage
            const eachPage =  state.eachPage
            const data =   await fetch("/chongwu/getChongwuAll",{
                method:"post",
                body:JSON.stringify({
                    curPage,
                    eachPage,
                }),
                headers:{
                    "Content-Type":"application/json"
                }
                })
                .then(res=>res.json())
                commit("getPetData",data)
    },
}
 }
 
 