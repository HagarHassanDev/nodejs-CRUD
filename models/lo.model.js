 mongoose = require('mongoose');



 const Languages = Object.freeze({
     English: 'en',
     Arabic: 'ar',
     French: 'fr',
 });


 const Cognitives = Object.freeze({
     remembering: 'rem',
     understanding: 'und',
     applying: 'app',
     analyzing: 'ana',
     evaluating: 'eva',
     creating: 'cre'
 });

 const Inputs = Object.freeze({
     visual: 'vis',
     verbal: 'ver'
 });


 const Instructionalroles = Object.freeze({
     introduction: 0,
     overview: 1,
     definition: 2,
     fact: 3,
     remark: 4,
     example: 5,
     explanation: 6,
     description: 7,
     illustration: 8,
     comparison: 9,
     summary: 10,
     conclusion: 11,
     theory: 12,
     rule: 13,
     formula: 14,
     procedure: 15,
     algorithm: 16,
     exercises: 17,
     casestudy: 18,
     realworldproblem: 19,
     question: 20,
     answertoquestion: 21,
     recall: 22,
     exam: 23,
     test: 24,
     quiz: 25,
     vocabulary: 26,
     reading: 27,
     prereading: 28,
     lightweight: 29
 });

 const Technicalformats = Object.freeze({
     picture: 0,
     figure: 1,
     graph: 2,
     image: 3,
     diagram: 4,
     flowchart: 5,
     schematic: 6,
     conceptmap: 7,
     animation: 8,
     video: 9,
     audio: 10,
     table: 11,
     text: 12,
     highlightedtext: 13,
     hypertext: 14
 });


 var loSchema = new mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
     title: { type: String, required: 'this field is required.' },
     conceptId: { type: String, required: 'this field is required.' },
     language: { type: String, enum: Object.values(Languages), required: 'this field is required.' },
     cognitive: { type: String, enum: Object.values(Cognitives), required: 'this field is required.' },
     input: { type: String, enum: Object.values(Inputs), required: 'this field is required.' },
     complexity: { type: Number, required: 'this field is required.' },
     url: { type: String, required: 'this field is required.' },
     instructionalrole: { type: String, enum: Object.values(Instructionalroles), required: 'this field is required.' },
     technicalformat: { type: String, enum: Object.values(Technicalformats), required: 'this field is required.' },
     ownershipId: { type: String }
 }, {
     // Force collection name 
     collection: 'LO',
     versionKey: false
 });


 loSchema.virtual('loId').get(function() { return this._id.toString(); }).set(function(x) { this._id = x });


 module.exports = {
     schema: mongoose.model('LO', loSchema),
     languages: Languages,
     cognitives: Cognitives,
     instructionalroles: Instructionalroles,
     technicalformats: Technicalformats
 };