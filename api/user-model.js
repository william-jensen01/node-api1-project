const shortid = require('shortid')
const { use } = require('./server')

let users = [
    { id: shortid.generate(), name: "William Jensen", bio: "full stack web developer" },
    { id: shortid.generate(), name: "Jane Doe", bio: "Not Tarzan's wife, another Jane" },
    { id: shortid.generate(), name: "Mattie Berry", bio: "Wannabe bacon expoer. Certified troublemaker. Reader. Internet buff. Music geek" }
]

module.exports = {
    findAll() {
        // SELECT  * FROM users;
        return Promise.resolve(users)
    },
    findById(id) {
        // SELECT * FROM users WHERE id = 1
        const user = users.find(u => u.id === id)
        return Promise.resolve(user)
    },
    create({ name, bio }) {
        // INSERT INTO users (id, name, bio)
        // VALUES ('xyz', 'Foo', 'random bio content information')
        const newUser = { id: shortid.generate(), name, bio}
        users.push(newUser)
        return Promise.resolve(newUser)
    },
    update(id, changes) {
        // UPDATE users SET name = 'Foo', bio = 'random bio crap' WHERE id = 1;
        const user = users.find(user => user.id === id)
        if(!user) return Promise.resolve(null)

        const updatedUser = { ...changes, id }
        users = users.map(u => (u.id === id) ? updatedUser : u)
        return Promise.resolve(updatedUser)
    },
    delete(id) {
        // DELETE FROM users WHERE id = 1;
        const user = users.find(user => user.id === id)
        if (!user) return Promise.resolve(null)

        users = users.filter(u => u.id !== id)
        return Promise.resolve(user)
    }
}