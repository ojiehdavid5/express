const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const userSchema = new Schema({
               username: {
                type: String,
                required: true
              },
              roles: {
                User: {
                  type: Number,
                  default: 200
                },
                Editor: {
                  type: Number,
                  default: 0
                },
                Admin: {
                  type: Number,
                  default: 1
                }
              },
              password: {
                type: String,
                required: true
              },
              refreshToken: String


})


module.exports=mongoose.model('User',userSchema);