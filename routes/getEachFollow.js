/* 获得互相关注的好友 */
var Follows = require('../models/follows')

module.exports = function(req, res) {
    var data = req.query

    var page = parseInt(data.page),  // 页   码
        limit = parseInt(data.limit) // 页数据量

    Follows
        .find({follower_id: data._id})
        .populate('_id')
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(function(err, docs) {
            if (err) {
                res.send(err)
                return
            } else {    
                if (docs == []) {
                    res.send([])
                } else {
                    var followers = []

                    docs.forEach(function(doc) {
                        followers.push(doc._id._id)
                    })

                    res.send(followers)
                }
            }
        })
}
