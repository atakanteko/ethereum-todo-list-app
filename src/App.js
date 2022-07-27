import './App.css';
import { useState, useEffect, useContext } from "react";
import { Card } from "./Components/Card";
import { Context} from "./Context";
import Web3 from "web3";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "./Helpers/smart-contract-abi";

function App() {
    const { dispatch, state } = useContext(Context);
    const [walletAddress, setWalletAddress] = useState('')
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)
    const [todoTasks, setTodoTasks] = useState([])
    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            if (localStorage?.getItem('isWalletConnected') === 'true') {
                connectMetamask()
            }
        }
        connectWalletOnPageLoad()
    }, [])

    useEffect(() => {
        setTimeout(()=>{
            setIsMetaMaskInstalled(false)
        },5000)
    }, [isMetaMaskInstalled])

    const loadBlockChainData = async () => {
        const web3 = new Web3(Web3.givenProvider)
        const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
        const taskCount = await todoList.methods.taskCount().call();
        for (let i = 1; i <= taskCount; i++) {
            const task = await todoList.methods.tasks(i).call();
            console.log(task)
            setTodoTasks(oldArray => [...oldArray, task])
        }
        dispatch({
            type: "SET_TODO_ITEMS",
            payload: todoTasks
        });
    }

    const connectMetamask = async () => {
        if (typeof window.ethereum !== 'undefined') {
            if (window.ethereum && window.ethereum.isMetaMask) {
                window.ethereum
                    .request({ method: "eth_requestAccounts" })
                    .then(async (account) => {
                        await loadBlockChainData()
                        localStorage.setItem('isWalletConnected', true)
                        setWalletAddress(account[0])
                        dispatch({
                            type: "SET_CONNECTION_STATUS",
                            payload: true
                        });
                    
                    })
                    .catch((ex) => {
                        console.log(ex)
                    });
            }
        } else {
            setIsMetaMaskInstalled(true)
        }
    }

    const disconnect = async () => {
        try {
            await window.ethereum.request({
                method: "eth_requestAccounts",
                params: [{eth_accounts: {}}]
            })
            localStorage.setItem('isWalletConnected', false)
            dispatch({
                type: "SET_CONNECTION_STATUS",
                payload: false
            });
            setTodoTasks([])
            dispatch({
                type: "SET_TODO_ITEMS",
                payload: []
            });
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
      <section className='h-screen flex flex-col items-center justify-center px-5 relative'>
          <Card metamaskConnectionHandler={state.connectionStatus ? disconnect : connectMetamask}
                walletAddress={walletAddress}
                todoTasks={todoTasks}
          />
          {
              isMetaMaskInstalled && <div className='absolute top-11 right-5 bg-red-500 py-2 px-2 rounded-md'>
                  <span className='text-lg text-white'>Make sure the Metamask plugin is installed.</span>
              </div>
          }
      </section>
    );
}

export default App;
