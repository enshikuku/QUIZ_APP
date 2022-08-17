import express from 'express'
import bcrypt from 'bcrypt'
import mysql from 'mysql'

const app = express()
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quiz_app'
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))

// Landing page
app.get('/', (req, res) => {
    res.render('index')
})
// Display Login Page
app.get('/login', (req, res) => {
    const user = {
        email : '',
        password : ''
    }
    res.render('login', {error:false, user: user})
})
// process login page
app.post('/login', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    let sql = 'SELECT * FROM student WHERE email = ?'
    connection.query(
        sql, [user.email], (error, results) => {
            if (results.length > 0) {
                bcrypt.compare(user.password, results[0].password, (error, passwordMatches) => {
                    if (passwordMatches) {
                        res.send('Grant Access!@')
                    } else {
                        let message = 'Incorrect password!'
                        res.render('login', {error: true, message: message, user: user})
                    }
                })
            } else {
                let message = 'Account does not exist please create one'
                res.render('login', {error: true, message: message, user: user})
            }
        }
    )
})

// Display Signup Page
app.get('/signup', (req, res) => {
    const user = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    res.render('signup', {error:false, user: user})
})
// process signup form 
app.post('/signup', (req, res) => {
    const user = {
        name: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }
    if (user.password === user.confirmPassword) {
        // check if user exists
        let sql = 'SELECT * FROM student WHERE email = ?'
        connection.query(
            sql, [user.email], (error, results) => {
                if (results.length > 0) {
                    let message = 'Account already exists with the email provided!'
                    res.render('signup', {error: true, message: message, user: user})
                }  else {
                    // create account
                    bcrypt.hash(user.password, 10, (error, hash) => {
                        let sql = 'INSERT INTO student (email, name, password) VALUES (?,?,?)'
                        connection.query(
                            sql,
                            [
                                user.email,
                                user.name,
                                hash
                            ],
                            (error, results) => {
                                res.send('Account successfully created')
                            }
                        )
                    })
                }
            }
        )
        
    } else {
        
        let message = 'Passwords dont match!'
        res.render('signup', {error:true, message: message, user: user})

    }
    
})
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`app is running on PORT ${PORT}`)
})