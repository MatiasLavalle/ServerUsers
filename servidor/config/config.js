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

process.env.MONG_URI = '';


if(process.env.NODE_ENV === 'dev'){
    urlDB =""
}else{
    urlDB= process.env.MONGO_URI;
}


process.env.URLDB = urlDB
