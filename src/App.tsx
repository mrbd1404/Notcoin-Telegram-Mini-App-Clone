import { useEffect, useState } from 'react';
import './index.css';
import Arrow from './icons/Arrow';
import { bear, coin, highVoltage, notcoin, rocket, trophy } from './images';
import { UserData, ClickAnimation } from './utils/types';
import { loadUserData, saveUserData, saveWithdrawal } from './utils/storage';
import { updateUserDataAfterTap, processWithdrawal, addReferral, formatNumber } from './utils/notcoin';
import NotCoinDisplay from './components/NotCoinDisplay';
import WithdrawalModal from './components/WithdrawalModal';
import ReferralSystem from './components/ReferralSystem';

const App = () => {
  const [userData, setUserData] = useState<UserData>(loadUserData());
  const [clicks, setClicks] = useState<ClickAnimation[]>([]);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  const pointsToAdd = 12;
  const energyToReduce = 12;

  // Save userData whenever it changes
  useEffect(() => {
    saveUserData(userData);
  }, [userData]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (userData.energy - energyToReduce < 0) {
      return;
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update userData with new tap
    const updatedUserData = updateUserDataAfterTap(userData);
    
    setUserData(prev => ({
      ...updatedUserData,
      points: prev.points + pointsToAdd,
      energy: prev.energy - energyToReduce < 0 ? 0 : prev.energy - energyToReduce
    }));
    
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  const handleWithdrawal = (amount: number) => {
    try {
      const updatedUserData = processWithdrawal(userData, amount);
      setUserData(updatedUserData);
      
      // Save withdrawal history
      saveWithdrawal({
        date: new Date(),
        amount
      });
      
      // Show success message (you could add a toast notification here)
      alert(`Successfully withdrew ${formatNumber(amount)} NotCoins!`);
    } catch (error) {
      alert('Withdrawal failed. Please try again.');
    }
  };

  const handleAddReferral = () => {
    const updatedUserData = addReferral(userData);
    setUserData(updatedUserData);
    alert('New referral added! +1 to your count.');
  };

  // useEffect hook to restore energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setUserData(prev => ({
        ...prev,
        energy: Math.min(prev.energy + 1, 6500)
      }));
    }, 100); // Restore 1 energy point every 100ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
        {/* Header */}
        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
          <div className="w-full cursor-pointer">
            <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
              <p className="text-lg">Join squad <Arrow size={18} className="ml-0 mb-1 inline-block" /></p>
            </div>
          </div>
          <div className="mt-12 text-5xl font-bold flex items-center">
            <img src={coin} width={44} height={44} />
            <span className="ml-2">{formatNumber(userData.points)}</span>
          </div>
          <div className="text-base mt-2 flex items-center">
            <img src={trophy} width={24} height={24} />
            <span className="ml-1">Gold <Arrow size={18} className="ml-0 mb-1 inline-block" /></span>
          </div>
          
          {/* Stats Toggle */}
          <button
            onClick={() => setShowStats(!showStats)}
            className="mt-4 bg-[#1f1f1f] px-4 py-2 rounded-lg text-sm hover:bg-[#2f2f2f] transition"
          >
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
        </div>

        {/* Stats Panel */}
        {showStats && (
          <div className="fixed top-44 left-0 w-full px-4 z-10 max-h-96 overflow-y-auto">
            <NotCoinDisplay 
              notCoins={userData.notCoins} 
              totalTaps={userData.totalTaps} 
            />
            <ReferralSystem 
              referralCount={userData.referralCount}
              onAddReferral={handleAddReferral}
            />
            
            {/* Withdrawal Button */}
            {userData.canWithdraw && (
              <button
                onClick={() => setShowWithdrawalModal(true)}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold text-lg mb-4 transition"
              >
                Withdraw NotCoins ({formatNumber(userData.notCoins)} available)
              </button>
            )}
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <div className="w-full flex justify-between gap-2">
            <div className="w-1/3 flex items-center justify-start max-w-32">
              <div className="flex items-center justify-center">
                <img src={highVoltage} width={44} height={44} alt="High Voltage" />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">{userData.energy}</span>
                  <span className="text-white text-large opacity-75">/ 6500</span>
                </div>
              </div>
            </div>
            <div className="flex-grow flex items-center max-w-60 text-sm">
              <div className="w-full bg-[#fad258] py-4 rounded-2xl flex justify-around">
                <button 
                  className="flex flex-col items-center gap-1"
                  onClick={() => setShowStats(!showStats)}
                >
                  <img src={bear} width={24} height={24} alt="Friends" />
                  <span>Frens</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button 
                  className="flex flex-col items-center gap-1"
                  onClick={() => setShowWithdrawalModal(userData.canWithdraw)}
                >
                  <img src={coin} width={24} height={24} alt="Earn" />
                  <span>Earn</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1">
                  <img src={rocket} width={24} height={24} alt="Boosts" />
                  <span>Boosts</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#f9c035] rounded-full mt-4">
            <div 
              className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full transition-all duration-300" 
              style={{ width: `${(userData.energy / 6500) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Coin Area */}
        <div className="flex-grow flex items-center justify-center">
          <div className="relative mt-4" onClick={handleClick}>
            <img src={notcoin} width={256} height={256} alt="notcoin" />
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0"
                style={{
                  top: `${click.y - 42}px`,
                  left: `${click.x - 28}px`,
                  animation: `float 1s ease-out`
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                +{pointsToAdd}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info Display */}
        <div className="fixed top-4 right-4 z-20 text-right">
          <div className="bg-black bg-opacity-50 rounded-lg p-2 text-xs">
            <div className="text-yellow-400">NotCoins: {formatNumber(userData.notCoins)}</div>
            <div className="text-blue-400">Taps: {formatNumber(userData.totalTaps)}</div>
            <div className="text-green-400">Referrals: {userData.referralCount}</div>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      <WithdrawalModal
        isOpen={showWithdrawalModal}
        onClose={() => setShowWithdrawalModal(false)}
        userData={userData}
        onWithdraw={handleWithdrawal}
      />
    </div>
  );
};

export default App;
