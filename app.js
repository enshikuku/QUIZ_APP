import express from 'express'

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
const users = [
    { 
        name: 'Emma', 
        email: 'en@shi.com', 
        password: '1234567890' 
    }, 
    { 
        name: 'Kenya', 
        email: 'ke@gmail.com', 
        password: '987654321' 
    },
    { 
        name: 'tree', 
        email: 're@shi.com', 
        password: '6789054321' 
    }
]
// Landing page
app.get('/', (req, res) => {
    res.render('index')
})
// Display Login Page
app.get('/login', (req, res) => {
    res.render('login')
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
        
    } else {
        
        let message = 'Passwords dont match!'
        res.render('signup', {error:true, message: message, user: user})

    }
    

    console.log(user)
    res.send('User account succesfully created')
})
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`app is running on PORT ${PORT}`)
})