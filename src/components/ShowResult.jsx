import React, { useState, useEffect } from 'react';
import { Vote, Shield, Users, ChevronRight, CheckCircle, AlertCircle, Clock, User, Award, TrendingUp, BarChart3, Eye, Zap } from 'lucide-react';
import Navbar from './Navbar';
import votecontract from "../contracts/Votesystem.sol/Voter.json"
import { ethers } from 'ethers';
import { candidates } from "../../votecandidate"
const VotingResultsPage = () => {
    const [animatedVotes, setAnimatedVotes] = useState({});
    const [can1,setCan1]=useState([])
    const [Mainloder,setMainloder]=useState(false)

    // Mock election data with results
    const electionData = {
        title: "2024 Student Council President Election",
        status: "Live Results",
        totalVotes: 1247,
        participationRate: 78.6,
        lastUpdated: "2 minutes ago",
        closingTime: "Tomorrow at 11:59 PM"
    };

    // Animate vote counts on load
    useEffect(() => {
        // candidates.forEach((candidate, index) => {
        //     setTimeout(() => {
        //         let count = 0;
        //         const increment = candidate.votes / 60;
        //         const timer = setInterval(() => {
        //             count += increment;
        //             if (count >= candidate.votes) {
        //                 count = candidate.votes;
        //                 clearInterval(timer);
        //             }
        //             setAnimatedVotes(prev => ({ ...prev, [candidate.id]: Math.floor(count) }));
        //         }, 16);
        //     }, index * 200);
        // });
        const fecthvotecountdata = async () => {
            setMainloder(true)
            const InfuraProvider = new ethers.JsonRpcProvider(
                import.meta.env.VITE_INFURA_URL
            )
            const votedata = new ethers.Contract(
                import.meta.env.VITE_CONTRACT_DEPOLY_ADDRESS,
                votecontract.abi,
                InfuraProvider
            )
            const votestore= await votedata.filters.storevote(1774)
            const canEnevent= await votedata.queryFilter(votestore)
            console.log(canEnevent)
            setCan1(canEnevent)
            setMainloder(false)
        }
        fecthvotecountdata()
    }, [])

    const getProgressColor = (color) => {
        const colors = {
            emerald: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
            teal: 'bg-gradient-to-r from-teal-500 to-teal-600',
            cyan: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
            slate: 'bg-gradient-to-r from-slate-500 to-slate-600'
        };
        return colors[color] || colors.slate;
    };

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
            <Navbar />

         {Mainloder?<div className='w-full h-[70vh] flex justify-center items-center '><div className='bigloder'></div></div>:   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Election Results
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> Live</span>
                    </h1>
                    <p className="text-xl text-gray-300">{electionData.title}</p>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                        <Zap className="h-5 w-5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">{electionData.status}</span>
                        <span className="text-gray-400">• Updated {electionData.lastUpdated}</span>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
                        <Users className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white">{electionData.totalVotes.toLocaleString()}</div>
                        <div className="text-gray-300">Total Votes</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
                        <BarChart3 className="h-10 w-10 text-teal-400 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white">{electionData.participationRate}%</div>
                        <div className="text-gray-300">Participation</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
                        <Eye className="h-10 w-10 text-cyan-400 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white">4</div>
                        <div className="text-gray-300">Candidates</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
                        <Clock className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
                        <div className="text-lg font-bold text-white">Active</div>
                        <div className="text-gray-300">{electionData.closingTime}</div>
                    </div>
                </div>

                {/* View Toggle */}
                <div className="space-y-6">
                    {candidates.map((candidate, index) => (
                        <div
                            key={candidate.id}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 transform hover:scale-[1.02] transition-all duration-300"
                            style={{
                                animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
                            }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="text-4xl">{candidate.image}</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{candidate.name}</h3>
                                        <p className="text-gray-300">{candidate.party}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center space-x-2 flex-col">
                                        <div className=' text-white'>
                                            Total Votes
                                        </div>
                                        <div className="text-3xl font-bold text-white">
                                            {/* {animatedVotes[candidate.id]?.toLocaleString() || 0} */}
                                            
                                            {candidate.canID==1774?can1.length:"0"}

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Blockchain Verification */}
                <div className="mt-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                        <Shield className="h-8 w-8 text-emerald-400" />
                        <h3 className="text-2xl font-bold text-white">Blockchain Verified Results</h3>
                        <CheckCircle className="h-6 w-6 text-emerald-400" />
                    </div>
                    <p className="text-center text-gray-300 mb-4">
                        All votes are cryptographically secured and permanently recorded on the blockchain for complete transparency and immutability.
                    </p>
                    <div className="bg-black/20 rounded-lg p-4 text-center">
                        <div className="text-gray-400 text-sm mb-1">Latest Block Hash:</div>
                        <div className="text-emerald-400 font-mono text-sm break-all">
                            0x2f8a9b1c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f
                        </div>
                    </div>
                </div>
            </div>}

            {/* Floating particles effect */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
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
        </div>
    );
};

export default VotingResultsPage;