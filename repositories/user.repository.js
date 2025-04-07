import User from "../models/User.js";


export default class UserRepository {
    constructor(){

    }

    async addUser(userData){
        return await User.create(userData);
    }

    async doesEmailExist(email){
        return await User.findOne({ email });
    }
}