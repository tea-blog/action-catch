// npm install axios --save
// npm install fs --save
// path作用实现创建多层目录
// npm install path --save
const axios = require('axios');
// const fs = require('fs');
const {
    updateFile,
} = require('./utils/FileUtils');
const {
    getArticleMap,
} = require('./utils/ArticleUtils');

const mkdirPath = "./sort/"; // 生成文件的地址


function show(msg) {
    console.log(msg);
}


// 一、获取完整的专栏数据
// 链接
const url = "https://api.juejin.cn/content_api/v1/column/articles_cursor"

const column_id = "7107151273765371941"; // 专栏id
const limit = 20; // 页大小
var cursor = "0"; // 第几页（注意这里是字符串）
var sort = 2; // 排序（1最早 2最新） 

var data = {
    "column_id": column_id,
    "cursor": cursor,
    "limit": limit,
    "sort": sort
}
// console.log(qs.stringify(data));



// 获取数据
async function catchTxt() {
    await axios.post(url,
        JSON.stringify(data),
        // data,
        {
            // headers: {
            //     "Content-Type": "application/json",
            //     "Connection": "keep-alive",
            //     "Accept": "*/*",
            //     "Accept-Encoding": "gzip, deflate, br",
            //     "referrerPolicy": "strict-origin-when-cross-origin",
            //     "mode": "cors",
            //     "credentials": "include",
            //     "User-Agent": "PostmanRuntime/7.29.2"
            // },
            "headers": {
                "content-type": "application/json",
            },
        }).then(res => {
        // show(res);
        if (0 != res.data.err_no) {
            show("数据有误！");
            return;
        }
        var articleList = res.data.data;
        // show(articleList);
        show(articleList.length);
        var articleMap = getArticleMap(articleList, mkdirPath);
        console.log("articleMap.size：", articleMap.size);
        articleMap.forEach((str, key) => {
            // console.log(str, key);
            updateFile(key + ".md", str, mkdirPath + "/" + key.substring(0, 4) + "/");
        });
    }).catch(err => {
        show(err);
    })
}
catchTxt();
show(data);