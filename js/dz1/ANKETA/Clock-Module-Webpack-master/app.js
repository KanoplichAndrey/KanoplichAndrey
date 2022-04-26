var express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  isProd = typeof(process) !== 'undefined' && process && process.env && process.env.PORT,
  port = isProd ? process.env.PORT : 3000,
  rootFolder = `${__dirname}/www/${isProd ? 'release' : 'src'}`;

app.set('view engine', 'ejs');
app.set('views', './www/src/views');

app.use(express.static(rootFolder));
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.get('/form', function(req, res){
  res.render('form', { query: req.query });
});

app.post('/form', function(req, res){
  res.render('form', { query: req.body });
});

app.get('/', function(req, res){
  res.sendFile(`${rootFolder}/Index.html`);
});

app.get('*', function (req, res) {
  res.redirect('/');
});

app.listen(port, function () {
  console.log(`New express server started listening on port ${port}`);
});
