var mongoose = require('../utils/mongoose').mongoose;
var Schema = mongoose.Schema;
var MessageSchema = new Schema({
    from_uid : { type:String ,index: true},
    to_uid : { type:String ,index: true},
    content : { type:String },
    chat_type : { type:String,default:'text'},
    image : { type:String,default:''},
    time : { type:Date, default:Date.now }
});
var MessageModel = mongoose.model("message", MessageSchema);
/**
 * 描述：保存新增信息记录到MongoDB
 * @param {*} from_uid 
 * @param {*} to_uid 
 * @param {*} content 
 * @param {*} chat_type 
 * @param {*} image 
 * @param {*} callback 
 */
function add(from_uid,to_uid,content,chat_type,image,callback) {
    var info = {
        "from_uid" : from_uid,
        "to_uid" : to_uid,
        "content" : content,
        "chat_type" : chat_type,
        "image" : image,
    };
    var msgModel = new MessageModel(info);
    msgModel.save(function(err, res){
        return callback(err,res);
    });
}
/**
 * 描述：查询MongoDB已有数据
 * @param {*} page 
 * @param {*} size 
 * @param {*} uid 
 * @param {*} callback 
 */
function query(page,size,uid,callback) {
    var query = MessageModel.find({});
    var condition = [];
    if(uid){
        condition.push({"from_uid":uid});
        condition.push({"to_uid":uid});
    }
    var skip = (page - 1) * size;
    query.or(condition).skip(skip).limit(size).sort({"time":-1}).exec(callback);
}
//开发接口
exports.add = add;
exports.query = query;
//开发接口