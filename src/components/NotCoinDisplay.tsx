import React from 'react';
import { coin } from '../images';
import { formatNumber, TAPS_PER_NOTCOIN_REWARD, NOTCOINS_PER_REWARD } from '../utils/notcoin';

interface NotCoinDisplayProps {
  notCoins: number;
  totalTaps: number;
}

const NotCoinDisplay: React.FC<NotCoinDisplayProps> = ({ notCoins, totalTaps }) => {
  const tapsUntilNextReward = TAPS_PER_NOTCOIN_REWARD - (totalTaps % TAPS_PER_NOTCOIN_REWARD);
  const progressPercentage = ((totalTaps % TAPS_PER_NOTCOIN_REWARD) / TAPS_PER_NOTCOIN_REWARD) * 100;

  return (
    <div className="bg-[#1f1f1f] rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <img src={coin} width={24} height={24} alt="NotCoin" />
          <span className="ml-2 text-yellow-400 font-bold">NotCoins</span>
        </div>
        <span className="text-yellow-400 text-xl font-bold">{formatNumber(notCoins)}</span>
      </div>
      
      <div className="text-sm text-gray-300 mb-2">
        Next reward: {formatNumber(tapsUntilNextReward)} taps (+{NOTCOINS_PER_REWARD} NotCoins)
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default NotCoinDisplay;