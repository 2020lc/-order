### foodList
foodList:[
    //某菜品信息
    {
        key: Number,                    键
        title: String,                  标题
        fit: "cover/fill/contain",      图片适应
        url:String                      图片地址
        ishot: Boolean,                 是否招牌
        isdiscount: Boolean,            是否打折
        discount: [0~1],                具体打多少折
        price: Number,                  价格
        total: Number,                  该菜品一共点了多少份
        target: String                  目标描点id
    },
    ...{}
]
### userinfo
userinfo:{
    [user]:{
        isLogin:Boolean                登录状态
        user:String,                   账号
        pwd:Number,                    密码
        repeat:Number,                 二次输入密码
        telephone:String               电话
        historyList:[                  历史订餐列表
            orderList,
            .....
        ]
    },
    ...{}
}
### data
{
    "data":{
        "foodList":[
            {
                key: Number,                    键
                title: String,                  标题
                fit: "cover/fill/contain",      图片适应
                url:String                      图片地址
                ishot: Boolean,                 是否招牌
                isdiscount: Boolean,            是否打折
                discount: [0~1],                具体打多少折
                price: Number,                  价格
                total: Number,                  该菜品一共点了多少份
                target: String                  目标描点id
            },
            ...{}
        ],
        "userinfo":[
                [user]:{
                    isLogin:Boolean                登录状态
                    user:String,                   账号
                    pwd:Number,                    密码
                    repeat:Number,                 二次输入密码
                    telephone:String,              电话
                    historyList:[                  历史订餐列表
                        orderList,
                        .....
                    ]
                },
                ...{}
        ]
    }
}
### admi
{
    "admi":[
        {
            admi:String,                管理员账号
            pwd:String,                 管理员密码
            power:'common | super'      管理员权限,common一般管理员，super超级管理员
        },
        ....
    ]
}
### orderList
//从所有菜品中筛选客户点了的菜品
orderList = foodList.filter((item)=>{
    return item.total > 0;
})
//添加付款信息
orderList.ispay = false
