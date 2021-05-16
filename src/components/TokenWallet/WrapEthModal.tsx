import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  Paper,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';

import { useWrapEther } from 'hooks/useWrapEther';
import { useWeb3, useWrapEth } from 'state/application/hooks';

export interface WrapEthModalProps {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles(() => ({
  container: {
    width: 600,
    height: 220,
    padding: '24px 2rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  grid: {
    height: '100%',
  },

  description: {
    marginBottom: '16px',
  },

  etherInput: {
    width: '100%',
    marginBottom: '16px',
  },

  buttons: {
    width: '100%',
    justifySelf: 'flex-end',
  },

  unwrapButton: {
    marginLeft: '1rem',
  },

  closeButton: {
    marginLeft: 'auto',
  },
}));

const WrapEthModal: React.FC<WrapEthModalProps> = ({ open, onClose }) => {
  const { chainId } = useWeb3();
  const { wrapEth } = useWrapEth();
  const { register, handleSubmit } = useForm();
  const { onWrapEther, onUnwrapEther } = useWrapEther();
  const classes = useStyles();

  const handleWrap = ({ amount }: { amount: string | number }) => {
    return onWrapEther(amount).then(onClose);
  };

  const handleUnwrap = ({ amount }: { amount: string | number }) => {
    return onUnwrapEther(amount).then(onClose);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper className={classes.container}>
        <Grid container direction='row' className={classes.grid}>
          <Typography variant='body1' className={classes.description}>
            Enter an amount of ether to { wrapEth ? 'wrap' : 'unwrap' }
          </Typography>

          <FormControl className={classes.etherInput}>
            <TextField
              inputRef={register}
              label='Ether amount'
              className={classes.etherInput}
              InputProps={{
                name: 'amount',
                inputComponent: ({ inputRef, onChange, ...props }: any) => (
                  <NumberFormat
                    {...props}
                    thousandSeparator
                    getInputRef={inputRef}
                    onValueChange={(values) => {
                      onChange({
                        target: {
                          value: values.value,
                        },
                      });
                    }}
                  />
                ),
              }}
            />
          </FormControl>

          <Grid item container direction='row' className={classes.buttons}>
            {
              wrapEth ? 
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSubmit(handleWrap)}
                >
                  Wrap {chainId === 56 ? 'BNB' : 'Ether'}
                </Button>
              :
                <Button
                  variant='outlined'
                  className={classes.unwrapButton}
                  onClick={handleSubmit(handleUnwrap)}
                >
                  Unwrap {chainId === 56 ? 'BNB' : 'Ether'}
                </Button>
            }

            <Button
              color='secondary'
              variant='outlined'
              className={classes.closeButton}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default WrapEthModal;
