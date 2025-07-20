# NotCoin Telegram Mini App Clone - Enhanced Edition

This is an enhanced NotCoin clone with advanced reward systems, withdrawal functionality, and referral bonuses.

## 🚀 New Features

### 1. NotCoin Reward System
- **Tap-to-Earn**: For every 10,000 taps, users earn 10 NotCoins
- **Progress Tracking**: Visual progress bar showing taps until next reward
- **Persistent Storage**: All progress is saved in browser localStorage

### 2. Withdrawal System
- **Minimum Withdrawal**: Users can withdraw when they have 1,000+ NotCoins
- **Weekly Limit**: Only one withdrawal allowed per week
- **Withdrawal History**: All withdrawals are tracked and saved
- **Smart Validation**: Prevents invalid withdrawals and shows clear error messages

### 3. Referral System
- **Friend Invites**: Users can add referrals through the interface
- **Bonus Rewards**: Every 10 referrals grants 100 NotCoins bonus
- **Progress Tracking**: Visual progress showing referrals until next bonus
- **Cumulative Rewards**: Referral bonuses stack with tap rewards

### 4. Enhanced UI
- **Stats Panel**: Toggle-able panel showing NotCoin balance, progress, and referral stats
- **Real-time Updates**: All counters update in real-time as you play
- **Visual Feedback**: Progress bars and animations for better user experience
- **Info Display**: Persistent info box showing current stats

## 🎮 How to Play

1. **Tap to Earn**: Click the NotCoin in the center to earn points and progress toward NotCoin rewards
2. **Track Progress**: Click "Show Stats" to see your NotCoin balance and progress
3. **Invite Friends**: Use the referral system to add friends and earn bonus NotCoins
4. **Withdraw**: Once you have 1,000+ NotCoins, use the withdrawal feature (once per week)

## 📊 Reward Structure

- **Regular Taps**: 12 points per tap
- **NotCoin Rewards**: 10 NotCoins for every 10,000 taps
- **Referral Bonus**: 100 NotCoins for every 10 successful referrals
- **Withdrawal Threshold**: Minimum 1,000 NotCoins
- **Withdrawal Frequency**: Once per week maximum

## 🛠 Technical Features

- **Persistent Data**: All user progress saved in localStorage
- **Real-time Calculations**: Rewards calculated dynamically
- **Error Handling**: Robust error handling for withdrawals and data persistence
- **Responsive Design**: Works on mobile and desktop
- **TypeScript**: Fully typed for better development experience

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 🔧 Build

```bash
npm run build
```

Builds the app for production to the `dist` folder.

## 📝 Features in Detail

### NotCoin System
The app tracks total taps and automatically calculates NotCoin rewards. The formula is:
- Base NotCoins = Math.floor(totalTaps / 10000) * 10
- Referral Bonus = Math.floor(referralCount / 10) * 100
- Total NotCoins = Base NotCoins + Referral Bonus

### Withdrawal System
Users can withdraw NotCoins with the following rules:
- Must have at least 1,000 NotCoins
- Can only withdraw once per week
- Withdrawal amount must be between 1,000 and current balance
- All withdrawals are logged with timestamp

### Data Persistence
All user data is stored in localStorage including:
- Points and energy levels
- Total tap count
- NotCoin balance
- Referral count
- Last withdrawal date
- Withdrawal history

The app automatically saves and loads this data on each session.

---

**Built with React, TypeScript, Tailwind CSS, and Vite**

