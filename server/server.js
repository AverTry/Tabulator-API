
require('dotenv').config()
const port = process.env.PORT || 3000
const express = require('express')
const mongoose = require('mongoose')
const Info = require('./models/info.model')
const cors = require('cors')
const app = express(); app.use(cors()); app.use(express.json()); app.use(express.urlencoded({ extended: true }))

const sourceConX = process.env.DB_Connect_Atlas || process.env.DB_Connect_Local // For Atlas Public test Data (ReadOnly) || Or Localhost (Edit Testing)
mongoose.connect( sourceConX, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.connection.once('open', async () => app.listen(port, () => console.log(`Server UP on Port: ${port}`)))

app.get('/api', apiRes(Info), (req, res) => {
  res.json(res.apiRes)
})

function apiRes(model) {
  return async (req, res, next) => {
    let find = {}
    let page = parseInt(req.query.page) || 1
    let filters = req.query.filters
    console.log('filters', filters)
    let limit = parseInt(req.query.limit) || 5
    let skip = limit * (page - 1)
    let result = {}
    let sort = []
    let sorters = req.query.sorters || [ { field: "id", dir: "asc" } ] // grab values and push to array
    sorters.forEach(obj => {if(obj.dir !== 'none') sort.push(Object.values(obj))}) // A "none" evaluation is needed in Multi-sort tri-state sorting
    sort = Object.fromEntries(sort) // convert the Array of key/value pair arrays to a Mongoose preferred Object - But both ways should work!

    if (filters != undefined) {
      let buildFilterArray = [], transposed = ''
      filters.forEach(obj => {
        const arrayValues = Object.values(obj)
        switch (arrayValues[1]) {
          case '>': transposed = '$gt'
              buildFilterArray.push( { [arrayValues[0]]: {[transposed]: arrayValues[2]} } )
            break
          case '<': transposed = '$lt'
              buildFilterArray.push( { [arrayValues[0]]: {[transposed]: arrayValues[2]} } )
            break
          case '>=': transposed = '$gte'
              buildFilterArray.push( { [arrayValues[0]]: {[transposed]: arrayValues[2]} } )
            break
          case '<=': transposed = '$lte'
              buildFilterArray.push( { [arrayValues[0]]: {[transposed]: arrayValues[2]} } )
            break
          case '=': transposed = '$eq'
              buildFilterArray.push( { [arrayValues[0]]: {[transposed]: arrayValues[2]} } )
            break
          case '!=': transposed = '$ne'
              buildFilterArray.push( { [arrayValues[0]]: {[transposed]: arrayValues[2]} } )
            break
          case 'like': transposed = 'regX'
              buildFilterArray.push( { [arrayValues[0]]: {$regex: arrayValues[2], $options: 'i'} } )
            break
          case 'ids': transposed = 'ids'
              regArray = arrayValues[2].trim().split(' ').map((knit) => parseInt(knit))
              buildFilterArray.push( { [arrayValues[0]]: regArray } )
            break
          case 'dates': transposed = 'dates'
              try {
                let str = arrayValues[2]
                let dateArray = str.split("/")
                let date = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`)
                date = { $gte: new Date(date.setUTCHours(00,00,00)) , $lt : new Date(date.setUTCHours(23,59,59)) }                
                buildFilterArray.push( { [arrayValues[0]]: date } )      
              } 
              catch (error) { console.log('Bad Date', arrayValues[2]) }
            break        
          default:
        }
      })
      transposed !== '' ? find = Object.assign(...buildFilterArray) : find = {}
    }

    try {
      let total = await model.find(find).countDocuments()
      result.data = await model.find(find).skip(skip).limit(limit).sort(sort)
      if (result === undefined) return res.status(204).send()

      result.last_page = Math.ceil(total / limit)
      res.apiRes = result

      console.log('total', total)
      console.log('pages', result.last_page)
      console.log('limit', limit)
      console.log('skip', skip)
      console.log('page', page)
      console.log('sort', sort) 
      console.log('find',find)

      next()
    } catch (e) {res.status(500).json({ message: e.message})}
  }
}

// Creating a new Document
app.post('/api/create', async (req, res) => {
  const info = new Info({
    id: req.body.id,
    Status: req.body.Status,
    Company: req.body.Company,
    Prefix: req.body.Prefix,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    HouseNo: req.body.HouseNo,
    Street: req.body.Street,
    City: req.body.City,
    County: req.body.County,
    PostCode: req.body.PostCode,
    Country: req.body.Country,
    Tag: req.body.Tag,
    BusinessLine: req.body.BusinessLine,
    HomePhone: req.body.HomePhone,
    MobilePhone: req.body.MobilePhone,
    Email: req.body.Email,
    WebSite: req.body.WebSite,
    FaceBook: req.body.FaceBook,
    LastMeeting: req.body.LastMeeting,
    NextMeeting: req.body.NextMeeting,
    Info: [{Comments: req.body.Comments, Charts: req.body.Charts}],
    Files: [{Documents: req.body.Documents,}]
  })
  try {
    const newInfo = await info.save()
    res.status(201).json(newInfo)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Not needed atm.
function parseJSON (jsonString){
  try {
    var ob = JSON.parse(jsonString);
    if (ob && typeof ob === "object") {
      return ob;
    }
  }
  catch (e) { }
  return false;
} 

