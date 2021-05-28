import { Interface } from '@ethersproject/abi';

import { Erc20Abi, Erc20Bytes32Abi } from './abi';

const ERC20_INTERFACE = new Interface(Erc20Abi);
const ERC20_BYTES32_INTERFACE = new Interface(Erc20Bytes32Abi);

export default ERC20_INTERFACE;
export { ERC20_INTERFACE, ERC20_BYTES32_INTERFACE };
