pragma solidity ^0.4.23;

contract Lottery{
	//荷官，管理者
	address public manager;
	//赢家
	address public winner;

	//玩家列表
	address[] public players;

	constructor() public {
		manager = msg.sender;
	}

	function enter() public payable{
		require(msg.value >0.01 ether);
		players.push(msg.sender);
	}

	function random() private view returns(uint){
		return uint(keccak256(block.difficulty,now,players));
	}

	modifier restricted{
		require(msg.sender == manager);
		_;
	}

	//Gas requirement of function Lottery.getPlayers() high: infinite.
	//If the gas requirement of a function is higher than the block gas limit, it cannot be executed.
	//Please avoid loops in your functions or actions that modify large areas of storage
	//(this includes clearing or copying arrays in storage)
	function pickwinner() public payable restricted{
		require(msg.sender == manager);
		uint index = random() % players.length;
		winner = players[index];

		//所有的钱全部转给赢家
		winner.transfer(address(this).balance);
		//清空玩家列表
		//players = new address[](0);	//编译器提示，循环消耗太多GAS，同时用这种方式会导致winner取不到，

		players .length = 0;			//暂时用这种方式处理一下
	}

	//Gas requirement of function Lottery.pickwinner() high: infinite.
	//If the gas requirement of a function is higher than the block gas limit, it cannot be executed.
	//Please avoid loops in your functions or actions that modify large areas of storage
	//(this includes clearing or copying arrays in storage)
	function getPlayers() public view returns(address[]){
		return players;
	}

}