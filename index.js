const { databaseURL, serviceAccount, parameters  } = require('./config');
const HTTPPORT = 4444;
const express = require('express');
const app = express();
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL
});

const db = admin.database();
const namespace = db.ref('iot-project');
const records = namespace.child('records');

app.get('/send', function(req, res, next) {
	try {
		const data = {};
		parameters.forEach(parameter => {
			const { query } = req;
			if(!query[parameter]) {
				// means there is no data
				throw new Error(`Please insert ${parameter} data`);
			}
			data[parameter] = query[parameter];
		})
		// push data to firebase
		const array = records.push();
		array.set(data);
		res.json({
			ok: true,
			data: null
		})
	} catch(err) {
		// fallback exception
		next(err);
	}
});

app.get('/records', async function(req, res, next) {
	try {
		records.once('value', function(snap) {
			const datasets = snap.val();
			res.json({
				ok: true,
				data: reverseArray(datasets)
			})
		});
	} catch(err) {
		next(err);
	}
});

function reverseArray(datasets) {
	const keys = [];
	const newArray = {};
	Object.keys(datasets).map(key => {
		keys.push(key);
	});
	keys.reverse().forEach(key => {
		newArray[key] = datasets[key];
	});
	return newArray;
}

// error middleware
app.use(function(err, req, res, next) {
	res.status(400);
	res.json({
		ok: false,
		message: err.message
	})
});

app.listen(HTTPPORT, () => {
	console.log(`Server listening on port ${HTTPPORT}`);
})