// SPDX-License-Identifier: MIT
// Deployed at: 0xc06189455340139e0edce0744d715ae43176cdd7
pragma solidity 0.8.21;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SWE is ERC721URIStorage {
    uint256 private _nextTokenId = 0;
    string public contractURI;

    constructor(string memory _contractURI) ERC721("StoryContract", "SWE") {
        contractURI = _contractURI;
    }

    function mint(string memory tokenURI) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }

    /// @notice Update contract URI
    /// @param _contractURI Contract metadata json
    function setContractURI(string memory _contractURI) external {
        contractURI = _contractURI;
    }
}
