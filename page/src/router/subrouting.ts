const {
    Banner,
    Commodity,
    Classified,
    Evaluate,
}=require("@/views/index"); //首页子视图
const subrouting=[
    {//首页banner
        path:"banner",
        component:Banner,
        meta:{
            title:"首页banner",
        }
    },
    {//重定向
        path:"/home",
       redirect:"/home/banner"    
    },
    {//商品列表
        path:"commodity",
        component:Commodity,
        meta:{
            title:"商品列表",
        }
    },
    {//分类管理
        path:"classified",
        component:Classified,
        meta:{
            title:"分类管理",
        }
    },
    {//评论管理
        path:"evaluate",
        component:Evaluate,
        meta:{
            title:"评论管理",
        }
    }
]

export  {
    subrouting
}