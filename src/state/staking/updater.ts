import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useBlockNumber, useWeb3 } from 'state/application/hooks';
import { setStakingBalances } from './actions';
import { useStakingBalances } from './hooks';

export default function Updater(): null {
  const { account, contracts } = useWeb3();
  const { xPremiaLocked, xPremiaBalance, totalPremiaStaked, xPremiaSupply } =
    useStakingBalances();
  const dispatch = useDispatch();

  const latestBlockNumber = useBlockNumber();

  useEffect(() => {
    contracts?.PremiaErc20?.balanceOf(account)?.then((r) =>
      dispatch(setStakingBalances({ premiaBalance: r })),
    );

    contracts?.PremiaStaking?.balanceOf(account)?.then((r) =>
      dispatch(setStakingBalances({ xPremiaBalance: r })),
    );

    contracts?.PremiaFeeDiscount?.getStakeAmountWithBonus(account)?.then((r) =>
      dispatch(setStakingBalances({ xPremiaStakeWithBonus: r })),
    );

    contracts?.PremiaFeeDiscount?.getDiscount(account)?.then((r) =>
      dispatch(setStakingBalances({ xPremiaFeeDiscount: r })),
    );

    if (contracts?.PremiaStaking) {
      contracts?.PremiaErc20?.balanceOf(contracts?.PremiaStaking.address).then(
        (r) => dispatch(setStakingBalances({ totalPremiaStaked: r })),
      );
    }

    contracts?.PremiaStaking?.balanceOf(account).then((r) =>
      dispatch(setStakingBalances({ premiaStaked: r })),
    );

    contracts?.PremiaFeeDiscount?.userInfo(account).then((r) =>
      dispatch(
        setStakingBalances({
          xPremiaLocked: r.balance,
          xPremiaLockedUntil: r.lockedUntil,
        }),
      ),
    );

    contracts?.PremiaStaking?.totalSupply().then((r) =>
      dispatch(setStakingBalances({ xPremiaSupply: r })),
    );
  }, [contracts, dispatch, latestBlockNumber, account]);

  useEffect(() => {
    if (xPremiaSupply.eq(0)) return;

    const underlyingPremia = xPremiaBalance
      .add(xPremiaLocked)
      .mul(totalPremiaStaked)
      .div(xPremiaSupply);

    dispatch(setStakingBalances({ underlyingPremia }));
  }, [
    dispatch,
    xPremiaBalance,
    xPremiaLocked,
    totalPremiaStaked,
    xPremiaSupply,
  ]);

  return null;
}
