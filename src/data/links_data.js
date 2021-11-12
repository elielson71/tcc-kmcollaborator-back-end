const database = require('../infra/database')
exports.getOneLinks = function(id_links){
   return database.query(`select id_links from links where id_links=${id_links}`)
}
exports.getLinks = function(id_perguntas){
   return database.query(`select * from links where id_perguntas=${id_perguntas}`)
}
exports.deleteLinks = function(id){
   return database.none('DELETE FROM links WHERE id_links=$1',[id]);
}
exports.saveLinks = function (links){
   return database.one('INSERT INTO links (dados,id_midia,id_perguntas) VALUES($1,$2,$3) returning *',
   [links.dados,links.id_midia,links.id_perguntas])
}
/*
id_links INTEGER NOT NULL,
  dados VARCHAR,
  id_midia INTEGER,
  id_perguntas INTEGER,
  PRIMARY KEY(id_links)
*/