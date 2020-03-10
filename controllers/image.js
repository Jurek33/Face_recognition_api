const clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '5f446fc3bee442b68180b3246d16db9e'
});

const handleApiCall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json('error with API'))
}

const handleImagePut = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries =>{
  		res.json(entries[0]);
  	})
  	.catch(err => res.status(400).json('error getting entries'))
}

module.exports = {
	handleImagePut,
	handleApiCall
}