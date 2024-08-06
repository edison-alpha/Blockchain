import { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link, NavLink, useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import {
  Bars3BottomLeftIcon,
  XMarkIcon,
  CheckCircleIcon,
  RectangleStackIcon,
  ChartBarIcon,
  UserPlusIcon,
  InformationCircleIcon,
  ArchiveBoxArrowDownIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import CandidateDetails from './components/CandidateDetails';
import AddCandidate from './components/AddCandidate';
import Result from './components/Result';
import Voters from './components/Voters';
import VoteArea from './components/VoteArea';
import Search from './components/Search';
import MintSBT from './components/MintSBT';
import { AuthContext } from './context/AuthContext';

// Daftar menu navigasi untuk admin
const adminNav = [
  {
    name: 'Candidate Details',
    href: '/dashboard/candidate-details',
    icon: InformationCircleIcon,
  },
  {
    name: 'Add Candidate',
    href: '/dashboard/add-candidate',
    icon: UserPlusIcon,
  },
  { name: 'Register', href: '/dashboard/register', icon: UsersIcon },
  { name: 'Result', href: '/dashboard/result', icon: ChartBarIcon },
];

// Daftar menu navigasi untuk pemilih
const voterNav = [
  {
    name: 'Information',
    href: '/dashboard/information',
    icon: InformationCircleIcon,
  },
  { name: 'Search', href: '/dashboard/search', icon: CheckCircleIcon },
  { name: 'Vote-Area', href: '/dashboard/vote-area', icon: RectangleStackIcon },
  { name: 'Result', href: '/dashboard/result', icon: ChartBarIcon },
  {
    name: 'Mint SBT',
    href: '/dashboard/mint-sbt',
    icon: ArchiveBoxArrowDownIcon,
  },
];

// Fungsi untuk menggabungkan kelas CSS
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Komponen yang ditampilkan berdasarkan pilihan menu
const components = {
  1: CandidateDetails,
  2: Search,
  3: VoteArea,
  4: Result,
  5: AddCandidate,
  6: Voters,
  7: MintSBT,
};

function Home() {
  const { id } = useParams();

  // Mengambil nilai dari AuthContext
  const { account, connected, connectWallet, disconnectWallet, isAdmin } =
    useContext(AuthContext);
  // State untuk membuka atau menutup sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State untuk menentukan komponen mana yang ditampilkan
  const [component, setComponent] = useState(1);
  const Component = components[component];
  // State untuk menyimpan pesan atau status saat ini
  const [msg, setMsg] = useState();

  useEffect(() => {
    switch (id) {
      case 'information':
        setComponent(1);
        break;
      case 'candidate-details':
        setComponent(1);
        break;
      case 'search':
        setComponent(2);
        break;
      case 'vote-area':
        setComponent(3);
        break;
      case 'result':
        setComponent(4);
        break;
      case 'add-candidate':
        setComponent(5);
        break;
      case 'voters':
        setComponent(6);
        break;
      case 'mint-sbt':
        setComponent(7);
        break;
    }
  }, []);

  // Fungsi untuk menangani klik pada menu dan mengubah komponen yang ditampilkan
  const onClick = (data) => {
    setMsg(data);
    if (data === 'Information' || data === 'Candidate Details') setComponent(1);
    else if (data === 'Search') setComponent(2);
    else if (data === 'Vote-Area') setComponent(3);
    else if (data === 'Result') setComponent(4);
    else if (data === 'Add Candidate') setComponent(5);
    else if (data === 'Voters') setComponent(6);
    else if (data === 'Mint SBT') setComponent(7);
  };

  return (
    <div>
      <div>
        {/* Transisi sidebar pada perangkat mobile */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
  <Dialog
    as='div'
    className='relative z-40 md:hidden'
    onClose={setSidebarOpen}
  >
    <Transition.Child
      as={Fragment}
      enter='transition-opacity ease-linear duration-300'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity ease-linear duration-300'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
    </Transition.Child>

    <div className='fixed inset-0 z-40 flex'>
      <Transition.Child
        as={Fragment}
        enter='transition ease-in-out duration-300 transform'
        enterFrom='-translate-x-full'
        enterTo='translate-x-0'
        leave='transition ease-in-out duration-300 transform'
        leaveFrom='translate-x-0'
        leaveTo='-translate-x-full'
      >
        <Dialog.Panel className='relative flex w-full max-w-xs flex-col bg-white p-4 shadow-lg'>
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='absolute top-0 right-0 -mr-12 pt-2'>
              <button
                type='button'
                className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                onClick={() => setSidebarOpen(false)}
              >
                <span className='sr-only'>Tutup sidebar</span>
                <XMarkIcon
                  className='h-6 w-6 text-white'
                  aria-hidden='true'
                />
              </button>
            </div>
          </Transition.Child>
            <nav className='mt-8 space-y-4'>
              {isAdmin ? (
                <>
                  <a href='/dashboard/candidate-details' className='block text-lg text-gray-800 px-4'>
                    Candidate Details
                  </a>
                  <a href='/dashboard/add-candidate' className='block text-lg text-gray-800 px-4'>
                    Add Candidate
                  </a>
                  <a href='/dashboard/voters' className='block text-lg text-gray-800 px-4'>
                    Voters
                  </a>
                  <a href='/dashboard/result' className='block text-lg text-gray-800 px-4'>
                    Result
                  </a>
                </>
              ) : (
                <>
                  <a href='/' className='block text-lg text-gray-800 px-4'>
                    Home
                  </a>
                  <a href='/dashboard/search' className='block text-lg text-gray-800 px-4'>
                    Search
                  </a>
                  <a href='/dashboard/vote-area' className='block text-lg text-gray-800 px-4'>
                    Vote-Area
                  </a>
                  <a href='/dashboard/result' className='block text-lg text-gray-800 px-4'>
                    Result
                  </a>
                  <a href='/dashboard/mint-sbt' className='block text-lg text-gray-800 px-4'>
                    MintSBT
                  </a>
                </>
              )}
              {connected ? (
                <button
                  type='button'
                  className='w-full text-left text-lg text-red-500 px-4'
                  onClick={disconnectWallet}
                >
                  Logout
                </button>
              ) : (
                <button
                  type='button'
                  className='w-full text-left text-lg text-blue-500 px-4'
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              )}
            </nav>
        </Dialog.Panel>
      </Transition.Child>
      <div className='w-14 flex-shrink-0' aria-hidden='true'>
        {/* Dummy element untuk memaksa sidebar menyusut sesuai ikon tutup */}
      </div>
    </div>
  </Dialog>
</Transition.Root>
        {/* Sidebar statis untuk desktop */}
        <Sidebar onClick={onClick} />

        <div className='flex flex-1 flex-col md:pl-64'>
          <div className='sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow'>
            <button
              type='button'
              className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Buka sidebar</span>
              <Bars3BottomLeftIcon className='h-6 w-6' aria-hidden='true' />
            </button>
            <div className='flex flex-1 justify-between px-4'>
              <div className='flex flex-1'>
                <p className='p-4 text-sm'>
                  <button
                    type='button'
                    className='inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    {connected
                      ? `Akun Anda: ${account}`
                      : 'Silakan Hubungkan Wallet Anda'}
                  </button>
                </p>
              </div>
              <div className='ml-4 flex items-center md:ml-6'>
                <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
                  {connected ? (
                    <button
                      type='button'
                      className='inline-flex items-center justify-center rounded-md border border-transparent bg-blue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
                      onClick={disconnectWallet}
                    >
                      Disconnect Wallet
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='inline-flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto'
                      onClick={connectWallet}
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bagian utama untuk menampilkan konten */}
          <main className='flex-1'>
            <div className='py-6'>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
                <div className='py-4'>
                  <Component /> {/* Render komponen yang dipilih */}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Home;
