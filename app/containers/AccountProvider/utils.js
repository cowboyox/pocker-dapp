import Web3 from 'web3';
import WebsocketProvider from '../../services/wsProvider';
import { conf } from '../../app.config';

const confParams = conf();

let web3Instance;
let web3InjectedInstance;

export function getWeb3(injected = false, refresh = false) {
  if (injected) {
    if (typeof web3InjectedInstance === 'undefined' && window.web3) {
      web3InjectedInstance = new Web3(window.web3.currentProvider);
    }

    return web3InjectedInstance;
  }

  if (typeof web3Instance === 'undefined') {
    web3Instance = new Web3(new WebsocketProvider(confParams.gethUrl));
  }

  if (web3Instance && refresh) {
    web3Instance.setProvider(new WebsocketProvider(confParams.gethUrl));
  }

  return web3Instance;
}

export function getMethodKey({ groupName, methodName, args }) {
  return `${groupName || ''}.${methodName}(${JSON.stringify(args)})`;
}

export function addEventsDate(events) {
  if (events.length === 0) {
    return Promise.resolve(events);
  }
  const web3 = getWeb3();
  const batch = web3.createBatch();
  const result = Promise.all(events.map((event) => (
    new Promise((resolve) => {
      batch.add(web3.eth.getBlock.request(event.blockNumber, (blErr, block) => {
        resolve({
          ...event,
          timestamp: block.timestamp,
        });
      }));
    })
  )));
  batch.execute();

  return result;
}
export const isUserEvent = (userAddr) => (event) => {
  const { args = {}, address } = event;
  return (
    args.from === userAddr ||
    args.purchaser === userAddr ||
    args.seller === userAddr ||
    args.sender === userAddr ||
    args.owner === userAddr ||
    args.spender === userAddr ||
    args.to === userAddr ||
    address === userAddr
  );
};
