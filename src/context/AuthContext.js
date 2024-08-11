import { createContext, useCallback, useEffect, useState } from 'react';
import OnlineVoting from '../artifacts/contracts/OnlineVoting.sol/OnlineVoting.json';
import SoulboundToken from '../artifacts/contracts/SoulboundToken.sol/SoulboundToken.json';
import { ethers } from 'ethers';

// Membuat konteks AuthContext untuk manajemen otentikasi
export const AuthContext = createContext();

// Membuat provider untuk AuthContext
export const AuthContextProvider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [adminAccount, setAdminAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [soulboundContract, setSoulboundContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  // Fungsi untuk menghubungkan wallet ke aplikasi
  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      console.error('MetaMask tidak terpasang! Mengarahkan ke halaman unduh MetaMask.');
      window.location.href = 'https://metamask.io/download.html';
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const contractAddress = '0x6684EFC86B0263D1C371B687127d97C308eBbA3D';
      const soulboundContractAddress =
        '0x3534b4BC726B077D81331AD6912C237901d06EC3';

      const contract = new ethers.Contract(
        contractAddress,
        OnlineVoting.abi,
        signer
      );
      const soulboundContract = new ethers.Contract(
        soulboundContractAddress,
        SoulboundToken.abi,
        signer
      );
      const admin = await contract.getOwner();

      setAccount(address);
      setContract(contract);
      setSoulboundContract(soulboundContract);
      setProvider(provider);
      setAdminAccount(admin);
      setConnected(true);
      window.localStorage.setItem('Connected', 'injected');

      // Periksa apakah pengguna adalah admin
      setIsAdmin(address.toLowerCase() === admin.toLowerCase());

      // Mengatur event listener
      const handleChainChanged = () => window.location.reload();
      const handleAccountsChanged = async () => {
        const newAccount = await provider.getSigner().getAddress();
        setAccount(newAccount);
        const admin = await contract.getOwner();
        setAdminAccount(admin);
        setIsAdmin(newAccount.toLowerCase() === admin.toLowerCase());
      };

      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged
        );
      };
    } catch (error) {
      console.error('Error saat menghubungkan ke provider Ethereum:', error);
    }
  }, []);

  // Fungsi untuk memutuskan koneksi wallet
  const disconnectWallet = useCallback(() => {
    setAccount('');
    setContract(null);
    setSoulboundContract(null);
    setProvider(null);
    setConnected(false);
    setIsAdmin(false);
    window.localStorage.removeItem('Connected');
  }, []);

  // Fungsi untuk memeriksa apakah pengguna memenuhi syarat pemilih
  const isEligibleVoter = useCallback(async () => {
    if (soulboundContract && account) {
      try {
        return await soulboundContract.isEligibleVoter(account);
      } catch (error) {
        console.error('Error saat memeriksa kelayakan:', error);
      }
    }
    console.error(
      'Instance kontrak Soulbound tidak tersedia atau akun tidak terhubung.'
    );
    return false;
  }, [soulboundContract, account]);

  // Efek samping untuk menghubungkan otomatis jika sebelumnya terhubung
  useEffect(() => {
    if (window.localStorage.getItem('Connected')) {
      connectWallet(); // Menghubungkan jika sudah ada data Connected di localStorage
    }
  }, [connectWallet]);

  // Menyediakan nilai untuk AuthContext
  return (
    <AuthContext.Provider
      value={{
        connected,
        contract,
        account,
        provider,
        adminAccount,
        setCurrentUser,
        currentUser,
        isEligibleVoter,
        connectWallet,
        disconnectWallet,
        isAdmin, // Tambahkan status admin di sini
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
