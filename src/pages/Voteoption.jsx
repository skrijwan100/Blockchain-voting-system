import React, { useEffect, useState } from 'react';
import { Vote, Shield, Users, ChevronRight, CheckCircle, AlertCircle, Clock, User, Award } from 'lucide-react';
import { candidates } from "../../votecandidate"
import { BrowserProvider } from 'ethers';
import votecontract from "../contracts/Votesystem.sol/Voter.json"
import { ethers } from 'ethers';
import { keccak256, toUtf8Bytes } from "ethers";
import { useTnx } from '../../context/Metamaskdata';
const VotingInterface = ({ voterID }) => {
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [voteSubmitted, setVoteSubmitted] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [TnxHash, setTnxHash] = useTnx()
    const [mainloder,setMainloder]=useState(false)
    const [event,setEvent]=useState([])
    const { ethereum } = window;
    // Mock voting data
    const votingData = {
        title: "2024 Student Council President Election",
        description: "Cast your vote for the next Student Council President. Your vote is secure, anonymous, and will be recorded on the blockchain.",
        timeRemaining: "2 days, 14 hours remaining",
        totalVoters: 1247,
        votedCount: 892
    };
    useEffect(() => {
        const fecthvotedata = async () => {
            setMainloder(true)
            const InfuraProvider = new ethers.JsonRpcProvider(
                import.meta.env.VITE_INFURA_URL
            )
            const votedata = new ethers.Contract(
                import.meta.env.VITE_CONTRACT_DEPOLY_ADDRESS,
                votecontract.abi,
                InfuraProvider
            )
            const votestore = await votedata.filters.storevote()
            console.log(votestore)
            const VoteEvent = await votedata.queryFilter(votestore)
            console.log(VoteEvent)
          setEvent(VoteEvent)
            setMainloder(false)

        }
        fecthvotedata()
    },[])


    const handleCandidateSelect = (candidate) => {
        if (voteSubmitted) return;
        setSelectedCandidate(candidate);
    };

    const handleVoteSubmit = () => {
        if (!selectedCandidate) return;
        setShowConfirmation(true);




    };

    const confirmVote = async (candidateid) => {
        setIsSubmitting(true);
        setShowConfirmation(false);
        const hashed = keccak256(toUtf8Bytes(voterID));
        console.log(hashed)
        const WalletProvider = new BrowserProvider(ethereum);
        const singer = await WalletProvider.getSigner();
        const votesubmit = new ethers.Contract(
            import.meta.env.VITE_CONTRACT_DEPOLY_ADDRESS,
            votecontract.abi,
            singer
        )
        const givevote = await votesubmit.enterythevote(
            candidateid,
            hashed
        )
        await givevote.wait()
        console.log(givevote)
        setTnxHash(givevote.hash)
        setIsSubmitting(false);
        setVoteSubmitted(true);

    };

    const cancelVote = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 relative overflow-hidden">
            {mainloder?<div className='w-full h-[70vh] flex justify-center items-center '><div className='bigloder'></div></div>:<div>
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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                    {/* Election Info Header */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
                        <div className="text-center mb-6">
                            <h1 className="text-4xl font-bold text-white mb-4">{votingData.title}</h1>
                            <p className="text-gray-300 text-lg max-w-3xl mx-auto">{votingData.description}</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div className="bg-emerald-500/20 rounded-lg p-4">
                                <Clock className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                                <div className="text-white font-semibold">{votingData.timeRemaining}</div>
                                <div className="text-gray-300 text-sm">Time Left</div>
                            </div>
                            <div className="bg-teal-500/20 rounded-lg p-4">
                                <Users className="h-8 w-8 text-teal-400 mx-auto mb-2" />
                                <div className="text-white font-semibold">{event.length}</div>
                                <div className="text-gray-300 text-sm">Votes Cast</div>
                            </div>
                            <div className="bg-cyan-500/20 rounded-lg p-4">
                                <User className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                                <div className="text-white font-semibold">{votingData.totalVoters.toLocaleString()}</div>
                                <div className="text-gray-300 text-sm">Eligible Voters</div>
                            </div>
                        </div>
                    </div>

                    {/* Candidates List */}
                    <div className="grid gap-6 mb-8">
                        <h2 className="text-3xl font-bold text-white text-center mb-4">Select Your Candidate</h2>

                        {candidates.map((candidate) => (
                            <div
                                key={candidate.id}
                                onClick={() => handleCandidateSelect(candidate)}
                                className={`bg-white/10 backdrop-blur-md border rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${selectedCandidate?.id === candidate.id
                                        ? 'border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/25'
                                        : 'border-white/20 hover:border-white/40 hover:bg-white/15'
                                    } ${voteSubmitted ? 'cursor-not-allowed opacity-75' : ''}`}
                            >
                                <div className="flex items-start space-x-6">
                                    <div className="text-6xl">{candidate.image}</div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-2xl font-bold text-white">{candidate.name}</h3>
                                            {selectedCandidate?.id === candidate.id && (
                                                <CheckCircle className="h-6 w-6 text-emerald-400" />
                                            )}
                                        </div>

                                        <p className="text-emerald-400 font-semibold mb-2">{candidate.party}</p>
                                        <p className="text-gray-300 mb-3">{candidate.manifesto}</p>

                                        <div className="flex items-center justify-between">
                                            <div className="text-gray-400 text-sm">
                                                <Award className="h-4 w-4 inline mr-1" />
                                                {candidate.experience}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Vote Submission */}
                    {!voteSubmitted && (
                        <div className="text-center">
                            <button
                                onClick={handleVoteSubmit}
                                disabled={!selectedCandidate || isSubmitting}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-4 px-12 rounded-xl text-lg transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                        <span>Submitting Vote...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Vote className="h-6 w-6" />
                                        <span>Cast Your Vote</span>
                                        <ChevronRight className="h-6 w-6" />
                                    </div>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Vote Confirmation Success */}
                    {voteSubmitted && (
                        <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-8 text-center">
                            <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Vote Submitted Successfully!</h3>
                            <p className="text-gray-300 mb-4">
                                Your vote for <span className="text-emerald-400 font-semibold">{selectedCandidate?.name}</span> has been recorded on the blockchain.
                            </p>
                            <div className="bg-black/20 rounded-lg p-4 inline-block">
                                <p className="text-gray-400 text-sm">Transaction Hash:</p>
                                <p className="text-emerald-400 font-mono text-sm">{TnxHash}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Confirmation Modal */}
                {showConfirmation && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full">
                            <div className="text-center mb-6">
                                <AlertCircle className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-white mb-2">Confirm Your Vote</h3>
                                <p className="text-gray-300">
                                    Are you sure you want to vote for <span className="text-emerald-400 font-semibold">{selectedCandidate?.name}</span>?
                                </p>
                                <p className="text-gray-400 text-sm mt-2">This action cannot be undone.</p>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={cancelVote}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => confirmVote(selectedCandidate.canID)}
                                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 cursor-pointer"
                                >
                                    Confirm Vote
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading overlay */}
                {isSubmitting && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-400 mx-auto mb-4"></div>
                            <h3 className="text-xl font-bold text-white mb-2">Processing Your Vote</h3>
                            <p className="text-gray-300">Recording your vote on the blockchain...</p>
                            <div className="mt-4 bg-black/20 rounded-lg p-2">
                                <div className="text-xs text-gray-400">Blockchain Transaction in Progress</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Floating particles effect */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-emerald-400/20 rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${Math.random() * 4 + 2}px`,
                                height: `${Math.random() * 4 + 2}px`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${Math.random() * 3 + 2}s`
                            }}
                        />
                    ))}
                </div>
            </div>}
        </div>
    );
};

export default VotingInterface;