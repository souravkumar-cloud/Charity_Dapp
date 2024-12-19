let totalDonated = 0;
        const transactions = [];

        function generateEncryptedCode() {
            return Math.random().toString(36).substring(2, 15);
        }

        function updateTransactionLog() {
            const transactionList = document.getElementById('transactionList');
            transactionList.innerHTML = '';
            
            transactions.slice(-5).reverse().forEach(transaction => {
                const transactionItem = document.createElement('div');
                transactionItem.classList.add('transaction-item');
                transactionItem.innerHTML = `
                    <span class="cause">${transaction.cause}</span>
                    <div class="transaction-details">
                        <span class="amount">$${transaction.amount.toFixed(2)}</span>
                        <span class="transaction-id">TX: ${transaction.code}</span>
                    </div>
                `;
                transactionList.appendChild(transactionItem);
            });
        }

        function showLoading() {
            document.getElementById('loadingOverlay').classList.add('active');
        }
        
        function hideLoading() {
            document.getElementById('loadingOverlay').classList.remove('active');
        }
        
        function showThankYouModal(amount, cause, transactionCode) {
            const modal = document.getElementById('thankYouModal');
            const message = document.getElementById('modalMessage');
            const codeElement = document.getElementById('transactionCode');
            
            message.textContent = `Your donation of $${amount.toFixed(2)} to the ${cause} cause has been processed successfully. This money will help a lot of people in need. `;
            codeElement.textContent = `Transaction Code: ${transactionCode}`;
            
            modal.classList.add('active');
        }
        
        function closeModal() {
            document.getElementById('thankYouModal').classList.remove('active');
        }
        
        // Update the donate function
        function donate() {
            const amount = document.getElementById('donationAmount').value;
            const cause = document.getElementById('causeSelect').value;
            
            if (amount && cause) {
                const donationAmount = parseFloat(amount);
                
                if (donationAmount < 0.01) {
                    alert('Minimum donation amount is $0.01');
                    return;
                }
        
                showLoading();
        
                // Simulate processing time
                setTimeout(() => {
                    const encryptedCode = generateEncryptedCode();
                    
                    totalDonated += donationAmount;
                    document.getElementById('totalDonated').innerText = `Total Donated: $${totalDonated.toFixed(2)}`;
                    
                    transactions.push({
                        cause: cause,
                        amount: donationAmount,
                        code: encryptedCode
                    });
                    
                    updateTransactionLog();
                    hideLoading();
                    showThankYouModal(donationAmount, cause, encryptedCode);
                    
                    document.getElementById('donationAmount').value = '';
                    document.getElementById('causeSelect').selectedIndex = 0;
                }, 1500); // 1.5 second delay to simulate processing
            } else {
                alert('Please enter a valid amount and select a cause.');
            }
        }
        
        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('thankYouModal');
            if (event.target === modal) {
                closeModal();
            }
        }
        