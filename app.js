var express = require('express');
const mongoose = require('mongoose');
const Person = require('./models/Person.js');
require('dotenv/config')

var app = express();
//Connect to DataBase
mongoose.connect(process.env.MONGO_URI,
  {useNewUrlParser: true, useUnifiedTopology: true},
  ()=>{
      console.log('connected to Database');
  });
//Create and Save a Record of a Model:
const person = new Person({
    name:'houssem',
    age:22,
    favoriteFoods:['pizza','Spaghetti']
  })
  person.save((err,data)=>{
    if (err)console.error(err.stack)
    console.log(data)
  })
//Create Many Records with model.create():
const person1 = [new Person({
    name:'chedli',
    age:23,
    favoriteFoods:['pizza','Spaghetti']
  }),new Person({
    name:'rihab',
    age:22,
    favoriteFoods:['pizza','Spaghetti']
  }),new Person({
    name:'ahmed',
    age:20,
    favoriteFoods:['pizza','Spaghetti']
})]
Person.create(person1,(err,data)=>{
  if (err)console.error(err.stack)
  console.log(data)
})
//Use model.find() to Search Your Database:
Person.find({name:'houssem'})
.exec(function(err,persons){
  if(err){console.error(err.stack)}
  console.log(persons)
})
//Use model.findOne() to Return a Single Matching Document from Your Database
Person.findOne({favoriteFoods:'pizza'})
.exec(function(err,persons){
  if(err){console.error(err.stack)}
  console.log(persons)
})
//Use model.findById() to Search Your Database By _id
Person.findById("604d59fed874e32bcc53a0f9")
.exec(function(err,persons){
  if(err){console.error(err.stack)}
  console.log(persons)
})
//Perform Classic Updates by Running Find, Edit, then Save:
Person.findById("604d5dbc5ec7892bdccd7918")
.exec(function(err,persons){
  if(err){console.error(err.stack)}
  persons.favoriteFoods.push('hamburger')
  persons.save((err,data)=>{
    if (err){console.error(err.stack)}
    console.log(data)
  })
})
//Perform New Updates on a Document Using model.findOneAndUpdate():
Person.findOneAndUpdate({name:'ahmed'},{age:20},{new:true,useFindAndModify:false})
.exec(function(err,persons){
  if(err){console.error(err.stack)}
  console.log(persons)
})
//Delete One Document Using model.findByIdAndRemove:
Person.findOneAndRemove("604d5d3192fc2e07b4fdf5e2",{useFindAndModify:false})
.exec(function(err,persons){
  if(err){console.error(err.stack)}
  console.log(persons)
})
//MongoDB and Mongoose - Delete Many Documents with model.remove():
Person.remove({name:"Mary"})
.exec(function(err,persons){
  if(err){console.error(err.stack)}
  console.log(persons)
})
//Chain Search Query Helpers to Narrow Search Results:
Person.find({favoriteFoods:{$all:'burrito'}})
.sort({name:1})
.limit(2)
.select('-age')
.exec(function(err,persons){
  if(err){console.error(err.stack)}
  console.log(persons)
})

app.listen(3000,()=>console.log(`server running on http://localhost:3000`));
module.exports = app;
