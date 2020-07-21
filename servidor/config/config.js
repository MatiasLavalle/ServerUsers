//===========================================
// puerto
//===========================================

process.env.PORT = process.env.PORT || 3000





//===========================================
//entorno
//===========================================


process.env.NODE_ENV = process.env.NODE_ENV || 'dev'





//===========================================
//base de datos
//===========================================



let ulrDB;

process.env.MONG_URI = 'mongodb+srv://Coloorado:matias150396@cluster0.wt9hp.mongodb.net/cursoit';


if(process.env.NODE_ENV === 'dev'){
    urlDB ="mongodb+srv://Coloorado:matias150396@cluster0.wt9hp.mongodb.net/cursoit"
}else{
    urlDB= process.env.MONGO_URI;
}


process.env.URLDB = urlDB