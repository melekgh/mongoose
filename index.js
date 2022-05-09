const express = require("express")
 const app = express()
require('dotenv').config()
const mongoose= require('mongoose')
const Person= require('./model/Person')

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
.then(() =>console.log('data base connecté'))
.catch((err)=>console.log(err))

//ceration
let test = Person.create({
    name:"olfa",
    age:"30",
    favoriteFood:["koskoss","pizza"]
},async(err,data)=>{
    if(err)throw err
    await console.log(data)
})
//create Many

let arrayOfPeople = [
  {name: "rawand Mzoughi", age: 22, favoriteFoods: ["Tacos"]},
  {name: "Rim Chiboub", age: 24, favoriteFoods: ["Lablebi"]},
  {name: "Ibtycem Khedhri", age: 26, favoriteFoods: ["Kafteji"]},
  {name: "Nour Mekni", age: 29, favoriteFoods: ["S7an Tounsi"]},    
  {name: "Hana Mohamed", age: 28, favoriteFoods: ["Mosli"]}
];
 let teste = Person.create(arrayOfPeople, async (err, data) => {
  if (err){console.log(err)}
  await console.log(data)

} )
    //find

       let testee=Person.find({"name": "Ibtycem Khedhri"}, async(err,data)=>{
       if(err) throw console.log(err)
        await console.log(data)
          })  
        
      //find one  
      
         let one =Person.findOne({ favoriteFood: "pizza" }, async(err, data) => {
          if (err) throw console.log(err);
         await console.log (data);
       });
        //findbyid

        let id="6276cd6b16f5f221d3050943"
        let ff = Person.findById({_id: id }, async(err,data)=>{
         if(err)throw err
          await console.log(data)
       })
        //modifier 
        const foodToAdd = "hamborger";
  Person.findById({_id:id}, async(err, data) => {
    if (err) throw (err);
    await data.favoriteFood.push(foodToAdd);
    data.save(async(err, data) =>
       err
        ? console.error("error saving data: ", err.message)
        : await console.log(data)
   );
  })
  //update age
  const ageToSet = 20;

  let age =  Person.findOneAndUpdate(
    { "name": "olfa" },
    { $set: { "age": ageToSet } },
    { new: true },
    async(err, data) => (err ? async(err, data) : console.log(data))
 );      
      //delete
      let dd ="6276cca1ea684c6a5bdb62e3"
       let sup = Person.findByIdAndRemove({_id:dd}, async(err, data) =>
      err ? async(err, data) : await console.log(data)
    ); 
//removemany

const nameRemove = "mary ";
  let rem = Person.remove({ name: nameRemove }, async(err, data) =>
    err ? async(err, data) : await console.log (data)
  );





 app.listen(PORT , ()=>{
     console.log('server is running')
 })

 