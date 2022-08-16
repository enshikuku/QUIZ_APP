import express from 'express'

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
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
    res.render('signup')
})
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`app is running on PORT ${PORT}`)
})