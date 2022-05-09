const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect =(callback)=>{
    MongoClient.connect('mongodb://Kraken_1223:omar123@cluster0-shard-00-00.etasw.mongodb.net:27017,cluster0-shard-00-01.etasw.mongodb.net:27017,cluster0-shard-00-02.etasw.mongodb.net:27017/shop?ssl=true&replicaSet=atlas-5dx57x-shard-0&authSource=admin&retryWrites=true&w=majority', { useUnifiedTopology: true } )
    .then(res=>{
        _db = res.db();
        callback()
    })
    .catch(err=>{
        console.log(err)
        throw err;
    })
}

const getDb=()=>{
    if (_db) {
        return _db;
    }
    throw 'No database found !';
}

exports.MongoClient = mongoConnect;
exports.getDb = getDb;

