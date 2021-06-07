import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BigNumber } from 'ethers';

import { useWeb3 } from 'state/application/hooks';
import { useUnderlyingPrice } from 'state/options/hooks';
import { AppDispatch, AppState } from 'state';
import { updatePricePerUnit } from './actions';
import { fixedFromFloat } from 'utils/fixedFromFloat';
import { floatFromFixed } from 'utils/floatFromFixed';
import { formatBigNumber } from 'utils/formatNumber';
import moment from 'moment';

export default function Updater(): null {
  const { contracts } = useWeb3();
  const dispatch = useDispatch<AppDispatch>();
  const { underlying, maturityDate, strikePrice, size } = useSelector<
    AppState,
    AppState['options']
  >((state) => state.options);
  const underlyingPrice = useUnderlyingPrice();

  useEffect(() => {
    if (!contracts || !size || !strikePrice || !maturityDate) return;

    const getMaturity = (days: number) => {
      return BigNumber.from(
        Math.floor(new Date(maturityDate).getTime() / 1000 / ONE_DAY) *
          ONE_DAY +
          days * ONE_DAY,
      );
    };

    const ONE_DAY = 3600 * 24;

    const daysToMaturity = moment(maturityDate).diff(moment(), 'days');
    const maturity = getMaturity(daysToMaturity).toHexString();
    const strike64x64 = fixedFromFloat(strikePrice).toHexString();
    const spot64x64 = fixedFromFloat(1.5).toHexString();
    const optionSize = BigNumber.from(size).toHexString();

    console.log(
      daysToMaturity,
      maturityDate,
      strikePrice,
      underlyingPrice,
      size,
    );
    console.log(maturity, strike64x64, spot64x64, optionSize);

    async function fetchPricePerUnit(): Promise<BigNumber> {
      const response = await contracts!.Pool.quote(
        maturity,
        strike64x64,
        spot64x64,
        optionSize,
      );

      return floatFromFixed(response.cost64x64, underlying.decimals).div(
        BigNumber.from(size),
      );
    }

    fetchPricePerUnit().then((pricePerUnit) => {
      dispatch(updatePricePerUnit(Number(formatBigNumber(pricePerUnit))));
    });
  }, [
    dispatch,
    contracts,
    maturityDate,
    strikePrice,
    size,
    underlying,
    underlyingPrice,
  ]);

  return null;
}
