import { InjectionToken } from '@angular/core';
import Web3 from 'web3';

export const WEB3 = new InjectionToken<Web3>('web3', {
  providedIn: 'root',
  factory: () => {
    try {
      //ganache
      //Web3.givenProvider = new Web3.providers.HttpProvider('http://localhost:7545');
      //etherium

      //'ws://localhost:8546' //the http port use to be 8545 and the ws is 8546 the ws connection must be config in geth with the -ws flag
      Web3.givenProvider = new Web3.providers.WebsocketProvider('ws://35.168.252.146:8546'); 

      const provider = ('ethereum' in window) ? window['ethereum'] : Web3.givenProvider;
      return new Web3(provider);
    } catch (err) {
      throw new Error('Non-Ethereum browser detected. You should consider trying Mist or MetaMask!');
    }
  }
});
