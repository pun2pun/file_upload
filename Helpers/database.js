const config = require('../config.json')

const Pool = require('pg').Pool
const pool = new Pool({
    user:config.database.USERNAME,
    password:config.database.PASSWORD,
    host:config.database.HOST,
    database:config.database.DATABASE,
    port:config.database.PORT

})

const upLoadFile = (req,res) => {
    const info = req.files[0]
    const { fieldname,
            originalname,
            encoding,
            mimetype,
            destination,
            filename,
            path,
            size } = info
    const queryString = `INSERT INTO public.documents(fieldname, originalname, encoding, mimetype, destination, filename, path, size) 
    VALUES ('${fieldname}', '${originalname}', '${encoding}', '${mimetype}', '${destination}', '${filename}', '${path}', '${size}');`
    
    pool.query(queryString,(err,result)=>{
        if(err){ res.json(err) }
        else{
            res.json({
                result:"Success",
                file_detail:req.files
            })
        }
    })    
}

const getDocumentList = (req,res) =>{
    const queryString = `SELECT * FROM public.documents ORDER BY originalname ASC`
    pool.query(queryString, (err,result) => {
        if(err){ res.send(err)}
        else{
            res.send(result.rows)
        }
    })
}



module.exports = {
    upLoadFile,
    getDocumentList
}
