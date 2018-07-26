export default {
    namespaced: true,
     state: {
            curPage: 1,
            eachPage: 10,
            count: 0,
            maxPage: 0,
            ClerkData: [{
                userAcount: 'love',
                userPwd: '123',
                userPhone: '18990',
                userMail: 'dasd',
                userName: 'zhangsan',
                userType: 1,
                userStatus: 1
                }],
       },
     mutations:{
       getUser_d(state,data){
            console.log(data)
            const { curPage,eachPage,ClerkData,count} = data
            state.curPage = curPage
            state.eachPage = eachPage
            state.ClerkData = ClerkData
            state.count = count
       } ,

       //翻页
       currentChange(state,curPage){
           state.curPage = curPage
        },
        sizeChange(state,eachPage){
            state.eachPage = eachPage
        },
        quanxian(state,choose){
            state.form = choose[0]
        },
        user_s(state,val){
            state.form.userType = val
        },
        user_x(state,val){
            state.form.userStatus = val
        }
     },
     actions:{
         //同意
        async async_handleAdd({state,commit},choose_Y){
          const data =  await fetch("/yonghu/setState",{
            method:"post",
            body:JSON.stringify(choose_Y),
            headers:{
                "Content-Type":"application/json"
            }
            })
             .then(res=>res.json())
             console.log(data)
        },
        //不通过
            async async_Shan({state,commit},choose){
                const data =   await fetch("/yonghu/delState",{
                    method:"post",
                    body:JSON.stringify(choose),
                    headers:{
                        "Content-Type":"application/json"
                    }
                    })
                     .then(res=>res.json())
                 
            }   
         ,
        //查
        async async_GetUers({state,commit},userStatus){
            console.log("刷新")
            const curPage =  state.curPage
            const eachPage =  state.eachPage
            const data =   await fetch("/yonghu/getState",{
                method:"post",
                body:JSON.stringify({
                    curPage,
                    eachPage,
                    userStatus
                    }
                ),
                headers:{
                    "Content-Type":"application/json"
                }
                })
                 .then(res=>res.json())
                 commit("getUser_d",data)
        }
     }
 }