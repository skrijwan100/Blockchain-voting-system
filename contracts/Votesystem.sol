// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Voter {
    bytes32 public voterid;
    address public voteraddress;
    uint public votecandidate;
    event storevote(
        uint indexed votecandidate,
        bytes32 indexed  voterid,
        address wallate,
        uint256 time
    );

    function enterythevote(uint _votecandidate,bytes32 _voterid) public {
        votecandidate = _votecandidate;
        emit storevote(votecandidate, _voterid, msg.sender, block.timestamp);
    }
}
