export default {
    namespaced: true,
     state: {
            curPage: 1,
            eachPage: 10,
            count: 0,
            maxPage: 0,
            ClerkData: [{
                userAcount: '12987122',
                userPwd: '好滋好味鸡蛋仔',
                userPhone: '江浙小吃、小吃零食',
                userMail: '荷兰优质淡奶，奶香浓而不腻',
                userName: '上海市普陀区真北路',
                userType: "",
                userStatus: ""
                }],
            form: {
                userAcount: '',
                userPwd: '',
                userPhone: '',
                userMail: '',
                userName: '',
                userType: '',
                userStatus: ''
                },
               
       },
     mutations:{
       getUser_d(state,data){
           console.log("datadad")
           console.log(data)
        const { curPage,eachPage,ClerkData,count} = data
        state.curPage = curPage
        state.eachPage = eachPage
        state.ClerkData = ClerkData
        state.count = count
       } ,
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
            console.log(val)
            state.form.userStatus = val
        }
     },
     actions:{
        async async_handleAdd({state,commit}){
          console.log(state.form)
          const data =   await fetch("/yonghu/addUser",{
            method:"post",
            body:JSON.stringify(state.form),
            headers:{
                "Content-Type":"application/json"
            }
            })
             .then(res=>res.json())
        },
            async async_Shan({state,commit},choose){
                const data =   await fetch("/yonghu/shanchu",{
                    method:"post",
                    body:JSON.stringify(choose),
                    headers:{
                        "Content-Type":"application/json"
                    }
                    })
                     .then(res=>res.json())
                     console.log(this)

            }   
         ,
        async async_quanxian({state,commit},choose_D){
            const data =   await fetch("/yonghu/quanxian",{
                method:"post",
                body:JSON.stringify(state.form ),
                headers:{
                    "Content-Type":"application/json"
                }
                })
                 .then(res=>res.json())

        },
        async async_GetUers({state,commit},userType){
            console.log("刷新")
            const curPage =  state.curPage
            const eachPage =  state.eachPage
            const data =   await fetch("/yonghu/getUser",{
                method:"post",
                body:JSON.stringify({
                    curPage,
                    eachPage,
                    userType
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
 
 