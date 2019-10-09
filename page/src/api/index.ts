import { axios } from "@/utils/request";
let bash = "/api"
export default {
    //管理员登陆接口
    Login: (data: Object) => axios.post(bash + "/admin/login", { ...data }),
    //获取用户信息
    getUserInfo: () => axios.get(bash + "/user/getUserInfo"),
    //获取所有商品
    allShop: () => axios.get(bash + "/shop/allShop"),
    //添加商品分类
    addType: (data: any) => axios.get(bash + "/shop/addType", {
        params: {
            ...data
        }
    }),
    //添加商品子分类
    addCategory: (data: any) => axios.get(bash + "/shop/addCategory", {
        params: { ...data }
    }),
    //添加商品接口
    addShop: (data: Object) => axios.post(bash + "/shop/addShop", { ...data }),
    //获取商品分类
    getType: () => axios.get(bash + "/shop/getType"),
    //获取商品子分类
    getCategory: () => axios.get(bash + "/shop/getCategory"),
    //上传图片
    upimage: (data: Object) => axios.post(bash + "/upimage", { ...data }),
    //添加首页轮播图片
    addBanner:(data:Object)=>axios.post(bash+"/home/addBanner",{...data}),
    //首页轮播图片
    homeBanner:()=>axios.get(bash+"/home/banner"),
    //搜索
    search:(data:any)=>axios.get(bash+'search',{
        params:{...data}
    })
}