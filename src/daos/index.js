import { ContractModel } from 'src/models'

import CONTRACTS_MANAGER_ABI from 'laborx-sc-abi/build/contracts/ContractsManager.json'
import ERC20_LIBRARY_ABI from 'laborx-sc-abi/build/contracts/ERC20Library.json'
import ERC20_INTERFACE_ABI from 'laborx-sc-abi/build/contracts/ERC20Interface.json'
import JOB_CONTROLLER_ABI from 'laborx-sc-abi/build/contracts/JobController.json'
import BOARD_CONTROLLER_ABI from 'laborx-sc-abi/build/contracts/BoardController.json'

import ContractsManagerDAO from './lib/ContractsManagerDAO'
import ERC20LibraryDAO from './lib/ERC20LibraryDAO'
import JobControllerDAO from './lib/JobControllerDAO'
import BoardControllerDAO from './lib/BoardControllerDAO'
import ERC20TokenDAO from './lib/ERC20TokenDAO'

export { default as ethDAO } from './lib/ETHDAO'
export { default as AbstractContractDAO } from './lib/AbstractContractDAO'
export { default as AbstractTokenDAO } from './lib/AbstractTokenDAO'
// export { default as EIP20TokenDAO } from './lib/EIP20TokenDAO'
export { default as ETHTokenDAO } from './lib/ETHTokenDAO'
export { default as ContractsManagerDAO } from './lib/ContractsManagerDAO'
export { default as JobControllerDAO } from './lib/JobControllerDAO'
export { default as BoardControllerDAO } from './lib/BoardControllerDAO'
export { default as ERC20LibraryDAO } from './lib/ERC20LibraryDAO'

export const CONTRACTS_MANAGER = new ContractModel({
  type: "ContractsManager",
  address: CONTRACTS_MANAGER_ABI.networks['135744'].address,
  abi: CONTRACTS_MANAGER_ABI,
  DAOClass: ContractsManagerDAO,
})

export const ERC20_LIBRARY = new ContractModel({
  type: "ERC20Library",
  abi: ERC20_LIBRARY_ABI,
  DAOClass: ERC20LibraryDAO,
})

export const JOB_CONTROLLER = new ContractModel({
  type: "JobController",
  abi: JOB_CONTROLLER_ABI,
  DAOClass: JobControllerDAO,
})

export const BOARD_CONTROLLER = new ContractModel({
  type: "BoardController",
  abi: BOARD_CONTROLLER_ABI,
  DAOClass: BoardControllerDAO,
})

export const ERC20_INTERFACE = new ContractModel({
  type: 'ERC20Interface',
  abi: ERC20_INTERFACE_ABI,
  DAOClass: ERC20TokenDAO,
})

// export const MULTI_EVENTS_HISTORY = "MultiEventsHistory"
// export const BALANCE_HOLDER = "BalanceHolder"
// export const RECOVERY = "Recovery"
// export const RATINGS_AND_REPUTATION_LIBRARY = "RatingsAndReputationLibrary"
// export const IPFS_LIBRARY = "IPFSLibrary"
// export const SKILLS_LIBRARY = "SkillsLibrary"
// export const USER_FACTORY = "UserFactory"
// export const USER_LIBRARY = "UserLibrary"
// export const PAYMENT_GATEWAY = "PaymentGateway"
// export const PAYMENT_PROCESSOR = "PaymentProcessor"
