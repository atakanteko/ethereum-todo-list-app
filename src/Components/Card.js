import React, { useContext } from 'react';
import { Context } from "../Context";
import { shortenWalletAddress } from "../Helpers/filters";

export const Card = ({ metamaskConnectionHandler, walletAddress }) => {
    const { state } = useContext(Context);

    return (
        <div className='bg-white rounded-md w-full h-fit shadow-custom xl:w-6/12 lg:w-6/12 md:w-6/12'>
            <div className='flex flex-row items-center mb-6 ml-2 px-8 pt-8'>
                <img src={require('../Assets/Images/Icons/metamask.svg').default} width={32} height={32} alt='metamask'/>
                <h2 className='text-base xl:text-lg ml-5'>Metamask Wallet Connect</h2>
            </div>
            {
                state.connectionStatus && <div className='flex flex-row justify-between items-center px-8 pb-8'>
                    <div className='flex flex-row items-center'>
                        <img src={require('../Assets/Images/Icons/card-image.svg').default} width={48} height={48} alt='card-image'/>
                        <span className='ml-3 text-sm'>{shortenWalletAddress(walletAddress)}</span>
                    </div>
                    <img src={require('../Assets/Images/Icons/copy.svg').default} width={24} height={24} alt='card-image'/>
                </div>
            }
            <div className='bg-[#181824] px-8 py-8 text-white'>
                <form>
                    <div className='rounded-md overflow-hidden flex flex-row items-center bg-[#25273C]'>
                        <input type="text" className='w-full h-fit appearance-none text-xl text-white pl-4 bg-transparent border-none focus:outline-none'/>
                        <div className='bg-[#DE6EA6] h-fit overflow-hidden py-3 px-3'>
                            <img src={require('../Assets/Images/Icons/submit-arrow.svg').default} width={24} height={24} alt='card-image'/>
                        </div>
                    </div>
                </form>
                <div className='mt-4 bg-[#25273C]'>
                    <ul>
                        <li className='pl-2 py-2 border-b-2 border-[#4840405E] flex flex-row items-center'>
                            <input type="checkbox"
                                   value=""
                                   className="w-6 h-6 mr-2"/>
                            <span>Create a new Todo</span>
                        </li>
                        <li className='pl-2 py-2 border-b-2 border-[#4840405E] flex flex-row items-center'>
                            <input type="checkbox"
                                   value=""
                                   className="w-6 h-6 mr-2"/>
                            <span>Create a new Todo</span>
                        </li>
                        <li className='pl-2 py-2 border-2 border-[#DE6EA6] text-sm'>5 Items</li>
                    </ul>
                </div>
            </div>
            <div className='bg-[#F2F4F7] px-8 py-6 border-t-2'>
                <button onClick={()=> metamaskConnectionHandler()}
                        className={`${state.connectionStatus ? 'bg-[#DE6EA6]' : 'bg-[#672CD0]'} w-full rounded-md py-2 text-center capitalize text-base text-white font-bold`}>
                    {state.connectionStatus ? 'disconnect wallet' : 'connect wallet'}
                </button>
            </div>
        </div>
    )
}
