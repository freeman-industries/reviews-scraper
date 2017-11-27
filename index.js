const Axios = require('axios');
const JSDom = require('jsdom');

const fetchPage = async url => {
	if(!url) throw new Error('No url was supplied.')
	
	const response = await Axios({
		method: 'get',
		url
	});

	const html = response.data;

	return html;
}

const extractStructuredData = async html => {
	if(!html) throw new Error('No html data supplied.');

	const document = await new Promise(resolve => {
		JSDOM.env(html, (err, window) => {
			resolve(window.document);
		})
	})
}

//store_slug is the last component of the URL where you normally look at your company.
//for example, the following url:
//https://www.reviews.io/company-reviews/store/euro-car-parts
//the store_slug is `euro-car-parts`.
module.exports = async store_slug => {
	const url = `https://www.reviews.io/company-reviews/store/${store_slug}`;

	const html = await fetchPage(url);

	return html;
}