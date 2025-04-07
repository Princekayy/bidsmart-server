import AuthService from "../services/auth.service.js";

export default class AuthController {

    authService;
    constructor() {
        this.authService = new AuthService()
    }

    async registerUser(req, res){
        try {
    
            await this.authService.register(req.body);
    
            res.json({ msg: 'User registered successfully' });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }

    async login(req, res) {
        try {
    
            const response = await this.authService.login(req.body);
    
            res.json({ token: response });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }
}