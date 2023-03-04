import express,{Request, Response} from 'express'
import multer from 'multer'
import ejs from 'ejs'
import expressEjsLayouts from 'express-ejs-layouts'
import path from 'path'

const app = express()

const storage:multer.StorageEngine = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, __dirname + '/images')
    },
    filename(req, file, callback) {
        
        console.log(file)
        callback(null, file.originalname)
    },
})

const upload:multer.Multer = multer({storage: storage})

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res)=> {
    res.render('index')
})

app.post('/upload', upload.single('images'), (req, res)=>{
    res.send('image uploaded successfully')
})

app.listen(3005, ()=>{
    console.log('now listening on port 3005')
})