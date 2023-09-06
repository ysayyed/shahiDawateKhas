const {Schema, default: mongoose} = require('mongoose')

const bcrypt = require('bcrypt')

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    mobile: String,
},{timestamps: true})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            
            return user
        }
        else{
            throw Error("Incorrect Password!")
        }
    }
    else{
        throw Error('Incorrect Email')
    }
}


const User = mongoose.model('User', userSchema)

module.exports = User