import { useLocation } from 'react-router-dom';

import { ZERO_ADDRESS } from '../constants';

const LOCAL_STORAGE_KEY = 'pReferrer';

export function useReferrer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryValue = searchParams.get('ref');
  const localStorageValue = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (queryValue && !localStorageValue) {
    localStorage.setItem(LOCAL_STORAGE_KEY, queryValue);
  }

  return queryValue || localStorageValue || ZERO_ADDRESS;
}

export default useReferrer;
