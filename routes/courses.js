const express = require('express');
const router = express.Router();


const courses = [
    {id: 1, name: 'Math'},
    {id: 2, name: 'English'},
    {id: 3, name: 'Art'},
]
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // if(!course) {
    //     res.status(404);
    //     res.send('This course is not found.')
    // } else {
    //     res.send(course)
    // }
    if(!course) return res.status(404).send("NOT FOUND")
    res.send(course)
});

router.post('/', (req, res) => {
    const reqName = req.body.name;
    console.log(req.body)
    //创建规则
    const { error } = validateCourse(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message)
    } 
    const course = { id: courses.length + 1, name: reqName };
    courses.push(course)

    res.send(course)
});

router.put('/:id', (req, res) => {
    //if no existing , return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(400).send('The course with the given ID is not in database.')
        return 
    }  
    //Validate 
    //If invalid, return 400

    const {error} = validateCourse(req.body);
    if(error) {
        res.status(400).send(error.details[0].message)
        return;
    } 
    //Else update course,
    course.name = req.body.name
    res.send(course);
    //return the updated course
});

router.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(400).send("The deleting course is not in the database.")

    //Delete
    const deleteIndex = courses.indexOf(course);
    courses.splice(deleteIndex, 1);
    return res.send(course)
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required(),
    }
    return Joi.validate(course, schema);
}

module.exports = router;