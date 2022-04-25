import './App.css';
import Nft3ABI from './abi/Nft3ABI.json';
import React , { useState } from 'react';
import { ethers } from 'ethers' ;
import Navbar from './component/Navbar.js';
import Mint from './component/Mint.js';
const Nft3Address = '0xB180F84d2780af836420Fc31Ff7C6d787Cc3aCC6';


function App() {
  const [Address, setAddress] = useState(null)
  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts',[]);
    const signer = provider.getSigner();
    signer.getAddress().then((result)=>{setAddress(result)});
  }
  
  const disconectWallet = () =>{
    setAddress(null);
  }
  const handleMint = async(e) => {
    e.preventDefault()
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const erc20 = new ethers.Contract(Nft3Address, Nft3ABI, signer);
    const mintAmount = data.get('amount') ;
    //const priceMint = BigNumber.from(1) ; 
    const priceMint = ethers.utils.parseEther('1') ; 
    await erc20.mintNft(mintAmount,{value: priceMint.mul(mintAmount)});
  } 
  
  
  return (
    <>
    <Navbar connectWallet={connectWallet} disconectWallet={disconectWallet} Address ={Address} setAddress ={setAddress} />

    <div className=" h-screen grid grid-cols-1 gap-5 md:grid-cols-2 bg-gray-800 pt-4 pb-6">
    <div className = "p-6">
            <Mint handleMint={handleMint} />
    </div>
  
    </div>
    
    </>
    
  );
}

export default App;
