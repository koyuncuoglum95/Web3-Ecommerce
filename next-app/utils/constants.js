import Web3 from 'web3';
import ContractABI from './EtherCommerce.json';

// export const address = '0x255Eb624262aa2eb81dd4815F9D4c9f2Aa3130BA' Goerli

// export const ganacheAddress = '0xc109850D26FA71154a03059039C0AE766A76eAb4'; // Ganache

export const address = '0xfE26B6142CD05abBb8d014D57a2C8fB16A9e25d6';

export const createContract = () => {
  const { ethereum } = window;

  if (ethereum) {
    const web3 = new Web3(ethereum);
    return new web3.eth.Contract(ContractABI.abi, address);
  }
}

export const modalStyles = {
  content: {
    height: 'fit-content',
    width: 'fit-content',
    margin: 'auto',
    marginTop: '10px',
    display: 'flex',
    padding: '0px',
  },
  overlay: {
    backgroundColor: 'rgb(0 0 0 / 74%)',
  },
}
