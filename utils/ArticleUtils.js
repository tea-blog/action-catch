const {
    getMapByString
} = require('./DateUtils');
const fs = require('fs');
const postUrlPath = "https://juejin.cn/post/";

// 解析文章列表
function getArticleMap(articleList, mkdirPath) {
    var articleMap = new Map();
    var markdownMap = new Map(); // 提取原 MarkDown 的内容
    for (var item of articleList) {
        var articleBean = getArticle(item);
        var ctime = parseInt(articleBean.ctime + "000");
        var dateMap = getMapByString(ctime); // 获取年月日 map 存储
        const {
            YY,
            YMD,
            YYYYMM,
        } = dateMap;
        articleBean["YM"] = YYYYMM;
        articleBean["YMD"] = YMD; // 新增 转换年月日的（格式：x年x月x日）
        var markdown = markdownMap.get(YMD);
        if (!markdown) { // 不存在，则读取并存入
            var filePath = mkdirPath + "/" + YY + "/" + YYYYMM + ".md";
            markdown = getFileConnent(filePath);
            markdownMap.set(YMD, markdown); // 存入
        }
        // console.log(markdown, filePath);
        if (isArticleInMD(markdown, YMD)) { // 原 MarkDown 文件有这条文章，跳过
            continue;
        }
        var str = articleMap.get(YYYYMM);
        if (!str) {
            str = new String();
        }

        str += article2MD(articleBean);
        articleMap.set(YYYYMM, str);
    }

    return articleMap;
}

// 获取原 MarkDown 文件的内容
function getFileConnent(filePath) {
    if (!fs.existsSync(filePath)) {
        var init = "初始化";
        return init; // 当这个文件不存在的时候，存入一个值，好让保证都是不存在 
    }
    return fs.readFileSync(filePath, 'utf-8');
}

// 判断文章是否已经写过在原 MarkDown 文件中
function isArticleInMD(content, txt) {
    return content.indexOf(txt) !== -1;
}

// 文章转化为md文档格式
function article2MD(articleBean) {
    var txt = "- [" + articleBean.YMD + "：" + articleBean.title + "](" + articleBean.postUrl + ")\r\n";
    return txt;
}

// 解析、处理文章
function getArticle(article) {
    var {
        article_info
    } = article;
    var {
        article_id, // 文章id 
        title, // 标题
        brief_content, // 摘要
        ctime, // 创建时间
    } = article_info;
    var articleBean = {
        article_id,
        title,
        postUrl: postUrlPath + article_id, // 文章地址
        brief_content,
        ctime,
    }
    return articleBean;
}


module.exports = {
    getArticleMap,
}
