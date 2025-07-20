import { UserData, WithdrawalHistory } from './types';

const STORAGE_KEYS = {
  USER_DATA: 'notcoin_user_data',
  WITHDRAWAL_HISTORY: 'notcoin_withdrawal_history'
};

const defaultUserData: UserData = {
  points: 29857775,
  notCoins: 0,
  totalTaps: 0,
  energy: 2532,
  lastWithdrawalDate: null,
  referralCount: 0,
  canWithdraw: false
};

export const loadUserData = (): UserData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        lastWithdrawalDate: parsed.lastWithdrawalDate ? new Date(parsed.lastWithdrawalDate) : null
      };
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }
  return defaultUserData;
};

export const saveUserData = (userData: UserData): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const loadWithdrawalHistory = (): WithdrawalHistory[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.WITHDRAWAL_HISTORY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((item: any) => ({
        ...item,
        date: new Date(item.date)
      }));
    }
  } catch (error) {
    console.error('Error loading withdrawal history:', error);
  }
  return [];
};

export const saveWithdrawal = (withdrawal: WithdrawalHistory): void => {
  try {
    const history = loadWithdrawalHistory();
    history.push(withdrawal);
    localStorage.setItem(STORAGE_KEYS.WITHDRAWAL_HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving withdrawal:', error);
  }
};

export const canUserWithdraw = (lastWithdrawalDate: Date | null): boolean => {
  if (!lastWithdrawalDate) return true;
  
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  return lastWithdrawalDate < oneWeekAgo;
};