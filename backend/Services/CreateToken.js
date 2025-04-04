import jwt from 'jsonwebtoken'

export const TokenGenerate=(payload,expiredIn)=>{
    const token=jwt.sign({userId:payload},process.env.JWT_SECRET,{
        expiresIn:expiredIn
    })
    return token

}