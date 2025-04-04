import bcrypt from "bcryptjs";

const users=[
    {
        name:'Admin User',
        email:"admin@hotmail.com",
        password:bcrypt.hashSync("123456",8),
        isAdmin:true
    }, 
    {
        name:'John Doe',
        email:"John@hotmail.com",
        password:bcrypt.hashSync("123456",8),
        isAdmin:false
    },
    {
        name:'Jane Doe',
        email:"Jane@hotmail.com",
        password:bcrypt.hashSync("123456",8),
        isAdmin:false
    }
]
export default users;