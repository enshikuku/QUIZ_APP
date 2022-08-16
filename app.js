import express from 'express'

const app = express()

app.set('view engine', 'ejs')
// Landing page
app.get('/', (req, res) => {
    res.render('index')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`app is running on PORT ${PORT}`)
})