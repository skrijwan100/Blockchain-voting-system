import React, { useEffect } from 'react'
import logo from "../assets/logo.png"
export default function Navbar({account,bal}) {
    useEffect(()=>{
        console.log(account,bal)
    })
  return (
    <div>
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-400 p-2 rounded-lg">
                <img src={logo} className="h-10 w-10 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Decentralized Voting</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-emerald-400 transition-colors font-medium">
                Home
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">
                Submit Vote
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">
                View Results
              </a>
            </div>
            {/*Metamask detiles*/}
             {account? <div
                        className="flex items-center gap-4 px-4 py-2 bg-gradient-to-r  from-emerald-600 to-teal-400 hover:from-emerald-400 hover:to-emerald-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
                        title="Click to copy address"
                    >
                        <div style={{height:"15px",width:"15px",backgroundColor:"#00ff41",borderRadius:"50%"}}>

                        </div>

                        {/* Address & Balance */}
                        <div className="flex flex-col">
                            <span className="text-sm font-mono truncate max-w-[150px]">{account.slice(0, 4)}...{account.slice(-4)}</span>
                            <span className="text-xs opacity-80">Id:{bal}</span>
                        </div>
                </div>:""}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-white hover:text-blue-400 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

    </div>
  )
}
