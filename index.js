const Axios = require('axios');
const JSDOM = require('jsdom');

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

	//use JSDOM to traverse the html file for the data we need.
	const document = await new Promise(resolve => {
		JSDOM.env(html, (err, window) => {
			resolve(window.document);
		})
	})

	//search for the structured data with querySelector.
	const element = document.querySelector('script[type="application/ld+json"]');
	
	if(!element) throw new Error(`Couldn't find the structured data tag. This is probably because reviews.co.uk modified their markup, or they blocked this scraper somehow.`)

	const json = element.textContent;

	//parse the json so we can work with it.
	let data = JSON.parse(json);

	//filter it out, so we only include the data we're interested in.
	//TODO - allow users to specify keys (or all) the scraped data in the future.
	let filtered = {};

	filtered["aggregateRating"] = data["aggregateRating"];
	filtered["review"] = data["review"];

	return filtered;
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