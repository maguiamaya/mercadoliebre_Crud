const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const descuento= (descuento, precio)=>{
	let resultadoParcial = (precio/100)*descuento
	return precio= resultadoParcial
}

const controller = {
	index: (req, res) => {
		return res.render('index', {
			visita: products.filter(product => product.category === "visited"),
			toThousand,
			products,
			inSale: products.filter(product => product.category === "in-sale"),
			descuento
		})
	},


	search: (req, res) => {
		let results = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim()));
	
		return res.render('results', { keywords })
	},
};

module.exports = controller;
