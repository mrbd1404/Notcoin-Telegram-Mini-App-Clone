export type IconProps = {
    size?: number;
    className?: string;
}

export type UserData = {
    points: number;
    notCoins: number;
    totalTaps: number;
    energy: number;
    lastWithdrawalDate: Date | null;
    referralCount: number;
    canWithdraw: boolean;
}

export type WithdrawalHistory = {
    date: Date;
    amount: number;
}

export type ClickAnimation = {
    id: number;
    x: number;
    y: number;
}