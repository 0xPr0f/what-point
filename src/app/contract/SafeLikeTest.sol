//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "./IBlast.sol";
import "https://github.com/Vectorized/solady/blob/main/src/auth/Ownable.sol";

interface IBlastPoints {
    function configurePointsOperator(address operator) external;
    function configurePointsOperatorOnBehalf(
        address contractAddress,
        address operator
    ) external;
}
interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}
event SafeCalledData(
    address indexed interact,
    address indexed caller,
    bytes data,
    bool success
);
//This contract does not like NFT and cannot be self destructed
contract SafeLikeTest is Ownable {
    // points address on blast sepolia
    address public constant BLASTPOINTSADDRESS =
        0x2fc95838c71e76ec69ff817983BFf17c710F34E0;
    // ALL address here are point to testnet blast (blast sepolia)
    IBlast public blast = IBlast(0x4300000000000000000000000000000000000002);
    IERC20Rebasing public WETH =
        IERC20Rebasing(0x4200000000000000000000000000000000000023);
    IERC20Rebasing public USDB =
        IERC20Rebasing(0x4200000000000000000000000000000000000022);
    string public name;
    uint256 public id;
    constructor(address operator_, string memory name_, uint256 id_) {
        _initializeOwner(operator_);
        name = name_;
        id = id_;
        IBlastPoints(BLASTPOINTSADDRESS).configurePointsOperator(operator_);
        blast.configure(YieldMode.AUTOMATIC, GasMode.CLAIMABLE, operator_);
        USDB.configure(YieldMode.AUTOMATIC);
        WETH.configure(YieldMode.AUTOMATIC);
    }

    function ethBalance(address usr) external view returns (uint) {
        return usr.balance;
    }
    function tokenBalance(
        address token,
        address usr
    ) external view returns (uint) {
        return IERC20(token).balanceOf(usr);
    }

    //contract logic
    function safeCalldata(
        address payable interact,
        bytes calldata data_
    ) external payable onlyOwner {
        (bool success, ) = interact.call{value: msg.value}(data_);
        require(success, "SCDF");
        emit SafeCalledData(interact, msg.sender, data_, success);
    }
    //claim logic
    function claimGas() external onlyOwner {
        blast.claimAllGas(address(this), msg.sender);
    }
    //withdraw logic
    function withdrawEth(address reciever, uint256 amount) external onlyOwner {
        (bool success, ) = payable(reciever).call{value: amount}("");
        require(success, "WEF");
    }
    function withdrawToken(
        address token,
        address reciever,
        uint256 amount
    ) external onlyOwner {
        bool success = IERC20(token).transfer(reciever, amount);
        require(success, "WTF");
    }

    //there
    receive() external payable {}
    fallback() external payable {}
}
