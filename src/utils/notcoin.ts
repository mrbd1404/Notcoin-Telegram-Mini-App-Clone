import { UserData } from './types';

// Constants for the NotCoin system
export const TAPS_PER_NOTCOIN_REWARD = 10000;
export const NOTCOINS_PER_REWARD = 10;
export const MIN_WITHDRAWAL_AMOUNT = 1000;
export const REFERRAL_THRESHOLD = 10;
export const REFERRAL_REWARD = 100;

export const calculateNotCoinReward = (totalTaps: number): number => {
  return Math.floor(totalTaps / TAPS_PER_NOTCOIN_REWARD) * NOTCOINS_PER_REWARD;
};

export const calculateReferralReward = (referralCount: number): number => {
  return Math.floor(referralCount / REFERRAL_THRESHOLD) * REFERRAL_REWARD;
};

export const updateUserDataAfterTap = (userData: UserData, tapsToAdd: number = 1): UserData => {
  const newTotalTaps = userData.totalTaps + tapsToAdd;
  const baseNotCoins = calculateNotCoinReward(newTotalTaps);
  const referralBonus = calculateReferralReward(userData.referralCount);
  const totalNotCoins = baseNotCoins + referralBonus;
  
  return {
    ...userData,
    totalTaps: newTotalTaps,
    notCoins: totalNotCoins,
    canWithdraw: totalNotCoins >= MIN_WITHDRAWAL_AMOUNT
  };
};

export const processWithdrawal = (userData: UserData, amount: number): UserData => {
  if (!userData.canWithdraw || userData.notCoins < amount || amount < MIN_WITHDRAWAL_AMOUNT) {
    throw new Error('Withdrawal not allowed');
  }
  
  return {
    ...userData,
    notCoins: userData.notCoins - amount,
    lastWithdrawalDate: new Date(),
    canWithdraw: (userData.notCoins - amount) >= MIN_WITHDRAWAL_AMOUNT
  };
};

export const addReferral = (userData: UserData): UserData => {
  const newReferralCount = userData.referralCount + 1;
  const referralBonus = calculateReferralReward(newReferralCount);
  const baseNotCoins = calculateNotCoinReward(userData.totalTaps);
  const totalNotCoins = baseNotCoins + referralBonus;
  
  return {
    ...userData,
    referralCount: newReferralCount,
    notCoins: totalNotCoins,
    canWithdraw: totalNotCoins >= MIN_WITHDRAWAL_AMOUNT
  };
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};