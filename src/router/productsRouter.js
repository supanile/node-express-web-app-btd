const express = require("express");
const productsRouter = express.Router();
const products = require("../data/products.json");

// Utility function to find related products
const findRelatedProducts = (currentProductId, limit = 3) => {
  return products
    .filter(product => product.id !== currentProductId) // Exclude current product
    .slice(0, limit); // Limit the number of related products
};

// Get all products
productsRouter.route("/").get((req, res) => {
  try {
    res.render("products", {
      products,
      pageTitle: "Our Products"
    });
  } catch (error) {
    console.error('Error rendering products page:', error);
    res.status(500).send("Internal Server Error");
  }
});

// Get single product by ID
productsRouter.route("/:id").get((req, res) => {
  try {
    const id = parseInt(req.params.id); // Convert to integer
    const product = products.find(p => p.id === id);

    if (!product) {
      return res.status(404).render("error", {
        message: "Product not found",
        error: { status: 404 }
      });
    }

    // Find related products (excluding current product)
    const relatedProducts = findRelatedProducts(id);

    // Add some sample features and specifications
    const enrichedProduct = {
      ...product,
      features: [
        "Premium quality",
        "Environmentally friendly",
        "Long lasting formula"
      ],
      specifications: {
        "Volume": "1000ml",
        "Weight": "1.2kg",
        "Shelf Life": "24 months",
        "Made in": "Thailand"
      }
    };

    res.render("product", {
      product: enrichedProduct,
      relatedProducts,
      pageTitle: enrichedProduct.productTitle
    });

  } catch (error) {
    console.error('Error rendering product page:', error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = productsRouter;