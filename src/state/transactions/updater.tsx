import { useEffect } from 'react';
import { ethers } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState } from 'state';
import { setGasPrices, setTxHistory } from './actions';
import { GasNowData, Transaction } from './reducer';

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>();

  let ws: any,
    websocket: any,
    timer: any,
    reConnectTimes = 0;

  function convertGasNowValueToNumber(gasNowValue: number): number {
    return Math.floor((gasNowValue || 1) / Math.pow(10, 9));
  }

  const { account } = useSelector<AppState, AppState['application']>(
    (state) => state.application,
  );

  const fetchGasData = () => {
    clearTimeout(timer);

    fetch(
      'https://www.gasnow.org/api/v3/gas/price?utm_source=GasNowExtension',
      {
        method: 'GET',
      },
    )
      .then((res) => res.json())
      .then((json) => {
        const gasNowData: GasNowData = {
          slow: convertGasNowValueToNumber(json.data.slow),
          standard: convertGasNowValueToNumber(json.data.standard),
          fast: convertGasNowValueToNumber(json.data.fast),
          rapid: convertGasNowValueToNumber(json.data.rapid),
          timestamp: json.data.timestamp,
        };

        dispatch(setGasPrices(gasNowData));

        reConnectTimes = 0;

        timer = setTimeout(() => {
          getGas(true);
        }, 15000);
      })
      .catch(() => {
        if (reConnectTimes < 20) {
          reConnectTimes++;
        }

        timer = setTimeout(getGas, reConnectTimes < 20 ? 1000 : 15000);
      });
  };

  const createWebSocketConnection = () => {
    if (ws) {
      return;
    }

    if ('WebSocket' in window) {
      websocket = false;

      ws = new WebSocket('wss://www.gasnow.org/ws/gasprice');

      ws.onmessage = function (event: any) {
        const dataStr = event.data;
        const json = JSON.parse(dataStr);
        const gasNowData: GasNowData = {
          slow: convertGasNowValueToNumber(json.data.slow),
          standard: convertGasNowValueToNumber(json.data.standard),
          fast: convertGasNowValueToNumber(json.data.fast),
          rapid: convertGasNowValueToNumber(json.data.rapid),
          timestamp: json.data.timestamp,
        };

        dispatch(setGasPrices(gasNowData));
      };

      ws.onclose = function () {
        ws = undefined;
        getGas(websocket);
      };
    } else {
      getGas(false);
    }
  };

  const getGas = (type: any) => {
    type ? createWebSocketConnection() : fetchGasData();
  };

  useEffect(() => {
    getGas(true);

    return () => {
      if (!ws) return;
      ws.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let provider = new ethers.providers.EtherscanProvider();

    async function fetchTransactions() {
      try {
        if (!!account) {
          const history = await provider.getHistory(account);
          const transactions: Transaction[] = history.map((item) => {
            return {
              hash: item.hash,
              timestamp: item.timestamp,
              complete: true,
            } as Transaction;
          });
          dispatch(setTxHistory(transactions));
        }
      } catch (err) {}
    }

    fetchTransactions();
  }, [account, dispatch]);

  return null;
}
