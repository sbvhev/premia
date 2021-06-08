import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from 'state';
import { setGasPrices } from './actions';
import { GasNowData } from './reducer'

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>();

  let ws: any, websocket: any, timer: any, reConnectTimes = 0;
  
  function convertGasNowValueToNumber(gasNowValue: number): number {
    return Math.floor((gasNowValue || 1) / Math.pow(10, 9))
  }

  const fetchGasData = () => {
    clearTimeout(timer);

    fetch("https://www.gasnow.org/api/v3/gas/price?utm_source=GasNowExtension", {
      method: 'GET'
    }).then((res) => res.json())
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
      }).catch(() => {
        if (reConnectTimes < 20) { reConnectTimes++ }

        timer = setTimeout(getGas, reConnectTimes < 20 ? 1000 : 15000);
      });
  };

  const createWebSocketConnection = () => {
    if (ws) { return }

    if('WebSocket' in window) {
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
  
      ws.onclose = function() {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
