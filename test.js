const Scrape = require('./index.js');

return Promise.resolve().then(async () => {
	const reviews = await Scrape('euro-car-parts');

	console.log(reviews);

	process.exit(0);
}).catch(error => {
	console.log("\x1b[41m😱 ", error);
	process.exit(1);
})