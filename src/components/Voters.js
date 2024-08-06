import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

const ETHERSCAN_API_KEY = 'GUBF8TN6EB4TVFPCR2DT3HNBX1FVK8C5AC'; // Ganti dengan API key Anda

export default function Voters() {
  const { contract, provider } = useContext(AuthContext);
  const [voters, setVoters] = useState([]);
  const [transactions, setTransactions] = useState({});

  useEffect(() => {
    const getAllVoters = async () => {
      try {
        const signer = contract.connect(provider.getSigner());
        const voterList = await signer.getVoters();
        setVoters(voterList);
        
        // Ambil transaksi untuk setiap address
        voterList.forEach(async (address) => {
          const response = await axios.get(`https://api.sepolia.etherscan.io/api`, {
            params: {
              module: 'account',
              action: 'txlist',
              address: address,
              startblock: 0,
              endblock: 99999999,
              sort: 'desc',
              apikey: ETHERSCAN_API_KEY,
            }
          });
          
          // Simpan transaksi pertama (terbaru) ke state
          const txList = response.data.result;
          setTransactions((prev) => ({
            ...prev,
            [address]: txList.length > 0 ? txList[0].hash : 'No tx found'
          }));
        });
      } catch (error) {
        console.error(error);
      }
    };

    getAllVoters();
  }, [contract, provider]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Peserta Voting</h1>
          <p className="mt-2 text-sm text-gray-700">
            Dibawah ini adalah address peserta yang telah melakukan voting
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-blue-100">
                  <tr>
                    <th scope="col" className="px-5 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Tx Hash
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Address
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status Voting
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Lacak Transaksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {voters.map((address, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{transactions[address] || 'Fetching...'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{address}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                          Selesai
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="font-medium text-indigo-700 hover:bg-indigo">
                          <a href={`https://sepolia.etherscan.io/address/${address}`}>Lacak</a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {voters.length === 0 && <p className="mt-4 text-center">No any voters voted!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
