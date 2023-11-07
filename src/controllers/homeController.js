// Recupera o Base URL da API
const dotenv  = require('dotenv')
const api = process.env.APIbaseURL

exports.getAllBanners = async (req, res) => {
	try {
		res.render('home');
	} catch (error) {
		console.error(error);
	}
}
