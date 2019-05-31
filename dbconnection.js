var mysql=require('mysql');
var connection=mysql.createPool({
 
host:'localhost',
port: '6000',
user:'root',
password:'',
database:'mydb'

});

module.exports=connection;