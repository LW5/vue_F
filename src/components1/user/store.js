export default {
    namespaced: true,
     state: {
        form: {
            memberPhone: "",//电话号码
            memberAcount: "",//昵称
            memberName:"" ,//真实姓名
            menberCard:"",//会员卡
            memberImg:"",//头图
            memberAdd:"",//送货地址
            memberArea:"",//区域
            memberPoint:"",//积分
        },
            curPage: 1,
            eachPage: 10,
            count: 0,
            maxPage: 0,
            chongzhu: [],   
       },
     mutations:{
        handeClick(state,index){
            console.log(index)
        },
        getPetData(state,petData){
            const { chongzhu,count,eachPage,curPage } = petData
            state.chongzhu = chongzhu
            state.count = count
            state.curPage = curPage
            state.eachPage = eachPage
        },
        currentChange(state,curPage){
            state.curPage = curPage
        },
        sizeChange(state,eachPage){
            state.eachPage = eachPage
        }
     },
     actions:{
      async async_handleAdd(Content) {
          if(Content.state.form._id===""){
              const {   memberPhone,
              memberAcount,
              memberName,
              menberCard,
              memberImg,
              memberAdd,
              memberArea,
              memberPoint, } = Content.state.form
              let form = {   
                memberPhone,
                memberAcount,
                memberName,
                menberCard,
                memberImg,
                memberAdd,
                memberArea,
                memberPoint, }
                Content.state.form = form
          }
           const data =  await fetch("/chongzhu/chongwuAdd",{
            method:"post",
            body:JSON.stringify(
                Content.state.form
            ),
            headers:{
                "Content-Type":"application/json"
            }
            })
            .then(res=>res.json())
            console.log(data)
                // const { chongwuguanliId } = data[0]
                this.state.Pet.chongzhu =data
                for(var name in Content.state.form) {
                    Content.state.form[name] = ""
                }
        },
        async async_handleGet({state,commit}) {
            console.log("get")
            const curPage =  state.curPage
            const eachPage =  state.eachPage
            const data =   await fetch("/chongzhu/getChongwu",{
                method:"post",
                body:JSON.stringify({
                    curPage,
                    eachPage
                    }
                ),
                headers:{
                    "Content-Type":"application/json"
                }
                })
                .then(res=>res.json())
                commit("getPetData",data)
    },
        async async_handleXg(Content) {
            console.log(Content.state.form)
            const data =  await fetch("/chongzhu/xGChongwu",{
            method:"post",
            body:JSON.stringify(
                Content.state.form
            ),
            headers:{
                "Content-Type":"application/json"
            }
            })
            .then(res=>res.json())
            console.log(data)
            if(data){
                console.log("data")
                 for(var name in Content.state.form) {
                        Content.state.form[name] = ""
                }
            }
            // const { chongwuguanliId } = data[0]
            // this.state.Pet.chongwuguanli =chongwuguanliId
        },
        async async_handleDel(Content,row) {
            console.log(row)
             const data=  await fetch("/chongzhu/sCChongwu",{
                method:"post",
                body:JSON.stringify(row),
                headers:{
                    "Content-Type":"application/json"
                }
                })
                .then(res=>res.json())
       console.log(data)
    },
}
 }
 
 