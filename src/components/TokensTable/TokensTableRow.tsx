import React from 'react';
import { TableRow, TableCell, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BigNumber } from 'ethers';

import { ZERO_ADDRESS } from '../../constants';
import { useToggleWrapEthModal, useWrapEth } from 'state/application/hooks';
import { formatCompact } from 'utils/formatNumber';
import { useApproval } from 'hooks';
import { AntSwitch } from 'components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableCell: {
      paddingLeft: 20,
    },
  }),
);

export interface TokensTableRowProps {
  token: any;
}

const TokensTableRow: React.FC<TokensTableRowProps> = ({ token }) => {
  // const { contracts } = useWeb3();
  const classes = useStyles();
  const { setWrapEthModalOpen } = useToggleWrapEthModal();
  const { setWrapEth } = useWrapEth();
  // const { approvalType } = useApprovalType();

  const toAddress = ZERO_ADDRESS;

  // const toAddress =
  //   approvalType === 'write' ?
  //     contracts.premiaOptionDai?.address as string
  //   :
  //     contracts.premiaMarket?.address as string;

  const { onApprove } = useApproval(token.address, toAddress);

  return (
    <TableRow hover tabIndex={-1} style={{ cursor: 'pointer', height: 50 }}>
      <TableCell className={classes.tableCell}>{token.symbol}</TableCell>

      <TableCell className={classes.tableCell}>{token.name}</TableCell>

      <TableCell className={classes.tableCell}>
        {token.allowance && (
          <AntSwitch
            checked={BigNumber.from(token.allowance).gt(0)}
            name='checkedC'
            onChange={() => {
              onApprove(!BigNumber.from(token.allowance).gt(0));
            }}
          />
        )}
      </TableCell>

      <TableCell className={classes.tableCell}>
        {token.balance ? formatCompact(token.balance) : 0} {token.symbol}
      </TableCell>

      <TableCell className={classes.tableCell}>
        {token.price && token.balance
          ? formatCompact(Number(token.price) * Number(token.balance))
          : 0}
      </TableCell>

      <TableCell className={classes.tableCell}>
        {token.symbol.indexOf(token.mToken) > -1 && (
          <Button
            variant='contained'
            size='small'
            color='primary'
            onClick={() => {
              setWrapEthModalOpen(true);
              setWrapEth(token.symbol === token.mToken);
            }}
          >
            {token.symbol === token.mToken
              ? `Wrap ${token.mToken}`
              : `Unwrap ${token.mToken}`}
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TokensTableRow;
