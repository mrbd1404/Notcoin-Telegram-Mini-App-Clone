import React from 'react';
import { bear, coin } from '../images';
import { formatNumber, REFERRAL_THRESHOLD, REFERRAL_REWARD } from '../utils/notcoin';

interface ReferralSystemProps {
  referralCount: number;
  onAddReferral: () => void;
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({ referralCount, onAddReferral }) => {
  const completedGroups = Math.floor(referralCount / REFERRAL_THRESHOLD);
  const currentGroupProgress = referralCount % REFERRAL_THRESHOLD;
  const progressPercentage = (currentGroupProgress / REFERRAL_THRESHOLD) * 100;
  const referralsNeeded = REFERRAL_THRESHOLD - currentGroupProgress;

  return (
    <div className="bg-[#1f1f1f] rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <img src={bear} width={24} height={24} alt="Referrals" />
          <span className="ml-2 text-blue-400 font-bold">Referral System</span>
        </div>
        <button
          onClick={onAddReferral}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Add Friend
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{formatNumber(referralCount)}</div>
          <div className="text-sm text-gray-300">Total Referrals</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">{formatNumber(completedGroups * REFERRAL_REWARD)}</div>
          <div className="text-sm text-gray-300">Bonus Earned</div>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-300">
            Next bonus: {referralsNeeded} more referrals
          </span>
          <div className="flex items-center">
            <span className="text-yellow-400 font-bold">+{REFERRAL_REWARD}</span>
            <img src={coin} width={16} height={16} alt="NotCoin" className="ml-1" />
          </div>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="text-xs text-gray-400 mt-1">
          {currentGroupProgress}/{REFERRAL_THRESHOLD} referrals in current group
        </div>
      </div>

      <div className="text-xs text-gray-400 text-center">
        Invite friends and earn {REFERRAL_REWARD} NotCoins for every {REFERRAL_THRESHOLD} successful referrals!
      </div>
    </div>
  );
};

export default ReferralSystem;