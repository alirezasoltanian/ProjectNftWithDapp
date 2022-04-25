const { assert } = require('chai');

const Nft3 =  artifacts.require('./Nft3.sol')


require('chai').use(require('chai-as-promised')).should

contract('Nft3' , accounts=>{
      let Mycontract ;
      before(async () => {
        Mycontract = await Nft3.deployed()
      })
      describe('deployment', async () => {
        it('deploys successfully', async () =>{
            const address = await Mycontract.address

            assert.notEqual(address , 0x0 )
            assert.notEqual(address , '' )
            assert.notEqual(address , null)
            assert.notEqual(address , undefined)

        })

        it('name is ok', async () => {
          const name = await Mycontract.name()

          assert.equal(name , 'Project')
        })
        it('name is ok', async () => {
          const symbol = await Mycontract.symbol()

          assert.equal(symbol , 'RP')
        })
        it('mint handler' , async () => {
          await Mycontract.setIsPublicMintEnabled('true')
          await Mycontract.mint(1,{ from: accounts[1], value: 2})
          
          const balance =  await Mycontract.balanceOf(accounts[1])
          assert.equal(balance , 1);
            
        })
        it('totalSupply handler' , async () => {
          await Mycontract.setIsPublicMintEnabled('true')
          await Mycontract.mint(1,{ from: accounts[1], value: 2})
          
          const supply =  await Mycontract.totalSupply()
          assert.equal(supply , 2);
            
        })
        it('balance handler' , async () => {

          const maxSupply =  await Mycontract.maxSupply()
          assert.equal(maxSupply , 1000);
            
        })


      })
    })
    