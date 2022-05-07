// Metods to process informattion a productos
import Product from "../models/Product";

export const add = async (req, res) => {
  
  try {
    const {name, category, price, imgURL} = req.body
    const product = new Product({name, category, price, imgURL})
    
    const newRecord = await product.save()
    res.status(201).json({"message": newRecord})
    
  } catch (error) {
    res.status(500).json({"message": 'Missing add product...!!!'})
    console.error('Error in add Product: ', error.name + ': ' + error.message)

  }
}

export const list = async (req, res) => {
  
  await Product.find()
    .then((rows) => {res.status(200).json({"message": rows})})
}

export const show = async (req, res) => {

  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      throw new Error('Product not fount !!!')
    }
    res.status(200).json({"message": product})
    
  } catch (error) {
    res.status(500).json({"message": 'Product not found...!!!'})
    console.error('Error in add Product: ', error.name + ': ' + error.message)
  }
}

export const updateById = async (req, res) => {

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(204).json({"message": product})
    
  } catch (error) {
    res.status(500).json({"message": 'Product not update...!!!'})
    console.error('Error in add Product: ', error.name + ': ' + error.message)
  }
}

export const removeById = async (req, res) => {

  try {
    const product = await Product.findByIdAndRemove(req.params.id)
    res.status(204).json({"message": req.params.id})
    
  } catch (error) {
    res.status(500).json({"message": 'Product not update...!!!'})
    console.error('Error in add Product: ', error.name + ': ' + error.message)
  }
}


