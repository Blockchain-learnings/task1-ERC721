// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ATNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _supply;
    mapping(address => mapping(uint256 => uint256)) private _ownersNFTs;

    event Minted(address _from, uint256 _id, string _tokenURI);

    constructor() ERC721("Ayush Thakur", "ATNFT") {}

    receive() external payable {}

    function mint(string memory _tokenURI) external payable returns (uint256) {
        require(!isContract(msg.sender), "msg.sender not EOW");
        require(msg.value == 0.5 ether, "0.5 eth required to mint");
        _supply.increment();

        uint256 tokenId = _supply.current();
        _mint(msg.sender, tokenId);

        uint256 _ownerBalance = balanceOf(msg.sender) + 1;
        _ownersNFTs[msg.sender][_ownerBalance] = tokenId;

        _setTokenURI(tokenId, _tokenURI);

        emit Minted(msg.sender, tokenId, _tokenURI);

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

    function getNFTsForOwner(address walletAddress)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory NFTs;
        uint256 ownerBalance = balanceOf(walletAddress);
        for (uint256 i = 1; i <= ownerBalance; i++) {
            NFTs[i] = _ownersNFTs[walletAddress][i];
        }
        return NFTs;
    }
}

contract Testing {
    ATNFT private _tokenContract;

    constructor(address _contractAddress) {
        _tokenContract = ATNFT(payable(_contractAddress));
    }

    receive() external payable {}

    function callMint() public payable {
        _tokenContract.mint("");
    }
}
