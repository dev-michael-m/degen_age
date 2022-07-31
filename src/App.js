import './App.css';
import './stylesheet/Sections.css';
import { useEffect, useState, useRef } from 'react';

function App() {
    
  useEffect(() => {
      let mounted = true;

    if (mounted) {
      // (async() => {
      //   const sold_out = await getSoldOut();

      //   if(sold_out.data){
      //     setSoldOut(true);
      //   }else{
      //     const publicSale = await getPublicState();

      //     if(publicSale.status){
      //       if(publicSale.active){
      //           setSaleActive(true);
      //           setPubSale(publicSale.active);
      //       }          
      //     }
      //   }
      // })();

      // const connected = sessionStorage.getItem('connected');

      // if(connected === 'true'){
        
      //   ConnectWallet()
      //   .then((status) => {
      //     setWallet({
      //       address: status.address,
      //       snippet: status.address_snippet,
      //     });
      //     window.ethereum.on("accountsChanged", handleAccountsChanged);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      // }
      
    }        

    return () => {
      mounted = false;
    };
  }, []);


  return (
    <div className="App">
          
    </div>
  );
}

export default App;
