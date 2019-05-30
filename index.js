const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const helmet = require('helmet')
const morgan = require('morgan')
const Joi = require('joi');
const logger = require('./logger');
const courses = require('./routes/courses')
const home = require('./routes/home')
const express = require('express')
const app = express();
const port = process.env.PORT || 3333

app.set('view engine', 'ejs');  //设置模板引擎
app.set('views', './views');

app.use(express.json()) //打开接收请求体重JSON对象，默认是关闭的
app.use(express.urlencoded({extended: true}));  //使服务器能够接受post请求体中的参数
app.use(express.static('public'))
app.use(helmet());//Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use('/api/courses/', courses);
app.use('/', home)




app.listen(3333, function() {
    console.log(`Server running at port: ${port}`)
})