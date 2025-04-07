import UserRepository from "../repositories/user.repository.js";
import { encrypt, decrypt } from "../utils/encryption.js";
import { generateToken } from "../utils/token.js";

export default class AuthService {

    userRepository;

    constructor(){
        this.userRepository = new UserRepository()
    }

    async register(payload){
        const { email, password } = payload;
        
         let user = await this.userRepository.doesEmailExist(email);
           
         if (user)  throw new Error("email already exists")
 
         const hashedPassword = await encrypt(password);
 
         await this.userRepository.addUser({ ...payload, password: hashedPassword });
    }

    async login(payload) {
        const { email, password } = payload;
        let user = await this.userRepository.doesEmailExist(email);

        if (!user) throw new Error("Invalid credential")
            
        const isMatch = await decrypt(password, user.password);
      
        if (!isMatch) throw new Error("Invalid credentials")
 
        return await generateToken({ user_id: user.id});
    }
}