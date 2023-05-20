// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract EtherCommerce {
    struct Product {
        uint256 id;
        address buyer;
        address seller;
        string name;
        string description;
        string category;
        string imageUrl;
        uint256 price;
        uint256 rating;
    }

    // This is equal to 0
    uint256 productCounter;

    mapping(uint256 => Product) public products;

    function createNewProduct(
        string memory _name, 
        string memory _description, 
        string memory _category, 
        string memory _imageUrl,
        uint256 _price,
        uint256 _rating
        ) public {
            Product memory newProduct = Product({
                id: productCounter,
                buyer: address(0),
                seller: msg.sender,
                name: _name,
                description: _description,
                category: _category,
                imageUrl: _imageUrl,
                price: _price,
                rating:_rating
            });

            // products[0] = newProduct => first product
            // indexes are always started with 0
            products[productCounter] = newProduct;
            
            // Increment +1
            productCounter++;
        }

        function getNumOfProducts() public  view returns (uint256) {
            return productCounter;
        }

        function purchaseProduct(uint256 _id) public payable {
            // Finding the product based on _id index
            Product storage product = products[_id];

            // wallet address money should be equal to product price, else You have invalid amount
            require(msg.value == product.price, "You have invalid amount");

            // Seller and buyer wallet address shouldn't be equal to each other
            require(product.seller != address(0));

            // Buyer and Buyer wallet address should be same
            require(product.buyer == address(0));

            // Seller and Seller wallet address should not be same when buying their own product
            require(msg.sender != product.seller, "You cannot buy your owned product");

            // product.buyer = any wallet address
            product.buyer = msg.sender;

            // Paying a seller to crypto based on product price
            payable(product.seller).transfer(msg.value);
        }
}