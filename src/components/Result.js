import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import img from '../img/Award.gif';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Result = () => {
  const { account, adminAccount, provider, contract } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [winner, setWinner] = useState();
  const [candidates, setCandidates] = useState();
  const [resultStatus, setResultStatus] = useState(false);
  const [totalVoter, setTotalVoter] = useState();

  const ClickToFindWinner = async () => {
    try {
      setIsLoading(true);
      const signer = contract.connect(provider.getSigner());
      // find winner_id
      await signer.findMaxVoteCandidate();
      // check status of result declaration
      const isResult = await signer.resultStatus();
      if (!isResult) {
        return;
      }
      setResultStatus(isResult);
      // get winner candidate data
      const getWinnerData = await signer.getWinner();
      setWinner(getWinnerData);
      // get all candidate data;
      const cand = await signer.getCandidate();
      setCandidates(cand);
      // get total voters
      const voter = await signer.getVoters();
      setTotalVoter(voter.length);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getResultStatus = async () => {
      try {
        if (!account) {
          return; // Wallet not connected, no need to proceed
        }
        const signer = contract.connect(provider.getSigner());
        const isResult = await signer.resultStatus();
        console.log(isResult);
        setResultStatus(isResult);
        if (!isResult) {
          return;
        }
        // get winner candidate data
        const getWinnerData = await signer.getWinner();
        setWinner(getWinnerData);
        // get all candidate data;
        const cand = await signer.getCandidate();
        setCandidates(cand);
        // get total voters
        const voter = await signer.getVoters();
        setTotalVoter(voter.length);
      } catch (error) {
        console.log(error);
      }
    };

    getResultStatus();
  }, [account, provider, contract]); // Include dependencies

  return (
    <div>
      <ToastContainer />
      {isLoading && <Loader />}
      {!account ? (
        <div className='flex flex-col items-center justify-center h-screen'>
          <p className='text-xl font-semibold text-gray-900'>
            Wallet not connected
          </p>
          <p className='mt-2 text-sm text-gray-700'>
            Please connect your wallet to access this page.
          </p>
        </div>
      ) : (
        <div>
          <div className='px-4 sm:px-6 lg:px-8'>
            <div className='sm:flex sm:items-center'>
              <div className='sm:flex-auto'>
                <h1 className='text-xl font-semibold text-gray-900'>
                  Hasil Rekapitulasi Suara
                </h1>
                <p className='mt-2 text-sm text-gray-700'>
                  Dibawah ini merupakan hasil rekapitulasi suara.
                </p>
              </div>
              {account === adminAccount && (
                <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
                  <button
                    type='button'
                    onClick={ClickToFindWinner}
                    disabled={resultStatus}
                    className='inline-flex items-center justify-center rounded-md border border-transparent bg-blue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
                  >
                    {resultStatus ? 'Hasil Rekapitulasi' : 'Menghitung Suara'}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            {winner && (
              <p className='text-center mt-2 text-xl font-semibold text-gray-900'>
                {winner.candidate_name +
                  ' Jurusan ' +
                  winner.candidate_partyName +
                  ' Menang Dengan ' +
                  winner.candidate_voteCount.toNumber() +
                  '/' +
                  totalVoter +
                  ' Suara '}
              </p>
            )}
            {winner ? (
              <div className='w-[500px] p-5 m-auto'>
                <div className='flex justify-between items-center bg-gray-100 px-7 py-5 drop-shadow-xl rounded-[5px]'>
                  <img
                    className='h-16 absolute top-0 left-[-20px]'
                    src={img}
                    alt=''
                  />
                  <div className=''>
                    <img
                      className='h-24 rounded-[50px]'
                      src={
                        winner &&
                        `https://gateway.pinata.cloud/ipfs/${winner.candidate_img}`
                      }
                      alt=''
                    />
                  </div>
                  <div className=''>
                    <div className='mt-2'>
                      <p>
                        <span className='text-xs'>Nama : </span>{' '}
                        <span className='font-semibold'>
                          {winner.candidate_name}
                        </span>{' '}
                      </p>
                      <p>
                        <span className='text-xs'>Jurusan: </span>
                        <span className='font-semibold'>
                          {winner.candidate_partyName}
                        </span>
                      </p>
                      <p>
                        <span className='text-xs'>Nim: </span>{' '}
                        <span className='font-semibold'>
                          {winner.candidate_age.toNumber()}
                        </span>{' '}
                      </p>
                      <p>
                        <span className='text-xs'>Jumlah Suara: </span>{' '}
                        <span className='font-semibold'>
                          {winner.candidate_voteCount.toNumber() +
                            '/' +
                            totalVoter}
                        </span>{' '}
                      </p>
                    </div>
                  </div>

                  <img
                    className='h-12 absolute bottom-[-10px] right-0 rounded-[50px]'
                    src='http://www.pngimagesfree.com/LOGO/B/BJP-Logo/SMALL/BJP-Logo-HD-PNG.png'
                    alt=''
                  />
                </div>
              </div>
            ) : (
              <p className='flex justify-center mt-8 text-2xl '></p>
            )}
            <hr />
            <div className='grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4 p-5'>
              {candidates?.map((curr, i) => {
                return (
                  <div
                    key={i}
                    className='flex justify-around space-x-6 items-center bg-gray-100 px-2 py-5 drop-shadow-xl rounded-[10px] w-[80%] mx-auto'
                  >
                    <div className=''>
                      <img
                        className='h-24 w-24 rounded-full'
                        src={`https://gateway.pinata.cloud/ipfs/${curr.candidate_img}`}
                        alt=''
                      />
                    </div>
                    <div className=''>
                      <div className='mt-2 lg:mt-0'>
                        <p>
                          <span className='text-xs'>Name : </span>{' '}
                          <span className='font-semibold'>
                            {curr.candidate_name}
                          </span>{' '}
                        </p>
                        <p>
                          <span className='text-xs'>Jurusan: </span>
                          <span className='font-semibold'>
                            {curr.candidate_partyName}
                          </span>
                        </p>
                        <p>
                          <span className='text-xs'>Nim: </span>{' '}
                          <span className='font-semibold'>
                            {curr.candidate_age.toNumber()}
                          </span>{' '}
                        </p>
                        <p>
                          <span className='text-xs'>Jumlah Suara: </span>{' '}
                          <span className='font-semibold'>
                            {curr.candidate_voteCount.toNumber() +
                              '/' +
                              totalVoter}
                          </span>{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
