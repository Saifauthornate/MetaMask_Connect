 


const initialize = () => {
    
    const onboardButton = document.getElementById('connectButton');
    const getAccountsButton = document.getElementById('getAccounts');
    const getAccountsResult = document.getElementById('getAccountsResult');
  
   
    const isMetaMaskInstalled = () => {
      
      const { ethereum } = window;
      return Boolean(ethereum && ethereum.isMetaMask);
    };
   
  
    const onClickConnect = async () => {
      try {
   
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error(error);
      }
    };
  
    const MetaMaskClientCheck = () => {
    
      if (!isMetaMaskInstalled()) {
        
        onboardButton.innerText = 'Click here to install MetaMask!';
      
        
        onboardButton.disabled = false;
      } else {
       
        onboardButton.innerText = 'Connect';
      
        onboardButton.onclick = onClickConnect;
       
        onboardButton.disabled = false;
      }
    };
  
     
    getAccountsButton.addEventListener('click', async () => {
       
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
     
      getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
      onboardButton.disabled = false;
    });
  
    MetaMaskClientCheck();
    window.ethereum.on('accountsChanged', (accounts) => {
      
      console.log("changed account address is:",accounts)
      getAccountsResult.innerHTML = accounts
  
    });

    window.ethereum.on('chainChanged', ( ) => {
     
      window.location.reload();
    });
 
    


  };

  
  window.addEventListener('DOMContentLoaded', initialize);