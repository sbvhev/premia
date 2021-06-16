import { get } from 'lodash';
import { utils } from 'ethers';

import { useWeb3 } from 'state/application/hooks';
import { useTransact } from 'hooks';

export function useClaimMerkle(
  merkleRoot: any,
  airdropId: number,
  amount: number = 1,
  description = 'Claiming airdrop',
) {
  const { account, signer, contracts } = useWeb3();
  const transact = useTransact();
  const formattedAddr = account === '' ? account : utils.getAddress(account);

  const index = get(merkleRoot, `claims.${formattedAddr}.index`);
  const merkleProof = get(merkleRoot, `claims.${formattedAddr}.proof`);

  if (!contracts) return;

  const useClaimMerkle = () =>
    transact(
      contracts.TradingCompetitionMerkle?.connect(signer!).claim(
        airdropId,
        index,
        formattedAddr,
        amount,
        merkleProof,
      ),
      {
        closeOnSuccess: true,
        option: null,
        description,
      },
    );

  return useClaimMerkle;
}
