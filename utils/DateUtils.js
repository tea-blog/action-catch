function getMapByString(date) {
    var source = new Date(date);
    var YY = source.getFullYear().toString();
    var MM = source.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM.toString()) : MM.toString();
    var DD = source.getDate();
    DD = DD < 10 ? ('0' + DD.toString()) : DD.toString();
    var YMD = YY + '年' + MM + '月' + DD + '日';
    var YYYYMMDD = YY + '' + MM + '' + DD;
    var YYYYMM = YY + '' + MM;
    var map = {
        YY,
        MM,
        DD,
        YMD,
        YYYYMM,
        YYYYMMDD,
    }
    return map;
}

module.exports = {
    getMapByString,
}