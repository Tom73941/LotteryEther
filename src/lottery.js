// JavaScript source code
import web3 from './web3';
const address = '0x5f566ff3fe9cD4aBE13e4380634938b9Ab6b1a48';
    
const abi = 
            [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},
             {"constant":false,"inputs":[],"name":"pickwinner","outputs":[{"name":"","type":"address"}],"payable":true,"stateMutability":"payable","type":"function"},
             {"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},
             {"constant":true,"inputs":[],"name":"winner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},
             {"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},
             {"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},
             {"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

export default new web3.eth.Contract(abi,address);