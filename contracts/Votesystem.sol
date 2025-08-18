// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract saveallvoter {
    event onevote(
        string indexed _voterid,
        address newvoeraddress,
        address indexed walletaddress
    );

    function savevoter(string memory _voterid) public {
        Voter newvoter = new Voter(_voterid, msg.sender);
        emit onevote(_voterid, address(newvoter), msg.sender);
    }
}
contract Voter {
    string public voterid;
    address public voteraddress;
    constructor(string memory _voterid, address _walletaddress) {
        voterid = _voterid;
        voteraddress = _walletaddress;
    }
}
