import { Fragment, useContext, useState, useEffect } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import img from '../img/vote.png';
import { Link, useParams } from 'react-router-dom';
import {
  CalendarIcon,
  FolderIcon,
  UserPlusIcon,
  XMarkIcon,
  UsersIcon,
  ChartBarIcon,
  CheckCircleIcon,
  RectangleStackIcon,
  ArchiveBoxArrowDownIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { AuthContext } from '../context/AuthContext';

const adminNav = [
  {
    id: 0,
    name: 'Candidate Details',
    to: '/dashboard/candidate-details',
    icon: InformationCircleIcon,
  },
  {
    id: 4,
    name: 'Add Candidate',
    to: '/dashboard/add-candidate',
    icon: UserPlusIcon,
  },
  { id: 5, name: 'Voters', to: '/dashboard/voters', icon: UsersIcon },
  { id: 3, name: 'Result', to: '/dashboard/result', icon: ChartBarIcon },
];
const voterNav = [
  {
    id: 0,
    name: 'Information',
    to: '/dashboard/information',
    icon: InformationCircleIcon,
  },
  { id: 1, name: 'Search', to: '/dashboard/search', icon: CheckCircleIcon },
  {
    id: 2,
    name: 'Vote-Area',
    to: '/dashboard/vote-area',
    icon: RectangleStackIcon,
  },
  { id: 3, name: 'Result', to: '/dashboard/result', icon: ChartBarIcon },
  { id: 4, name: 'Mint SBT', to: '/dashboard/mint-sbt', icon: FolderIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const Sidebar = ({ onClick }) => {
  const { id } = useParams();
  const [current, setCurrent] = useState(0);
  const { adminAccount, account } = useContext(AuthContext);

  useEffect(() => {
    switch (id) {
      case 'information':
        setCurrent(0);
        break;
      case 'candidate-details':
        setCurrent(0);
        break;
      case 'search':
        setCurrent(1);
        break;
      case 'vote-area':
        setCurrent(2);
        break;
      case 'result':
        setCurrent(3);
        break;
      case 'add-candidate':
        setCurrent(4);
        break;
      case 'voters':
        setCurrent(5);
        break;
      case 'mint-sbt':
        setCurrent(6);
        break;
    }
  }, []);

  const handleClick = (id, name) => {
    setCurrent(id);
    onClick(name);
  };

  return (
    <div>
      <div className='hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col '>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className='flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5'>
          <div className='flex flex-shrink-0 items-center px-4'>
            <a href='/'>
              <h1 className='h-16 w-auto' alt='Your Company'>
                VOTE YUK!
              </h1>
            </a>
          </div>
          <div className='mt-5 flex flex-grow flex-col'>
            {account != adminAccount ? (
              <nav className='flex-1 space-y-1 px-2 pb-4'>
                {voterNav.map((item) => (
                  <Link
                    key={item.name}
                    to={`${item.to}`}
                    className={
                      current == item.id
                        ? `bg-blue text-white group flex items-center px-4 py-3 text-sm font-medium rounded-[4px]`
                        : `text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-4 py-3 text-sm font-medium rounded-[4px]`
                    }
                    onClick={() => handleClick(item.id, item.name)}
                  >
                    <item.icon
                      className={
                        current == item.id
                          ? 'text-white mr-3 flex-shrink-0 h-6 w-6'
                          : 'text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6'
                      }
                      aria-hidden='true'
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            ) : (
              <nav className='flex-1 space-y-1 px-2 pb-4'>
                {adminNav.map((item) => (
                  <Link
                    key={item.name}
                    to={`${item.to}`}
                    className={
                      current == item.id
                        ? `bg-blue text-white group flex items-center px-4 py-3 text-sm font-medium rounded-[4px]`
                        : `text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-4 py-3 text-sm font-medium rounded-[4px]`
                    }
                    onClick={() => handleClick(item.id, item.name)}
                  >
                    <item.icon
                      className={
                        current == item.id
                          ? 'text-white mr-3 flex-shrink-0 h-6 w-6'
                          : 'text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6'
                      }
                      aria-hidden='true'
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
