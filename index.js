const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'couse1'},
    {id: 2, name: 'couse2'},
    {id: 3, name: 'couse3'},
    {id: 4, name: 'couse4'}
];



app.get('/', (req, res) => {
    res.send("Hello World!!");
});



app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send("Course details didn't found for this id");
    }
    else{
        res.send(course);
    }
});
app.get('/api/courses', (req, res) => {
    res.send(courses);
})



app.post('/api/courses', (req, res) => {

    const { error } = validateCourseName(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
    };
const course = {
    id : courses.length+1,
    name : req.body.name
};
courses.push(course);
res.send(course);
});



app.put('/api/course/:id', (req, res) => {
const course = courses.find(c => c.id === parseInt(req.params.id));
if(!course){
    return res.status(404).send("id didn't find in the list");
}


const { error } = validateCourseName(req.body);

if(error){
    return res.status(400).send(error.details[0].message);
};

course.name = req.body.name;
res.send(course);
});

function validateCourseName(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    
    return Joi.validate(course, schema);
}



app.delete('/api/course/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        return res.status(404).send("id didn't find in the list");
    }
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
});
app.listen(3000, () => console.log(`Listing Port Number ${3000}!!!`));
