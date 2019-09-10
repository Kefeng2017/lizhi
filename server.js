const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router')
const db = require('./server/db')
const config = require('./server/config')
const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1')
const gravatar = require('gravatar')

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
router.get('/all', async ctx => {
    const list = await ctx.db.query('select * from videos')
    if (list.length) {
        ctx.body = { code: 0, videos: list }
    } else {
        ctx.body = { code: -1, msg: 'something you looking for is not exist' }
    }
})

// 获取视频信息
router.get('/video', async ctx => {
    const id = parseInt(ctx.request.query.id)
    if (id) {
        try {
            const video = await ctx.db.query('select * from videos where id=?', id)
            if (video.length) {
                ctx.body = { code: 0, video: video }
                let randomHot = video[0].hot + parseInt(Math.random()*30+1)
                ctx.db.query('update videos set hot = ?,view = view+1 where id = ?',[randomHot,id] )
            } else {
                ctx.body = { code: -1, msg: 'the video you looking for is not exist' }
            }
        } catch (e) {
            console.log(e)
            ctx.body = { code: -1, msg: 'get video info failed' }
        }
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

        const ws = fs.createWriteStream(path.resolve(__dirname, './cover/' + randomName))
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

        const ws = fs.createWriteStream(path.resolve(__dirname, './cover/' + randomName))
        const saveCover = await rs.pipe(ws)
        console.log(saveCover)
        const cover_url = 'http://' + ctx.hostname + '/cover/'+randomName

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


// 发表评论
// 添加
router.post('/addComment', async ctx => {
    try {
        // 接受数据
        const data = ctx.request.body
        const email = data.email || uuidv1()+'@qq.com'
        const avatar = gravatar.url(email, { s: '100', r: 'x', d: 'retro' }, true)
        const saveList = [
            data.comment,
            data.video_id,
            avatar,
            data.name || '一位不愿透露姓名的少侠'
        ]
        const saveComment = await ctx.db.query('insert into comment(text,videoid,avatar,username) values (?,?,?,?)', saveList)
        if (saveComment.affectedRows > 0) {
            const comment = {
                avatar,
                text: data.comment,
                vote: 0,
                username: data.name || '一位不愿透露姓名的少侠',
                id: saveComment.insertId
            }
            ctx.body = {code: 0, msg: '发表评论成功',comment}
        } else {
            ctx.body = { code: -1, msg: '发表评论失败' }
        }
    } catch (e) {
        console.log(e)
        ctx.body = { code: -1, msg: '服务器出错，请稍后再试' }
    }
})


router.get('/comments', async ctx => {
    try {
        let id = parseInt(ctx.request.query.id)
        let findResult = await ctx.db.query('select id, username,avatar,text,vote,c_date from comment where videoid=? order by c_date desc ', id)
        ctx.body = { code: 0, comments: findResult }
    } catch (e) {
        console.log(e)
        ctx.body = { code: -1, msg: 'get comments failed' }
    }
})

router.get('/voteComment', async ctx => {
    try {
        let id = parseInt(ctx.request.query.id)
        let updateResult = await ctx.db.query('update comment set vote = vote+1 where id =?', id)
        if(updateResult.affectedRows>0){
            ctx.body = { code: 0, msg: 'success' }
        }   
    } catch (e) {
        console.log(e)
        ctx.body = { code: -1, msg: '操作失败' }
    }
})


app.use(router.routes()).use(router.allowedMethods())

app.listen(config.SERVER_PORT, () => {
    console.log(`app is running at port ${config.SERVER_PORT}`)
})