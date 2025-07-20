import React, { useState } from 'react';
import { UserData } from '../utils/types';
import { MIN_WITHDRAWAL_AMOUNT, formatNumber } from '../utils/notcoin';
import { canUserWithdraw } from '../utils/storage';
import { coin } from '../images';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
  onWithdraw: (amount: number) => void;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({ 
  isOpen, 
  onClose, 
  userData, 
  onWithdraw 
}) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const canWithdraw = canUserWithdraw(userData.lastWithdrawalDate);
  const hasMinAmount = userData.notCoins >= MIN_WITHDRAWAL_AMOUNT;

  const handleWithdraw = () => {
    const withdrawAmount = parseInt(amount);
    
    if (!withdrawAmount || withdrawAmount < MIN_WITHDRAWAL_AMOUNT) {
      setError(`Minimum withdrawal amount is ${formatNumber(MIN_WITHDRAWAL_AMOUNT)} NotCoins`);
      return;
    }
    
    if (withdrawAmount > userData.notCoins) {
      setError('Insufficient NotCoin balance');
      return;
    }
    
    if (!canWithdraw) {
      setError('You can only withdraw once per week');
      return;
    }
    
    try {
      onWithdraw(withdrawAmount);
      setAmount('');
      setError('');
      onClose();
    } catch (err) {
      setError('Withdrawal failed. Please try again.');
    }
  };

  const getNextWithdrawalDate = () => {
    if (!userData.lastWithdrawalDate) return null;
    const nextDate = new Date(userData.lastWithdrawalDate);
    nextDate.setDate(nextDate.getDate() + 7);
    return nextDate;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-[#1f1f1f] rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Withdraw NotCoins</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-4">
            <img src={coin} width={24} height={24} alt="NotCoin" />
            <span className="ml-2 text-white">Available Balance:</span>
            <span className="ml-2 text-yellow-400 font-bold">
              {formatNumber(userData.notCoins)} NotCoins
            </span>
          </div>

          {!hasMinAmount && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded p-3 mb-4">
              <p className="text-red-300 text-sm">
                You need at least {formatNumber(MIN_WITHDRAWAL_AMOUNT)} NotCoins to withdraw
              </p>
            </div>
          )}

          {!canWithdraw && (
            <div className="bg-orange-500 bg-opacity-20 border border-orange-500 rounded p-3 mb-4">
              <p className="text-orange-300 text-sm">
                Next withdrawal available: {getNextWithdrawalDate()?.toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {hasMinAmount && canWithdraw && (
          <>
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">
                Withdrawal Amount (NotCoins)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError('');
                }}
                placeholder={`Min: ${formatNumber(MIN_WITHDRAWAL_AMOUNT)}`}
                className="w-full bg-gray-700 text-white rounded p-3 border border-gray-600 focus:border-yellow-400 focus:outline-none"
                min={MIN_WITHDRAWAL_AMOUNT}
                max={userData.notCoins}
              />
            </div>

            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded p-3 mb-4">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-medium transition"
              >
                Withdraw
              </button>
            </div>
          </>
        )}

        {(!hasMinAmount || !canWithdraw) && (
          <button
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default WithdrawalModal;