const express = require('express');
const app = express();
const port = 3001;

var pgp = require('pg-promise')(/*options*/)
var db = pgp('postgres://projectc:pc@188.166.94.83:5432/project_dev')

app.get('/collection', (req, res) => {
  db.many('SELECT * from schilderijen limit 3')
    .then(function (data) {
      res.send(data)
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    })
});

app.get('/schilderij/:id', (req, res) => {
  let id = req.params.id;

  db.one('SELECT * from schilderijen where id = $1', [id])
    .then(function (data) {
      res.send(data)
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    }) 
});

app.get('/schilders', (req, res) => {
  db.many('SELECT * from schilder limit 15')
    .then(function (data) {
      res.send(data)
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    })
});

app.get('/schilder/:name', (req,res) =>{
  let name = req.params.name.replace(/_/g, ' ');

  db.one('SELECT * from schilder where name = $1',[name])
  .then(function(data){
    res.send(data)
  })
  .catch(function(error){
    console.log('ERROR:', error)
  })
});

app.get('/werken-van/:name', (req,res) =>{
  let name = req.params.name.replace(/_/g, ' ');

  db.many('SELECT * from schilderijen where principalmaker = $1 limit 15', [name])
    .then(function (data) {
      res.send(data)
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    })
});

// $('#demo').pagination({
//   dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 35],
//   pageSize: 5,
//   autoHidePrevious: true,
//   autoHideNext: true,
//   callback: function(data, pagination) {
//       // template method of yourself
//       var html = template(data);
//       dataContainer.html(html);
//   }
// })

app.listen(port, () => console.log(`Server started on port ${port}`));