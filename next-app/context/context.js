import { createContext, useEffect, useState, useContext } from 'react';
import { useAccount } from 'wagmi'
import Web3 from 'web3';
import { createContract } from '../utils/constants.js';


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [contract, setContract] = useState(null);
    const [userAddress, setUserAddress] = useState('');
    const [products, setProducts] = useState([]);

    // Metamask Account Address
    const { address } = useAccount();

    useEffect(() => {
        setUserAddress(address);
        setContract(createContract);
        console.log(contract);
    },[address]);


    useEffect(() => {
        getAllProducts();
    }, [contract])

    const createAndSellProduct = async (name, desc, category, image, price, rating) => {
        if (contract) {
            try {
                // Converting ether into Wei and shows the price as an ether
                const WeiPrice = Web3.utils.toWei(price, 'ether');
                // send({}) is used for both buy and sell thing in smart contract
                await contract.methods.createNewProduct(name, desc, category, image, WeiPrice, rating)
                .send({ from: userAddress, gas: 3000000, gasPrice: null })
            } catch (error) {
                console.log(error);
            }
        }
    }

    const getAllProducts = async () => {
        setProducts([])

        if(contract) {
            try {
                // this is productCounter (integer) from EtherCommerce.sol
                const productCounter = await contract.methods.getNumOfProducts().call();

                for (let i = 0; i < productCounter; i++) {
                    // This is connecting mapping products mapping and finding product based on index
                    // products(i) is the same as products(productCounter) from EtherCommerce.sol
                    const product = await contract.methods.products(i).call();

                    const existedProduct = {
                        id: product.id,
                        buyer: product.buyer,
                        seller: product.seller,
                        name: product.name,
                        description: product.description,
                        category: product.category,
                        imageUrl: product.imageUrl,
                        price: Web3.utils.fromWei(product.price, 'ether'),
                        rating: product.rating,
                    };

                    setProducts(prev => [...prev, existedProduct]);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }


    const buyProduct = async (id) => {
        if (contract) {
            try {
                // This is connecting mapping products mapping and finding product based on id
                // This is also price of an product based on index id
                const price = await contract.methods.products(id).call();
                // send({}) is used for both buy and sell thing in smart contract
                await contract.methods.purchaseProduct(id).send({
                    from: userAddress,
                    gas: 3000000,
                    gasPrice: null,
                    value: price['price'],
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <AppContext.Provider value={{ createAndSellProduct, products, buyProduct}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}