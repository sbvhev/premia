import React, { Suspense, useState } from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { Provider as StateProvider } from 'react-redux';
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import { ParallaxProvider } from 'react-scroll-parallax';

import 'react-calendar/dist/Calendar.css';
import 'animate.css/animate.css';

import { useModalOpen, useCloseModals } from './state/application/hooks';
import { ApplicationModal } from './state/application/actions';
import ApplicationUpdater from './state/application/updater';
import MulticallUpdater from './state/multicall/updater';
import UserUpdater from './state/user/updater';
import OptionsUpdater from './state/options/updater';
import TransactionsUpdater from './state/transactions/updater';
import { useIsDarkMode } from 'state/user/hooks';
import { darkTheme, lightTheme } from './theme';
import store from './state';

import { PageWithSidebar } from 'layouts';
import {
  Options,
  Stake,
  Vault,
  Positions,
  LandingPage,
  PositionGuide,
  TradingCompetition,
  Leaderboard
} from './pages';
import {
  TransactionLoadingModal,
  TransactionSuccessModal,
  TransactionCancelledModal,
  TransactionFailedModal,
  TradingCompetitionModal
} from 'components';

const graphUrls: { [chainId: number]: string } = {
  1: 'https://api.thegraph.com/subgraphs/name/premiafinance/dev',
  4: 'https://api.thegraph.com/subgraphs/name/premiafinance/dev',
  42: 'https://api.thegraph.com/subgraphs/name/premiafinance/dev',
  56: 'https://api.thegraph.com/subgraphs/name/premiafinance/dev',
};

const TopLevelModals: React.FC = () => {
  const transactionLoadingOpen = useModalOpen(
    ApplicationModal.TransactionLoading,
  );
  const transactionSuccessOpen = useModalOpen(
    ApplicationModal.TransactionSuccess,
  );
  const transactionCancelledOpen = useModalOpen(
    ApplicationModal.TransactionCancelled,
  );
  const transactionFailedOpen = useModalOpen(
    ApplicationModal.TransactionFailed,
  );

  const closeModals = useCloseModals();
  const location = useLocation();

  const tradingModalStatus = localStorage.getItem('tradingModalStatus') || 'open';
  const [ tradingModalOpen, setTradingModalOpen ] = useState(tradingModalStatus === 'open' && location.pathname !== '/');

  return (
    <>
      <TradingCompetitionModal
        open={tradingModalOpen}
        onClose={() => setTradingModalOpen(false)}
      />
      <TransactionLoadingModal
        open={transactionLoadingOpen}
        onClose={closeModals}
      />
      <TransactionSuccessModal
        open={transactionSuccessOpen}
        onClose={closeModals}
      />
      <TransactionCancelledModal
        open={transactionCancelledOpen}
        onClose={closeModals}
      />
      <TransactionFailedModal
        open={transactionFailedOpen}
        onClose={closeModals}
      />
    </>
  );
};

const StateUpdaters: React.FC = () => {
  return (
    <>
      <ApplicationUpdater />
      <MulticallUpdater />
      <UserUpdater />
      <OptionsUpdater />
      <TransactionsUpdater />
    </>
  );
};

const ThemeProvider: React.FC = ({ children }) => {
  const location = useLocation();
  const darkMode = useIsDarkMode();
  let theme = darkMode ? darkTheme : lightTheme;

  if (location.pathname.replace('/', '') === '') {
    theme = darkTheme;
  }

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

const Providers: React.FC = ({ children }) => {
  const chainId = Number(localStorage.getItem('chainId')) || 1;

  const client = new ApolloClient({
    uri: graphUrls[chainId],
    cache: new InMemoryCache(),
  });

  return (
    <ParallaxProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <StateProvider store={store}>
              <StateUpdaters />

              <ThemeProvider>
                <CssBaseline />
                <TopLevelModals />
                {children}
              </ThemeProvider>
            </StateProvider>
          </Suspense>
        </BrowserRouter>
      </ApolloProvider>
    </ParallaxProvider>
  );
};

const App: React.FC = () => {
  return (
    <Providers>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>

        <Route exact path='/positions'>
          <PageWithSidebar>
            <Positions />
          </PageWithSidebar>
        </Route>

        <Route exact path='/options'>
          <PageWithSidebar>
            <Options />
          </PageWithSidebar>
        </Route>

        <Route exact path='/trading-competition'>
          <PageWithSidebar>
            <TradingCompetition />
          </PageWithSidebar>
        </Route>

        <Route exact path='/leaderboard'>
          <PageWithSidebar>
            <Leaderboard />
          </PageWithSidebar>
        </Route>

        <Route exact path='/stake'>
          <PageWithSidebar>
            <Stake />
          </PageWithSidebar>
        </Route>

        <Route exact path='/vaults'>
          <PageWithSidebar>
            <Vault />
          </PageWithSidebar>
        </Route>

        <Route exact path='/position-guide'>
          <PageWithSidebar>
            <PositionGuide />
          </PageWithSidebar>
        </Route>

        <Route path='*'>
          <PageWithSidebar>
            <Positions />
          </PageWithSidebar>
        </Route>
      </Switch>
    </Providers>
  );
};

export default App;
