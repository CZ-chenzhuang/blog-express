var express = require('express');
var router = express.Router();
const { 
    getBlogList, 
    getBlogDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

/* GET home page. */
router.get('/list', function(req, res, next) {
    const { author, keyword } = req.query
    let result = getBlogList(author, keyword)
    result.then((listData) => {
        res.json(
            new SuccessModel(listData, '请求成功')
        )
    })
});

router.get('/detail', (req, res, next) => {
    let { id } = req.query
    let result = getBlogDetail(id)
    result.then(detailInfo => {
        res.json(
            new SuccessModel(detailInfo, '请求详情成功')
        )
    })
})

// 新建博客，需要loginCheck 中间件进行登陆验证
router.post('/new', loginCheck, (req, res, next) => {
    let result = newBlog(req.body)
    result.then(newResult =>{
        res.json(
            new SuccessModel(newResult, '新建博客成功')
        )
    })
})

router.post('/update', loginCheck, (req, res, next) => {
    let { id } = req.query
    let result = updateBlog(id, req.body)
    result.then(val => {
      if (val) {
          res.json(
            new SuccessModel('更新博客成功')
          )
        return
      }
      res.json(
        new ErrorModel('更新博客失败')
      )
    })
})

router.post('/del', loginCheck, (req, res, next) => {
    let { author } = req.body
    let { id } = req.query
    let result = delBlog(id, author)
    result.then(val => {
      if (val) {
          res.json(
            new SuccessModel('删除博客成功') 
          )
        return
      }
      res.json(
        new ErrorModel('删除博客失败')
      ) 
    })
})

module.exports = router;
