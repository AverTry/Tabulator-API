const moment = require('moment')
// moment.suppressDeprecationWarnings = true


// new Date(dateString).toISOString()
// let date = new Date("2008-05-30T00:00:00.000Z")

// let date = moment("30-05-2008")
// moment.locale('en-GB');

// console.log(moment('22/12/2019', 'DD/MM/YYYY'))
// console.log(moment("30-05-2008", 'DD/MM/YYYY', 'en-GB').toISOString())

// let date = moment("30/05/2008", 'DD/MM/YYYY').local().format()
// console.log(date)
let date = new Date("2008-05-30T00:00:00.000Z")
// console.log(moment("16/04/1990", ["DD/MM/YYYY", "YYYY/MM/DD"]))
// console.log(new Date("16/04/1990", ["DD/MM/YYYY", "YYYY/MM/DD"]))

// let str = moment("2008-05-30").toISOString()
// console.log(str)

// dateArray = str.split("/")
// let dobj = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`)
// console.log('dobj', dobj)
// let dobj = moment("30-05-2008", 'DD/MM/YYYY', 'en-GB').toISOString()
// console.log('dobj', dobj)
// let date = { $gte: new Date(dobj.setHours(00,00,00)) , $lt : new Date(dobj.setHours(23,59,59)) }
// console.log('date', date)
// moment(new Date()).format("YYYY-MM-DD")
// console.log(moment(new Date()).format("DD/MM/YYYY"))

// try { console.log(dobj) } catch (error) { console.log('error', 'Bad Date') }

find = { AccountCreated: {
    $gte: new Date(date.setUTCHours(00, 00, 00)),
    $lt: new Date(date.setUTCHours(23, 59, 59))
}}

console.log(find)

    // {
    //   $and: [
    //     {"date": {$gte: new Date("2015-07-07T00:00:00.000Z")}},
    //     {"date": {$lt: new Date("2015-07-08T00:00:00.000Z")}}
    //     ]
    // }

// new Date(dateString).toISOString()
    // let date = new Date("2008-05-30T00:00:00.000Z")
    // let date = new Date(date.parse("30/05/2008")).toISOString()

    // let str = "30/05/2008"
    // console.log('str', str)
    // dateArray = str.split("/")
    // let dobj = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`)
    // console.log('dobj', dobj)
    // let date = { $gte: new Date(dobj.setUTCHours(00,00,00)) , $lt : new Date(dobj.setUTCHours(23,59,59)) }
    //             console.log('date', date)

    // try { console.log(dobj) } catch (error) { console.log('error', 'Bad Date') }

  //   find = {AccountCreated:     {     
  //       $gte:   new Date(date.setUTCHours(00,00,00)) ,     
  //       $lt :  new Date(date.setHours(23,59,59)) 
  //  } }
