// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0; //should be greater than 0.8

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ATNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private supply;

    constructor() ERC721("Ayush Thakur", "ATNFT") {
        //constant param reduces gas
    }

    receive() external payable {}

    function mint(string memory _tokenURI) external payable returns (uint256) {
        require(
            !isContract(msg.sender),
            "msg.sender is not a externally owned wallet"
        );
        require(msg.value == 0.5 ether, "0.5 eth is required to mint.");
        supply.increment();

        uint256 tokenId = supply.current();
        _mint(msg.sender, tokenId);

        _setTokenURI(tokenId, _tokenURI);

        return tokenId;
    }

    function isContract(address _address)
        public
        view
        returns (bool isSmartContract)
    {
        uint32 size;
        assembly {
            size := extcodesize(_address)
        }
        return (size > 0); //Warning: will return false if the call is made from the constructor of a smart contract
    }
}

contract Testing {
    ATNFT tokenContract;

    constructor(address _contractAddress) {
        tokenContract = ATNFT(payable(_contractAddress));
    }

    receive() external payable {}

    function callMint() public payable {
        tokenContract.mint(" ");
    }
}
