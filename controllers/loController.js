const express = require('express');
var mongoose = require('mongoose');
var model = require('../models/lo.model');
// var xlsx = require('xlsx');

var loSchema = model.schema;
var router = express.Router();

router.get("/moduleData", (req, res) => {
    moduleEnums = {
        languages: model.languages,
        cognitives: model.cognitives,
        instructionalroles: model.instructionalroles,
        technicalformats: model.technicalformats
    };

    res.json(moduleEnums);
})

router.get("/los", async(req, res) => {
        let los = await loSchema.find(req.query);
        let data = [];
        los.forEach((doc) => {
            var object = { title: doc.title, loId: doc._id }
            data.push(object);
        });

        res.status(200).json(data);
    }

);

function uploadFileLO(req, res) {
    var f = xlsx.readFile(req.body.file, { cellDates: true });
    var finalResult = [];
    f.SheetNames.forEach((item) => {
        var worksheet = f.Sheets[item];
        var data = xlsx.utils.sheet_to_json(worksheet);
        finalResult.push(data);
    });
    loSchema.insertMany(finalResult, function(error, docs) {
        if (!error) {
            res.status(201).json(docs);
        } else {
            res.status(406).send('Not Acceptable')
        }
    });
}

router.post("/los", (req, res) => {
    if (req.body.file != undefined | req.body.file != '') {
        uploadFileLO(req, res);
    } else {
        var loSchemaObject = new loSchema({ _id: false });
        loSchemaObject.loId = new mongoose.Types.ObjectId();
        loSchemaObject.title = req.body.title;
        loSchemaObject.conceptId = req.body.conceptId;
        loSchemaObject.language = req.body.language
        loSchemaObject.cognitive = req.body.cognitive;
        loSchemaObject.complexity = req.body.complexity;
        loSchemaObject.url = req.body.url;
        loSchemaObject.instructionalrole = req.body.instructionalrole;
        loSchemaObject.technicalformat = req.body.technicalformat;
        loSchemaObject.ownershipId = 'EduEdge';
        if (req.body.technicalformat >= 10) {
            loSchemaObject.input = 'ver';
        } else {
            loSchemaObject.input = 'vis';
        }

        loSchemaObject.save((err, doc) => {
            if (!err) {
                res.status(200).json("inserted");
            } else {
                console.log(err)
                res.status(406).json(err);
            }
        })
    }
});

router.get("/los/:id", async(req, res) => {
    let lo = await loSchema.findById(req.params.id);
    res.status(200).json(lo);
});

router.patch("/los/:loSchemaId", (req, res) => {
    const id = req.params.loSchemaId;
    loSchema.update({ _id: id }, {
        $set: {
            _id: id,
            title: req.body.title,
            conceptId: req.body.conceptId,
            language: req.body.language,
            cognitive: req.body.cognitive,
            complexity: req.body.complexity,
            url: req.body.url,
            instructionalrole: req.body.instructionalrole,
            technicalformat: req.body.technicalformat,
            ownershipId: 'EduEdge'
        }
    }, { new: true, runValidators: true, returnNewDocument: true, upsert: true }, (err, doc) => {
        if (!err) {
            res.status(200).json(doc);
        } else {
            res.status(500).json(err);
        }
    })
});

router.delete("/los/:loSchemaId", async(req, res) => {
    let loDeleted = await loSchema.findByIdAndRemove(req.params.loSchemaId);
    res.status(200).json("deleted");
});

router.get("/los/:loSchemaId/url", async(req, res) => {
    let url = await loSchema.findById(req.params.loSchemaId);
    res.status(200).json(url.url);
});

module.exports = router;