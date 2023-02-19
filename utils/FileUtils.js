const fs = require('fs');
const path = require("path");

function show(msg) {
    console.log(msg);
}

// 参考代码来源地址：https://blog.csdn.net/liruiqing520/article/details/107262653
// 递归创建目录 异步方法  
function mkdirs(dirname, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback();
        } else {
            // console.log(path.dirname(dirname));  
            mkdirs(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
                console.log('在' + path.dirname(dirname) + '目录创建好' + dirname + '目录');
            });
        }
    });
}
// 递归创建目录 同步方法
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}


function updateFile(fileName, finalData, dirPath) { // 更新文档
    try {
        var isMkdir = mkdirsSync(dirPath);
        if (!isMkdir) {
            show('新建文件夹有误！');
            return;
        }
        // return;
        var filePath = dirPath + fileName;
        fs.appendFile(filePath, finalData, (err) => { // 追加内容的写法，如果文件尚不存在则会创建该文件。
            if (err) throw err;
            show('写入成功');
        })
    } catch (err) {
        show(err)
    }
}


module.exports = {
    mkdirs,
    mkdirsSync,
    updateFile,
}