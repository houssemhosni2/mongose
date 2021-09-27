const mongoose=require('mongoose');
//Create a person having this prototype:
const PersonSchema = mongoose.Schema({
    name:{
        type:String, required:true
    },
    age:{
        type:Number
    },
    favoriteFoods:{
        type:[String]
    }
}); 

module.exports = mongoose.model('Persons',PersonSchema);