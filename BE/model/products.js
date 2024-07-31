const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
});

const productSchema = mongoose.Schema({
    product_name:{
        type: String,
        required: true
    },
    brandName:{ 
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    

 
    productImage:[{
        type:String,
        
    }],
    
    discription: {  
        type: String,
        required: true
    
    },
    reviews: [reviewSchema],
  
    countInStock: {
        type: Number,
        required: true,
        max: 255,
        min:0
    },
    
    
});

exports.Product = mongoose.model('Product', productSchema);