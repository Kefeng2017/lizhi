const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router')
const db = require('./server/db')
const config = require('./server/config')
const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1')

const router = new Router()
const app = new Koa()
app.context.db = db

app.use(koaBody({
    multipart: true,  //允许文件格式
    formidable: {
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024
    }
}))

// 路由
// 获取所有video
router.get('/', async ctx => {
    const list = await ctx.db.query('select * from videos')
    if (list.length) {
        ctx.body = { code: 0, videos: list }
    } else {
        ctx.body = { code: -1, msg: 'something you looking for is not exist' }
    }
})


// 添加
router.post('/add', async ctx => {
    try {

        // 接受数据
        const data = ctx.request.body

        // 接受封面图片
        const cover = ctx.request.files.cover
        if (!cover) {
            ctx.body = { code: -1, msg: 'no cover selected' }
            return
        }
        const rs = fs.createReadStream(cover.path)

        const tempList = cover.name.split('.')
        const randomName = uuidv1() + '.' + tempList[tempList.length - 1]

        const ws = fs.createWriteStream(path.resolve(__dirname, '../cover/' + randomName))
        const saveCover = await rs.pipe(ws)
        const cover_url = 'http://' + ctx.host + saveCover.path
        const saveList = [
            data.title,
            data.en_name,
            data.description,
            cover_url,
            cover.size
        ]

        const saveVideo = await ctx.db.query('insert into videos(title,en_name,description,cover,size) values (?,?,?,?,?)', saveList)
        if (saveVideo.affectedRows > 0) {
            ctx.body = { code: 0, msg: '添加成功' }
        } else {
            ctx.body = { code: -1, msg: '添加失败' }
        }
    } catch (e) {
        ctx.body = { code: -1, msg: '服务器出错，请稍后再试' }
    }
})


// 上传封面
router.post('/uploadcover', async ctx => {
    try {
        const cover = ctx.request.files.cover
        if (!cover) {
            ctx.body = { code: -1, msg: 'no cover selected' }
            return
        }
        const rs = fs.createReadStream(cover.path)

        const tempList = cover.name.split('.')
        const randomName = uuidv1() + '.' + tempList[tempList.length - 1]

        const ws = fs.createWriteStream(path.resolve(__dirname, '../cover/' + randomName))
        const saveCover = await rs.pipe(ws)
        const cover_url = 'http://' + ctx.host + saveCover.path

        ctx.body = { code: 0, url: cover_url }
    } catch (e) {
        console.log(e)
        ctx.body = { code: -1, msg: 'upload img failed' }
    }
})

// 更新
router.post('/edit', async ctx => {
    try {
        // 接受数据
        const data = ctx.request.body

        const editList = [
            data.title,
            data.en_name,
            data.description,
            data.cover,
            data.tag,
            data.id
        ]

        const editVideo = await ctx.db.query('update videos set title=?,en_name=?,description=?,cover=?,tag=? where id=? ', editList)
        if (editVideo.affectedRows > 0) {
            ctx.body = { code: 0, msg: '更新成功' }
        } else {
            ctx.body = { code: -1, msg: '更新失败' }
        }
    } catch (e) {
        ctx.body = { code: -1, msg: '服务器出错，请稍后再试' }
    }
})

// 删除
router.get('/delete', async ctx => {
    try {
        // 接受数据
        const id = parseInt(ctx.request.query.id)
        const deleteVideo = await ctx.db.query('delete from videos where id=? ', id)
        if (deleteVideo.affectedRows > 0) {
            ctx.body = { code: 0, msg: '删除成功' }
        } else {
            ctx.body = { code: -1, msg: '删除失败' }
        }
    } catch (e) {
        console.log(e)
        ctx.body = { code: -1, msg: '服务器出错，请稍后再试' }
    }
})



app.use(router.routes()).use(router.allowedMethods())

app.listen(config.SERVER_PORT, () => {
    console.log(`app is running at port ${config.SERVER_PORT}`)
})