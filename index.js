const Joi = require('joi');
const express = require('express')
const app = express();
const port = process.env.PORT || 3333

app.use(express.json()) //打开接收请求体重JSON对象，默认是关闭的

const courses = [
    {id: 1, name: 'Math'},
    {id: 2, name: 'English'},
    {id: 3, name: 'Art'},
]

app.get('/', (req, res) => {
    res.send("heelo")
})

app.get('/api/courses', (req, res) => {
    res.send([1,2,3,4,3])
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // if(!course) {
    //     res.status(404);
    //     res.send('This course is not found.')
    // } else {
    //     res.send(course)
    // }
    if(!course) res.status(404).send("NOT FOUND")
    res.send(course)
});

app.post('/api/courses', (req, res) => {
    const reqName = req.body.name;

    //创建规则
    const schema = {
        name: Joi.string().min(3).required(),
    }
    const result = Joi.validate(req.body, schema);
    console.log(result);
    if(result.error) {
        res.status(400).send(result.error)
        return;
    } 
    const course = { id: courses.length + 1, name: reqName };
    courses.push(course)

    res.send(course)
})

app.listen(3333, function() {
    console.log(`Server running at port: ${port}`)
})