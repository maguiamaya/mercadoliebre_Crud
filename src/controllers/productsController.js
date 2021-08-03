const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const descuento = (descuento, precio) => {
	let resultadoParcial = (precio / 100) * descuento
	return precio = resultadoParcial
}

const controller = {
	// Root - Show all products
	index: (req, res) => {
		return res.render('products', {
			products, toThousand, descuento
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find(product => product.id === +req.params.id); //como tengo una igualdad absoluta, puedo usar el + delante del req.params para convertir el id en numero
		return res.render('detail',{ 
			product,
			products, toThousand, descuento,
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form', { products })
	},
	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find(product => product.id === +req.params.id);
		return res.render('product-edit-form', { product })
	},

	// Create -  Method to store
	store: (req, res) => {
		const { name, price, discount, category, description } = req.body;
		let product = {
			id: (products[products.length - 1].id + 1),
			name,
			description,
			price: +price,
			category,
			discount: +discount,
			image: "default-image.png"

		}
		products.push(product);
		fs.writeFileSync(productsFilePath,JSON.stringify(products, null, 2), 'utf-8');
		return res.redirect('/products')
	},
	// Update - Method to update
	update: (req, res) => {
		const{name, price, description, discount, category} = req.body;

products.forEach(product=>{
	if(product.id === +req.params.id){
		product.id =  +req.params.id;
		product.name = name;
		product.discount = +discount;
		product.price = +price;
		product.category = category;
		product.description = description
	}
});
fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
		return res.redirect('/products')
	
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		let idproduct = req.params.id;
		products.forEach(product => {
			if (product.id == idproduct) {
				let aEliminar = products.indexOf(product);
				products.splice(aEliminar, 1);
			}
		})
		fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(products, null, 2), 'utf-8');
		res.redirect('/products')


	}
};

module.exports = controller;