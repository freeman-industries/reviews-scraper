const scraper = require('./index.js');

return Promise.resolve().then(() => {
	const reviews = await scraper('euro-car-parts');

	console.log(reviews);

	process.exit(0);
}).catch(error => {
	console.log("\x1b[41m😱 ", error);
	process.exit(1);
})