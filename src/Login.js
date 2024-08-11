import React, { useState, useContext } from 'react';
import page from './img/page.png';
import react from './img/react.png';
import infura from './img/infura.jpeg';
import ether from './img/ethers.png';
import ethereum from './img/ethereum.jpeg';
import pinata from './img/pinata-logo.webp';
import th from './img/th.png';
import { AuthContext } from './context/AuthContext';
import './global.css';
import image from './img/mint.jpg'; // Import gambar untuk tampilan
import { Dialog, Transition } from '@headlessui/react';

function Login() {
  const { connected, connectWallet, disconnectWallet, isAdmin } =
    useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);


  return (
    <div>
    {/* Header */}
    <header>
      <div
        className='
                  bg-blue-500
                  text-white
                  absolute
                  top-0
                  h-7
                  w-full 
                  text-center
                  text-sm
                  leading-6
                  py-1
                  '
      >
        Sepoliascan
        <a href='https://sepolia.etherscan.io/' className='pl-3 underline'>
          here
        </a>
      </div>
      <div className='mt-6 mb-16 flex items-center justify-between py-2 px-4 sm:mx-0 sm:mb-20 sm:px-0 md:px-6'>
        <div className='mt-4 inline-block pb-4 pl-8'>
          <a
            href='/dashboard/vote-area'
            className='align-middle text-3xl font-bold text-black'
          >
            VOTEYUK!
          </a>
          {isAdmin ? (
            <div className='hidden pl-14 align-middle xl:inline-block'>
              <a
                href='/dashboard/candidate-details'
                className='pr-12 text-xl text-black'
              >
                Candidate Details
              </a>
              <a
                href='/dashboard/add-candidate'
                className='pr-12 text-xl text-black'
              >
                Add Candidate
              </a>
              <a
                href='/dashboard/voters'
                className='pr-12 text-xl text-black'
              >
                Voters
              </a>
              <a
                href='/dashboard/result'
                className='pr-12 text-xl text-black'
              >
                Result
              </a>
            </div>
          ) : (
            <div className='hidden pl-14 align-middle xl:inline-block'>
              <a href='/' className='pr-12 text-xl text-black'>
                Home
              </a>
              <a
                href='/dashboard/vote-area'
                className='pr-12 text-xl text-black'
              >
                Vote-Area
              </a>
              <a
                href='/dashboard/result'
                className='pr-12 text-xl text-black'
              >
                Result
              </a>
              <a
                href='/dashboard/search'
                className='pr-12 text-xl text-black'
              >
                Lacak
              </a>
              <a
                href='/dashboard/mint-sbt'
                className='pr-12 text-xl text-black'
              >
                MintSBT
              </a>
            </div>
          )}
        </div>
        <div className='flex items-center'>
          <div className='hidden py-1 text-right xl:inline-block'>
            <div className='mt-0 sm:mt-0 sm:ml-16 sm:flex-none'>
              {connected ? (
                <button
                  type='button'
                  className='bg-blue hover:bg-blue-600 mt-2 inline-flex items-center px-8 py-3 text-lg font-semibold tracking-tighter text-white'
                  onClick={disconnectWallet}
                >
                  Disconnect Wallet
                </button>
              ) : (
                <button
                  type='button'
                  className='bg-blue hover:bg-blue-600 mt-2 inline-flex items-center px-8 py-3 text-lg font-semibold tracking-tighter text-white'
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
          <button className='pr-12 pl-4 relative xl:hidden' onClick={toggleSidebar}>
            <svg
              className='mr-auto inline-block text-black'
              width='33'
              height='50'
              viewBox='0 0 23 30'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.892578 10.8691H22.1058'
                stroke='black'
                strokeLinecap='square'
                strokeLinejoin='round'
              />
              <path
                d='M0.892578 18.8691H22.1058'
                stroke='black'
                strokeLinecap='square'
                strokeLinejoin='round'
              />
              <path
                d='M22.1066 14.8688H0.893399'
                stroke='black'
                strokeLinecap='square'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
      </div>
    </header>

    {/* Sidebar */}
    <Transition.Root show={sidebarOpen} as={React.Fragment}>
      <Dialog as='div' onClose={() => setSidebarOpen(false)}>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex'>
          <Transition.Child
            as={React.Fragment}
            enter='transition-transform ease-in-out duration-300'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition-transform ease-in-out duration-300'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <Dialog.Panel className='relative flex w-full max-w-xs flex-col bg-white p-4 shadow-lg'>
              <button
                type='button'
                className='absolute top-4 right-4 text-black'
                onClick={() => setSidebarOpen(false)}
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M6 18L18 6M6 6l12 12'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              <nav className='mt-8 space-y-4'>
                {isAdmin ? (
                  <>
                    <a href='/dashboard/candidate-details' className='block text-lg text-gray-800'>
                      Candidate Details
                    </a>
                    <a href='/dashboard/add-candidate' className='block text-lg text-gray-800'>
                      Add Candidate
                    </a>
                    <a href='/dashboard/voters' className='block text-lg text-gray-800'>
                      Voters
                    </a>
                    <a href='/dashboard/result' className='block text-lg text-gray-800'>
                      Result
                    </a>
                  </>
                ) : (
                  <>
                    <a href='/' className='block text-lg text-gray-800'>
                      Home
                    </a>
                    <a href='/dashboard/vote-area' className='block text-lg text-gray-800'>
                      Vote-Area
                    </a>
                    <a href='/dashboard/result' className='block text-lg text-gray-800'>
                      Result
                    </a>
                    <a href='/dashboard/search' className='block text-lg text-gray-800'>
                      Lacak
                    </a>
                    <a href='/dashboard/mint-sbt' className='block text-lg text-gray-800'>
                      MintSBT
                    </a>
                  </>
                )}
                {connected ? (
                    <button
                      type='button'
                      className='w-full text-left text-lg text-red-500'
                      onClick={disconnectWallet}
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='w-full text-left text-lg text-blue-500'
                      onClick={connectWallet}
                    >
                      Connect Wallet
                    </button>
                  )}
              </nav>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
      {/* Main Layout */}
      <main>
        <section className='w-full text-black'>
          <div className='max-w-8xl mx-auto inline-block items-center p-3 pt-0 lg:flex lg:flex-wrap lg:pt-0'>
            <div className='lg:w-3/6'>
              <h2 className='max-w-xl lg:text-[4.2em] text-3xl font-bold leading-none text-black inline-block'>
                Selamat Datang di VoteYuk!
              </h2>

              <p className='mt-6 max-w-2xl text-xl font-semibold text-[#404040]'>
                Kami memperkenalkan sistem pemungutan suara yang aman dan
                transparan dengan memanfaatkan teknologi blockchain
              </p>
              <a
                className='bg-blue hover:bg-blue-600  mt-2 inline-flex items-center pr-12 px-8 py-3 text-lg font-semibold tracking-tighter text-white'
                href='/dashboard/vote-area'
              >
                VOTE NOW!
              </a>
              <a
                className='bg-blue hover:bg-blue-600 mt-2 inline-flex items-center px-8 py-3 text-lg font-semibold tracking-tighter text-white ml-4'
                href='https://cloud.google.com/application/web3/faucet/ethereum/sepolia'
              >
                Claim Faucet
              </a>
            </div>
            <div className='mb-20 mt-44 hidden w-full flex-col lg:mt-12 lg:inline-block lg:w-3/6'>
              <img src={page} alt='Hero' />
            </div>
            <div className='my-20 inline-block w-full flex-col lg:mt-0 lg:hidden lg:w-2/5'>
              <img src={page} alt='image' />
            </div>
          </div>
          <div className='mt-0 bg-white lg:mt-0'>
            <div className='mx-auto'>
              <div className='mx-auto px-5 py-24 lg:px-20'>
                <div className='my-10 flex w-full flex-col text-center'>
                  <h2 className='mb-5 text-2xl font-bold text-black lg:text-3xl'></h2>
                  <div className='border-t border-gray-300 my-0'></div>
                </div>
                <div
                  className='
                                    grid grid-cols-2
                                    gap-16
                                    text-center
                                    lg:grid-cols-6'
                >
                  <div className='hidden items-center justify-center lg:inline-block'>
                    <img
                      src={ethereum}
                      alt='Segment'
                      className='block h-24 object-contain'
                    />
                  </div>
                  <div className='hidden items-center justify-center lg:inline-block'>
                    <img
                      src={th}
                      alt='Segment'
                      className='block h-24 object-contain'
                    />
                  </div>
                  <div className='flex items-center justify-center'>
                    <img
                      src={infura}
                      alt='Segment'
                      className='block h-24 object-contain'
                    />
                  </div>
                  <div className='flex items-center justify-center'>
                    <img
                      src={pinata}
                      alt='Segment'
                      className='block h-24 object-contain'
                    />
                  </div>
                  <div className='hidden items-center justify-center lg:inline-block'>
                    <img
                      src={react}
                      alt='Segment'
                      className='block h-24 object-contain'
                    />
                  </div>
                  <div className='hidden items-center justify-center lg:inline-block'>
                    <img
                      src={ether}
                      alt='Segment'
                      className='block h-24 object-contain'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mx-auto px-5 pt-20 pb-24 lg:px-24'>
            <div className='mx-auto px-5 pt-0 pb-24 lg:px-24'>
              <div className='my-3 flex w-full flex-col text-left lg:text-center'>
                <h2 className='bold mb-8 text-4xl font-bold leading-tight text-black lg:text-6xl'>
                  Teknologi Blockchain: Merevolusi Kepercayaan Digital
                  <br className='hidden lg:inline-block' />
                  dan Desentralisasi
                </h2>
              </div>
              <div className='flex w-full flex-col text-left lg:text-center'>
                <h3 className='text-2xl text-black'>
                  Blockchain menyediakan cara yang aman dan transparan untuk
                  mencatat dan memverifikasi transaksi di seluruh jaringan
                  desentralisasi. Teknologi ini menjadi dasar bagi
                  cryptocurrency dan menawarkan solusi inovatif untuk integritas
                  data, kontrak pintar, dan aplikasi terdesentralisasi.
                </h3>
              </div>
            </div>
            <div className='flex w-full flex-row justify-center pt-0 text-center'>
              <a
                href='https://www.ibm.com/topics/blockchain'
                className='underline-blue px-8 text-xl font-semibold text-black'
              >
                Blockchain
              </a>
              <a
                href='https://ethereum.org/en/whitepaper/'
                className='underline-gray px-6 text-xl font-semibold text-gray-700'
              >
                Ethereum
              </a>
            </div>
          </div>
          <div className='max-w-8xl mx-auto p-3 pt-0 lg:flex lg:items-start lg:justify-center lg:pt-4'>
            <div className='mb-20 mt-84 hidden lg:flex lg:flex-col lg:w-3/6 lg:items-center lg:justify-center'>
              <img src={image} alt='NFT' />
            </div>
            <div className='flex flex-col justify-center lg:w-3/6 lg:ml-8 mt-8 md:mt-0 lg:mt-0'>
              <h2 className='text-3xl font-bold mb-2 text-center lg:text-left'>
                VoteID NFT: SBT Unik syarat untuk Voting
              </h2>

              <p className='text-gray-600 mb-4 text-center lg:text-left text-lg'>
                Soulbound Token (SBT) adalah jenis token kripto yang dirancang
                untuk tidak dapat dipindahkan atau diperdagangkan setelah
                diterbitkan. VoteID NFT berfungsi sebagai SBT yang unik untuk
                setiap pemilih. Token ini berfungsi sebagai identitas digital
                dan sebagai syarat eligible melakukan voting.
              </p>
              <a href='/dashboard/mint-sbt'>
                <button className='bg-blue hover:bg-blue-600 text-white px-8 py-3 text-lg font-semibold tracking-tighter inline-flex items-center justify-center mb-4'>
                  MINT SBT DISINI
                </button>
              </a>
              <div className='mt-2 text-center text-sm text-gray-700 lg:text-left'>
                <p>
                  <span className='font-bold'>Supply:</span>50 SBT
                </p>
              </div>
              <div className='mt-2 text-center text-sm text-gray-700 lg:text-left'>
                <p>
                  <span className='font-bold'>Contract Address:</span>
                  0xb2A829b6f467F0DdA930175d43E0b7aE09DC6108
                  <a
                    href='https://sepolia.etherscan.io/token/0xb2A829b6f467F0DdA930175d43E0b7aE09DC6108'
                    className='text-blue-500 hover:underline'
                  >
                    View on Etherscan
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='grotesk bg-[#f9fbfb]'>
        <div className='max-w-8xl mx-auto px-5 py-24 text-black'>
          <div className='order-first flex flex-wrap text-left'>
            <div className='w-full px-4 md:w-2/4 lg:w-1/5'>
              <h2 className='mb-3 text-lg tracking-widest'>Development</h2>
              <nav className='list-none space-y-2 py-3'>
                <li>
                  <a href='https://docs.ethers.org/v5/'>Ethers</a>
                </li>
                <li>
                  <a href='https://ethereum.org/en/'>Ethereum</a>
                </li>
                <li>
                  <a href='https://hardhat.org/tutorial/writing-and-compiling-contracts'>
                    Hardhat
                  </a>
                </li>
                <li>
                  <a href='https://www.pinata.cloud/'>Pinata</a>
                </li>
                <li>
                  <a href='https://www.infura.io/solutions'>Infura</a>
                </li>
                <li>
                  <a href='https://react.dev/learn'>React.js</a>
                </li>
              </nav>
            </div>
            <div className='w-full px-4 md:w-2/4 lg:w-1/5'>
              <h2 className='mb-3 text-lg tracking-widest'>Features</h2>
              <nav className='mb-10 list-none space-y-2 py-3'>
                <li>
                  <a href='/'>Secure Voting</a>
                </li>
                <li>
                  <a href='/'>Anonymous Ballots</a>
                </li>
                <li>
                  <a href='/'>Audit Trails</a>
                </li>
                <li>
                  <a href='/'>Real-Time Results</a>
                </li>
                <li>
                  <a href='/'>Voter Privacy</a>
                </li>
                <li>
                  <a href='/'>Scalable Solutions</a>
                </li>
              </nav>
            </div>
            <div className='w-full px-4 md:w-2/4 lg:w-1/5'>
              <h2 className='mb-3 text-lg tracking-widest'>Resources</h2>
              <nav className='mb-10 list-none space-y-2 py-3'>
                <li>
                  <a href='/'>Technical Documentation</a>
                </li>
                <li>
                  <a href='/'>Developer Guides</a>
                </li>
                <li>
                  <a href='https://www.infura.io/blog/post/sidechains-vs-rollups-breaking-down-the-differences-for-dapp-development'>
                    API References
                  </a>
                </li>
                <li>
                  <a href='/'>Case Studies</a>
                </li>
              </nav>
            </div>
            <div className='w-full px-4 md:w-2/4 lg:w-1/5'>
              <h2 className='mb-3 text-lg tracking-widest'>Company</h2>
              <nav className='mb-10 list-none space-y-2 py-3'>
                <li>
                  <a href='/'>About Us</a>
                </li>
                <li>
                  <a href='/'>Careers</a>
                </li>
                <li>
                  <a href='/'>Contact</a>
                </li>
                <li>
                  <a href='/'>Partnerships</a>
                </li>
              </nav>
            </div>
            <div className='w-full md:w-2/4 lg:w-1/5'>
              <a href='/'>
                <div className='relative border border-black transition hover:border-gray-500'>
                  <div className='absolute top-0 right-0 pt-2 pr-2'>
                    <svg
                      width='8'
                      height='8'
                      viewBox='0 0 8 8'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M6.66992 0.747559L0.669922 6.74756'
                        stroke='black'
                      />
                      <path
                        d='M0.669922 0.747559H6.66992V6.74756'
                        stroke='black'
                      />
                    </svg>
                  </div>
                  <div className='p-6'>
                    Explore our blockchain-based e-voting system for a secure
                    and transparent voting experience. Learn more about our
                    advanced features and how we ensure election integrity.
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className='px-2'>
          <div className='max-w-8xl mx-auto px-5 py-6'>
            <h2 className='text-black'>Innovative Voting Solutions</h2>
            <div>
              <h2 className='my-4 text-sm'>
                Discover how our e-voting system leverages blockchain technology
                to provide secure, anonymous, and transparent voting solutions.
                Explore our comprehensive documentation and learn how we
                maintain the highest standards of election integrity.
              </h2>
            </div>
            <div className='absolute right-0 -mt-24 hidden text-black lg:inline-block'>
              <a href='/' className='mr-16'>
                Terms & Conditions
              </a>
              <a href='/' className='mr-16'>
                Privacy Policy
              </a>
              <a href='/' className='mr-16'>
                Cookie Policy
              </a>
            </div>
            <div className='right-0 inline-block pt-12 pb-6 pr-20 text-sm text-black md:hidden'>
              <a href='/' className='mr-16'>
                Terms & Conditions
              </a>
              <a href='/' className='mr-16'>
                Privacy Policy
              </a>
              <a href='/' className='mr-16'>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
