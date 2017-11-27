//store_slug is the last component of the URL where you normally look at your company.
//for example, the following url:
//https://www.reviews.io/company-reviews/store/euro-car-parts
//the store_slug is `euro-car-parts`.
module.exports = async store_slug => {
	const url = `https://www.reviews.io/company-reviews/store/${store_slug}`;

	
}