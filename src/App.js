import React ,{Component} from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
    state = {
        manager:'',
        players:[],
        winner:'',
        balance:'',
        value:'',
        message:''
    }

    async componentDidMount(){
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);
        this.setState({manager,players,balance});
    }

    onSubmit  = async event =>{
        if(parseFloat(this.state.value)>0.01){
            event.preventDefault();     //阻止屏幕刷新
            const accounts = await web3.eth.getAccounts();

            this.setState({message:'等待交易完成.......'});
            console.log(accounts[0]);
            await lottery.methods.enter().send({from:accounts[0], value:web3.utils.toWei(this.state.value,'ether')});
            const players = await lottery.methods.getPlayers().call();
            const balance = await web3.eth.getBalance(lottery.options.address);
            const message = "入场成功.......";
            this.setState({message,players,balance});
        }
        else{
            this.setState({message:'您还没有输入可以博彩的金额，请先输入一个大于0.01的数值！'});
        }
    }

    onClick  = async event =>{
        if(parseFloat(this.state.balance)>0.0){
            const accounts = await web3.eth.getAccounts();
            this.setState({message:'等待交易完成.......'});
            //console.log(accounts[0]);
            const win = await lottery.methods.pickwinner().send({from:accounts[0]});
            const winner = await lottery.methods.winner().call();
            this.setState({winner});
            const message = '赢家产生！恭喜玩家 ' + winner + ' 赢得 ' + web3.utils.fromWei(this.state.balance,'ether') + 'ether！';
            const players = await lottery.methods.getPlayers().call();
            const balance = await web3.eth.getBalance(lottery.options.address);
            this.setState({message,players,balance});
        }
        else{
            alert('奖金池中还没有资金，请先进入博彩区！');
            this.setState({message:'奖金池中还没有资金，请先进入博彩区！'});
        }

    }

    render() {
        return (
          <div className="App">

            <h1 corlor = 'red'>欢迎来到区块链博彩区！</h1>
            <h2>当前管理者地址：{this.state.manager}</h2>
            <hr/>
            <form onSubmit={this.onSubmit}>
                <h2>参与博彩项目！</h2>
                <h3>当前参与者数量：{this.state.players.length}</h3>
                <h3>当前资金池：{web3.utils.fromWei(this.state.balance,'ether')}  ether。</h3>
                <div>
                <label>您想参与的金额：</label>
                <input value={this.state.value} onChange={event=>{this.setState({value:event.target.value})}} /> ether。
                <button>提交</button>
                </div>
            </form>
            <hr/>
            <h2>判断输赢</h2>

            <button onClick={this.onClick}>开始博彩</button>
            <h1 color = 'red'>{this.state.message}</h1>
          </div>
      );
    }
}


export default App;
