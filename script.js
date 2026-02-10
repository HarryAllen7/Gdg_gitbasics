class CoinFlipper {
    constructor() {
        this.coin = document.getElementById('coin');
        this.flipBtn = document.getElementById('flipBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.resultDisplay = document.getElementById('result');
        this.totalFlipsDisplay = document.getElementById('totalFlips');
        this.headsCountDisplay = document.getElementById('headsCount');
        this.tailsCountDisplay = document.getElementById('tailsCount');

        this.stats = {
            total: 0,
            heads: 0,
            tails: 0
        };

        this.isFlipping = false;

        this.loadStats();
        this.initEventListeners();
    }

    initEventListeners() {
        this.flipBtn.addEventListener('click', () => this.flip());
        this.resetBtn.addEventListener('click', () => this.resetStats());
    }

    flip() {
        if (this.isFlipping) return;

        this.isFlipping = true;
        this.flipBtn.disabled = true;
        this.resultDisplay.textContent = 'Flipping...';

        // Generate a random result (0 = heads, 1 = tails)
        const result = Math.random() < 0.5 ? 0 : 1;

        // Final rotation angle (heads = 0deg, tails = 180deg, plus full rotations)
        const finalRotation = result === 0 ? 0 : 180;
        const totalRotation = 1800 + finalRotation; // 5 full rotations + final angle

        // Apply CSS custom property for animation
        this.coin.style.setProperty('--final-rotation', `${totalRotation}deg`);
        this.coin.classList.add('flipping');

        // After animation completes
        setTimeout(() => {
            this.coin.classList.remove('flipping');
            this.coin.style.transform = `rotateY(${finalRotation}deg)`;
            this.displayResult(result);
            this.updateStats(result);
            this.isFlipping = false;
            this.flipBtn.disabled = false;
        }, 1500);
    }

    displayResult(result) {
        const resultText = result === 0 ? 'HEADS' : 'TAILS';
        this.resultDisplay.textContent = `You got ${resultText}!`;
        this.resultDisplay.classList.add('show');
        
        setTimeout(() => {
            this.resultDisplay.classList.remove('show');
        }, 300);
    }

    updateStats(result) {
        this.stats.total++;
        if (result === 0) {
            this.stats.heads++;
        } else {
            this.stats.tails++;
        }
        this.displayStats();
        this.saveStats();
    }

    displayStats() {
        this.totalFlipsDisplay.textContent = this.stats.total;
        this.headsCountDisplay.textContent = this.stats.heads;
        this.tailsCountDisplay.textContent = this.stats.tails;
    }

    saveStats() {
        localStorage.setItem('coinFlipStats', JSON.stringify(this.stats));
    }

    loadStats() {
        const saved = localStorage.getItem('coinFlipStats');
        if (saved) {
            this.stats = JSON.parse(saved);
            this.displayStats();
        }
    }

    resetStats() {
        if (confirm('Are you sure you want to reset all statistics?')) {
            this.stats = {
                total: 0,
                heads: 0,
                tails: 0
            };
            this.displayStats();
            this.saveStats();
            this.resultDisplay.textContent = 'Stats reset! Ready to flip again.';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CoinFlipper();
});
