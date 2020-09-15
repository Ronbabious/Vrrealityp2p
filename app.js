const express = require('express');
const app = express();
const router = express.Router();
const path = process.cwd(); // Get current path for process
const port = 8080;
console.log(path);

router.use(function(req, res, next) {
	console.log('/' + req.method);
	next();
});

router.get('/', function(req, res) {
	res.sendFile(path + 'blank.js');
});

app.use(express.static(path));
app.use('/', router);

app.listen(port, function() {
	console.log('Example app listening on port 8080!');
});
