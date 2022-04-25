// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "../openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../openzeppelin-contracts/contracts/access/Ownable.sol";

contract Nft3 is ERC721, Ownable {
  uint public mintPrice;
  uint public totalSupply;
  uint public maxSupply;
  uint public maxPerWallet;
  bool public isPublicMintEnabled;
  string internal baseTokenUri;
  address payable public withdrawWallet;
  mapping(address => uint256) public walletMints;

  constructor() payable ERC721('Project','RP') {
    mintPrice = 1 ether;
    totalSupply = 0 ;
    maxSupply = 1000 ;
    maxPerWallet = 3 ;
  }

  function setIsPublicMintEnabled(bool isPublicMintEnabled_ ) external onlyOwner {
    isPublicMintEnabled = isPublicMintEnabled_ ;
  } 

  function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
    baseTokenUri = baseTokenUri_;
  }

  function tokenURI(uint256 tokenId_) public view override returns (string memory){
    require(_exists(tokenId_), 'token dose not exist!');
    return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), 'json'));
  }
  function withdraw() external onlyOwner {
    (bool success,) = withdrawWallet.call{ value: address(this).balance }('');
    require(success, 'withdraw failed');
  }
  function mintNft(uint quntity_) public payable {
    require(isPublicMintEnabled, 'minitng not enable');
    require(msg.value == quntity_*mintPrice, 'wrong mint value');
    require(totalSupply + quntity_ <= maxSupply,'sold out');
    require(walletMints[msg.sender] + quntity_ <= maxPerWallet, 'exceed max wallet');
    for (uint256 i = 0 ; i<quntity_; i++) {
      uint256 newTokenId = totalSupply + 1 ;
      totalSupply++;
      _safeMint(msg.sender, newTokenId);
    }
  }
}