import { donate, getBalance } from './contract.js';

document.getElementById('donateButton').addEventListener('click', async () => {
    const amount = document.getElementById('donateAmount').value;
    try {
        await donate(amount);
        console.log('Donation successful');
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('balanceButton').addEventListener('click', async () => {
    try {
        const balance = await getBalance();
        console.log('Contract Balance:', ethers.utils.formatEther(balance));
    } catch (error) {
        console.error('Error:', error);
    }
});
