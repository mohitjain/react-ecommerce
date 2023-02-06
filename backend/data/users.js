import bycrpt from 'bcryptjs'

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bycrpt.hashSync("123456", 10),
        isAdmin: true 
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: bycrpt.hashSync("123456", 10),
        isAdmin: false 
    },
    {
        name: "Jane Doe",
        email: "jane@example.com",
        password: bycrpt.hashSync("123456", 10),
        isAdmin: false 
    }
]

export default users