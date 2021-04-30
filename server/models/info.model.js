const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// var connection = mongoose.createConnection(process.env.DB_Connect, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

const infoSchema = new Schema({
  id: {type: Number, required: true, unique: true, ref: 'id'},
  Status: {type: String, required: true, default: 'Choose...'},
  Prefix: {type: String, required: true, default: 'Choose...'},
  FirstName: {type: String, required: false, trim: true, default: ''},
  LastName: {type: String, required: false, trim: true, default: ''},
  HouseNo: {type: String, required: false, trim: true, default: ''},
  Street: {type: String, required: false, trim: true, default: ''},
  City: {type: String, required: false, trim: true, default: ''},
  County: {type: String, required: false, trim: true, default: ''},
  PostCode: {type: String, required: false, trim: true, default: ''},
  Country: {type: String, required: false, trim: true, default: ''},
  Info: [{Comments: String, Charts: String, _id: false }],
  Files: [{Documents: {type: String, default: ''}, _id: false }],
  Company: {type: String, default: ''},
  LastMeeting: {type: Date, default: ''},
  NextMeeting: {type: Date, default: ''},
  BusinessLine: {type: String, default: ''},
  HomePhone: {type: String, default: ''},
  MobilePhone: {type: String, default: ''},
  Email: {type: String, default: ''},
  WebSite: {type: String, default: ''},
  FaceBook: {type: String, default: ''},
  Tag : { type: Boolean, default: true }
},{
  timestamps: { createdAt: 'AccountCreated', updatedAt: 'LastUpdated' }
, 
  versionKey: false 
})

module.exports = mongoose.model('info', infoSchema)
