// SPDX-License-Identifier: GPL-3.0
// Degen Age Early Adopters Pass v1.0
// @author 7938646E6B73

pragma solidity >=0.7.0 <0.9.0;

import "./ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract EAP is ERC721A, Ownable {
    using Strings for uint256;
    using ECDSA for bytes32;
    using ECDSA for bytes;

    uint256 public MAX_SUPPLY = 3000;
    uint256 public MAX_BATCH = 5;
    uint256 public SALE_PRICE = 0.008 ether;
    uint256 public GIVEAWAYS = 15;
    uint16 public sale_state;
    bool public paused;
    string public BASE_URL = "ipfs://QmRNnsqaP2qASYWVybUGnQhnXT3qrwZU6RopsvSTXc6khz/unrevealed.json";
    bytes32 public EXTENSION = ".json";
    bool public revealed;
    address public PRIMARY;
    address public PUB_KEY;
    
    constructor() ERC721A("Degen Age Early Adopters Pass", "EAP", MAX_BATCH, MAX_SUPPLY) {
        PRIMARY = msg.sender;
    }

    /* PUBLIC METHODS */

    /*
    *   @dev Allows public to mint an Early Adopters Pass.  Users are only allowed to mint MAX_BATCH
    *   passes per address.
    */
    function pubMint(uint256 quantity) public payable
    {
        require(!paused);
        require(totalSupply() + quantity <= MAX_SUPPLY, "All passes have been minted");
        require(sale_state == 2, "Sale is currently inactive");
        require(msg.value == SALE_PRICE * quantity, "Incorrect amount of Ether");
        require(tx.origin == msg.sender, "Contracts are not allowed to mint");
        require(_numberMinted(msg.sender) + quantity <= MAX_BATCH, "Address is not allowed to mint more than MAX_BATCH");        

        _safeMint(msg.sender, quantity);
    }

    /*
    *   @dev Allows WL member to mint an Early Adopters Pass.  Users are only allowed to mint MAX_BATCH
    *   passes per address.
    */
    function presale(bytes calldata _signature, uint256 quantity) public payable
    {
        require(!paused);
        require(totalSupply() + quantity <= MAX_SUPPLY, "All passes have been minted");
        require(sale_state == 1, "Sale is currently inactive");
        require(isWhitelisted(_signature, msg.sender), "User is not whitelisted");
        require(msg.value == SALE_PRICE * quantity, "Incorrect amount of Ether");
        require(tx.origin == msg.sender, "Contracts are not allowed to mint");
        require(_numberMinted(msg.sender) + quantity <= MAX_BATCH, "Address is not allowed to mint more than MAX_BATCH");        

        _safeMint(msg.sender, quantity);
    }

    function devMint(uint256 quantity) public onlyOwner {
        require(!paused);
        require(msg.sender == PRIMARY, "Address is not allowed to mint.");
        require(quantity % MAX_BATCH == 0, "Can only mint a multiple of MAX_BATCH");
        require(totalSupply() + quantity <= GIVEAWAYS, "Quantity exceeds number of reserved tokens");
         
        uint256 numBatch = quantity / MAX_BATCH;
        for(uint256 i = 0; i < numBatch; i++){
            _safeMint(msg.sender, MAX_BATCH);
        }
    }

    /* OVERRIDES */

    /*
    *   @dev Returns the tokenURI to the tokens Metadata
    * Requirements:
    * - `_tokenId` Must be a valid token
    * - `BASE_URL` Must be set
    */
    function tokenURI(uint256 _tokenId) public view virtual override returns(string memory){
        return !revealed ? BASE_URL : string(abi.encodePacked(BASE_URL, _tokenId.toString(), EXTENSION));
    }

    /**
    *   @dev function to verify address is whitelisted
    *   @param _signature - used to verify address
    *   @param _user - address of connected user
    *   @return bool verification
    */
    function isWhitelisted(bytes calldata _signature, address _user) private view returns(bool) {
        return abi.encode(_user,MAX_SUPPLY).toEthSignedMessageHash().recover(_signature) == PUB_KEY;
    }

    /* PRIVATE METHODS */

    function setPrimaryAddress(address _primary) public onlyOwner {
        PRIMARY = _primary;
    }

    function setPublicKey(address _pubKey) public onlyOwner {
        PUB_KEY = _pubKey;
    }

    /*
    *   @dev Sets the state of the sale
    * Requirements:
    * - `_sale_state` Must be an integer
    */
    function setSaleState(uint16 _sale_state) public onlyOwner {
        sale_state = _sale_state;
    }

    /*
    *   @dev Toggles paused state in case of emergency
    */
    function togglePaused() public onlyOwner {
        paused = !paused;
    }

    function reveal(string memory _url) public onlyOwner {
        BASE_URL = _url;
        revealed = true;
    }

    function setSalePrice(uint256 _price) public onlyOwner {
        SALE_PRICE = _price;
    }

    /*
    *   @dev Sets the BASE_URL for tokenURI
    * Requirements:
    * - `_url` Must be in the form: ipfs://${CID}/
    */
    function setBaseURL(string memory _url) public onlyOwner {
        BASE_URL = _url;
    }

    // used in case someone enters a payable amount
    // for the free mint so they may be refunded
    function withdraw() public payable onlyOwner {
        (bool os,)= payable(PRIMARY).call{value:address(this).balance}("");
        require(os);
    }
}