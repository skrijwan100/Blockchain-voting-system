import hre from "hardhat"

async function main() {
    const votecontract= await hre.ethers.getContractFactory("saveallvoter")
    const d_votecontract= await votecontract.deploy();
    await d_votecontract.waitForDeployment();
    console.log("Issue contract in deopoly address: ",await d_votecontract.getAddress())   
}
main().then(()=>{
    process.exit(0)
}).catch((error)=>{console.log(error); process.exit(1)})