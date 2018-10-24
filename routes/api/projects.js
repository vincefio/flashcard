const express = require('express')
const router = express.Router()
const Project = require('../../models/Project')

router.post('/db', (req, res) => {
    Project.create({ projectName: 'First Project' }, { projects: [{ front: 'test front' }, { back: 'test back' }] })
    res.end()
})

router.get('/projects', (req, res) => {
    //console.log('project get hit')

    let results = '';

    Project.find({}, function (err, res) {
        results = res;
    })
        .then(function () {
            // console.log('results ' + results)
            res.send(results)
        })

})

router.post('/displayCard', (req, res) => {
    //    console.log('displayCard route hit')
    Project.findById(req.body.id)
        .then((project) => { res.send(project) })
        .catch(err => { console.log(err) })

})

router.delete('/delete/:id', (req, res) => {
    Project.findById(req.params.id)
        .then(project => project.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
})

router.post('/newDocument', (req, res) => {
    // console.log(req.body)
    console.log('new document route')
    var newProject = new Project(req.body)
    newProject.save(function (err) {
        if (err) return handleError(err)

    })


    res.send('somethinggs supposed to happen')
    //res.redirect('/projects')

})

module.exports = router;