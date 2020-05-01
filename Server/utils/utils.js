const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
/**
 * Generate a ramdom alphanumeric string
 */
exports.randomString = (length)=>{
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}