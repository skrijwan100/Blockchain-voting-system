import React, { useState } from 'react';
import { Vote, Shield, Users, ChevronRight, CheckCircle, AlertCircle, Wallet } from 'lucide-react';
import { voters } from '../../voterdata';
import { ethers } from 'ethers';
import { keccak256, toUtf8Bytes } from "ethers";
import voteerchake from "../Votesystem.sol/saveallvoter.json"
import Navbar from './Navbar';
const VotingDAppHomepage = () => {
  const [voterID, setVoterID] = useState('');
  const { ethereum } = window;
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [loder, setloder] = useState(false)
  const [valided, setvalied] = useState(false)
  const [tvalid, settvalid] = useState(false)
  const [metaloder,setMetaloder]=useState(false)
  const [allvalid,setallvalid]=useState(false)
  const [account,setaccount]=useState('')
  const [bal,setbal]=useState('')
  const handleVerifyID = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    let isValid;
    console.log(voters)
    for (let i = 0; i < voters.length; i++) {
      console.log(voters[i].id)
      if (voters[i].id == voterID) {
        isValid = true;
        break
      }
      else {
        console.log("Not valid voter")
      }
    }
    setVerificationStatus(null);
    setVerificationStatus(isValid ? 'valid' : 'invalid');
    setIsVerifying(false);
  };
  const handlevotervalid = async (e) => {
    e.preventDefault();
    setloder(true)
    const hashed = keccak256(toUtf8Bytes(voterID));
    console.log(hashed)

    console.log(import.meta.env.VITE_INFURA_URL)
    const infuraprovider = new ethers.JsonRpcProvider(
      import.meta.env.VITE_INFURA_URL
    )
    const allvotercontract = new ethers.Contract(
      import.meta.env.VITE_CONTRACT_DEPOLY_ADDRESS,
      voteerchake.abi,
      infuraprovider
    )
    const contractview = await allvotercontract.filters.onevote(hashed);
    const showevent = await allvotercontract.queryFilter(contractview);
    console.log(showevent)
    if (showevent.length == 0) {
      setvalied(true)
    }
    else {
      settvalid(false)
    }
    setloder(false);


  }
  const connectmetamask = async (e) => {
    e.preventDefault();
    setMetaloder(true)
    if (!ethereum) {
      alert("Install Window, or you don't have Metamask Account")
      setMetaloder(false)
      return;
    }
    const account = await ethereum.request({
      method: 'eth_requestAccounts',
    })
    const fulladdress = account[0];
    console.log(fulladdress)
    const eth_bal = await ethereum.request({
      method: 'eth_getBalance',
      params: [
        account[0], 'latest'
      ]
    })
   const ethvalue= ethers.formatEther(eth_bal)
   console.log(ethvalue)
   setallvalid(true)
   setaccount(fulladdress)
   setbal(ethvalue)
    setMetaloder(false)

  }
  if(allvalid){
    return(
      <>
       <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 relative overflow-hidden">
        <Navbar account={account} bal={bal}/>
       </div>
      </>
    )

  }
  else{
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(34, 197, 94, 0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      {/* Navbar */}
      <Navbar/>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Secure Digital
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> Voting</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of democracy with our blockchain-powered voting platform.
            Transparent, secure, and immutable voting for the digital age.
          </p>
        </div>



        {/* Voter ID Verification Form */}
        <div className="max-w-2xl mx-auto">
          {valided ?
            <>
              {tvalid ?
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-pink-500 mb-3">Your Voter ID: {voterID} is not eligibile for Vote.</h2>
                  </div>
                </div>

                : <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-green-500 mb-3">Your Voter ID: {voterID} is eligibile for Vote.</h2>
                    <button onClick={connectmetamask} className="group relative px-8 py-4 bg-gradient-to-r  from-emerald-600 to-teal-600 hover:from-green-500 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                      {metaloder?<div className='w-full h-full flex justify-center items-center '><div className='loder '></div></div>:<div className="flex items-center space-x-3 ">
                        <Wallet className="w-6 h-6" />
                        <span className='cursor-pointer'>Connect MetaMask</span>
                      </div>}
                    </button>

                  </div>
                </div>}

            </>

            : <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-3">Verify Your Voter ID</h2>
                <p className="text-gray-300">Enter your Voter ID to begin the secure voting process</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="voterID" className="block text-sm font-medium text-gray-300 mb-2">
                    Voter ID Number
                  </label>
                  <input
                    type="text"
                    id="voterID"
                    value={voterID}
                    onChange={(e) => setVoterID(e.target.value)}
                    placeholder="Enter your voter ID (e.g., VID123456789)"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    disabled={isVerifying}
                  />
                </div>

                {/* Verification Status */}
                {verificationStatus && (
                  <div className={`flex items-center space-x-2 p-3 rounded-lg ${verificationStatus === 'valid'
                    ? 'bg-green-500/20 border border-green-500/30'
                    : 'bg-red-500/20 border border-red-500/30'
                    }`}>
                    {verificationStatus === 'valid' ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    )}
                    <span className={`text-sm font-medium ${verificationStatus === 'valid' ? 'text-green-400' : 'text-red-400'
                      }`}>
                      {verificationStatus === 'valid'
                        ? 'Voter ID verified successfully!'
                        : 'Invalid Voter ID. Please check and try again.'}
                    </span>
                  </div>
                )}

                {verificationStatus === 'valid' ? '' : <button
                  onClick={handleVerifyID}
                  disabled={!voterID.trim() || isVerifying}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  {isVerifying ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <div className='flex'><span>Verify Voter ID</span>
                        <ChevronRight className="h-5 w-5 mt-0.5" />
                      </div>
                    </>
                  )}
                </button>}
                {verificationStatus === 'valid' && (<div className="mt-6 text-center">
                  {loder ? <div className='flex items-center justify-center'><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div></div> : <button onClick={handlevotervalid} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                    Proceed to Vote
                  </button>}
                </div>)}
              </div>


            </div>}
        </div>
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 mt-11">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className='flex items-center justify-center'><Shield className="h-12 w-12 text-blue-400 mb-4" /></div>
            <h3 className="text-xl font-semibold text-white mb-2 text-center" >Blockchain Security</h3>
            <p className="text-gray-300 text-center">Every vote is cryptographically secured and permanently recorded on the blockchain.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className='flex items-center justify-center'> <Users className="h-12 w-12 text-purple-400 mb-4" /></div>
            <h3 className="text-xl font-semibold text-white mb-2 text-center">Transparent Results</h3>
            <p className="text-gray-300 text-center">Real-time vote counting with publicly verifiable results for complete transparency.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className='flex items-center justify-center'><Vote className="h-12 w-12 text-green-400 mb-4" /></div>
            <h3 className="text-xl font-semibold text-white mb-2 text-center">Easy Participation</h3>
            <p className="text-gray-300 text-center">Simple, intuitive interface that makes digital voting accessible to everyone.</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6 text-gray-300">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">1</div>
                <p>Verify your voter ID to ensure eligibility and prevent duplicate voting</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">2</div>
                <p>Cast your vote securely using blockchain technology for immutable records</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">3</div>
                <p>View real-time results with complete transparency and verifiability</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 5}px`,
              height: `${Math.random() * 4 + 5}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};
}

export default VotingDAppHomepage;