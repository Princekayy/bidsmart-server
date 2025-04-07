import bcrypt from "bcryptjs";

export const encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

export const decrypt = async (text, compared_text)=>{
    return await bcrypt.compare(text, compared_text).catch(err => console.log(err.message));
}