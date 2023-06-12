const department = require('../models/department');


const deptrouter = require('express').Router();
router.get('/api/department',function(attributes){
    const department=department.all();
    res.json(department);
})


module.exports =deptrouter;