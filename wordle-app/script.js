class WordleGame {
    constructor() {
        // Fallback words in case API fails
        this.fallbackWords = [
            'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN',
            'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIEN', 'ALIGN', 'ALIKE', 'ALIVE',
            'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE',
            'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AVOID', 'AWAKE', 'AWARD',
            'AWARE', 'BADLY', 'BAKER', 'BASES', 'BASIC', 'BEACH', 'BEGAN', 'BEGIN', 'BEING', 'BELOW',
            'BENCH', 'BIRTH', 'BLACK', 'BLAME', 'BLANK', 'BLIND', 'BLOCK', 'BLOOD', 'BOARD', 'BOOST',
            'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRAVE', 'BREAD', 'BREAK', 'BREED', 'BRIEF', 'BRING',
            'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BURST', 'BUYER', 'CABLE', 'CARRY', 'CATCH', 'CAUSE',
            'CHAIN', 'CHAIR', 'CHAOS', 'CHARM', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHEST', 'CHIEF',
            'CHILD', 'CHINA', 'CHOSE', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLIMB',
            'CLOCK', 'CLOSE', 'CLOUD', 'COACH', 'COAST', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT',
            'CRASH', 'CRAZY', 'CREAM', 'CRIME', 'CROSS', 'CROWD', 'CROWN', 'CRUDE', 'CURVE', 'CYCLE',
            'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DELAY', 'DEPTH', 'DOING', 'DOUBT',
            'DOZEN', 'DRAFT', 'DRAMA', 'DRANK', 'DRAWN', 'DREAM', 'DRESS', 'DRILL', 'DRINK', 'DRIVE',
            'DROVE', 'DYING', 'EAGER', 'EARLY', 'EARTH', 'EIGHT', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY',
            'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH',
            'FALSE', 'FAULT', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY', 'FIGHT', 'FINAL', 'FIRST', 'FIXED',
            'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS', 'FORCE', 'FORTH', 'FORTY', 'FORUM', 'FOUND',
            'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FRUIT', 'FULLY', 'FUNNY', 'GIANT', 'GIVEN',
            'GLASS', 'GLOBE', 'GOING', 'GRACE', 'GRADE', 'GRAND', 'GRANT', 'GRASS', 'GRAVE', 'GREAT',
            'GREEN', 'GROSS', 'GROUP', 'GROWN', 'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'HAPPY', 'HEART',
            'HEAVY', 'HENCE', 'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'INDEX', 'INNER',
            'INPUT', 'ISSUE', 'JOINT', 'JUDGE', 'KNOWN', 'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH',
            'LAYER', 'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LIGHT', 'LIMIT', 'LINKS',
            'LIVES', 'LOCAL', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH', 'LYING', 'MAGIC', 'MAJOR', 'MAKER',
            'MARCH', 'MATCH', 'MAYBE', 'MAYOR', 'MEANT', 'MEDIA', 'METAL', 'MIGHT', 'MINOR', 'MINUS',
            'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVED',
            'MOVIE', 'MUSIC', 'NEEDS', 'NEVER', 'NEWLY', 'NIGHT', 'NOISE', 'NORTH', 'NOTED', 'NOVEL',
            'NURSE', 'OCCUR', 'OCEAN', 'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'PAINT', 'PANEL',
            'PAPER', 'PARTY', 'PEACE', 'PHASE', 'PHONE', 'PHOTO', 'PIANO', 'PIECE', 'PILOT', 'PITCH',
            'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND', 'POWER', 'PRESS', 'PRICE',
            'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE', 'QUEEN', 'QUICK',
            'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH', 'READY', 'REALM',
            'REBEL', 'REFER', 'RELAX', 'REPAY', 'REPLY', 'RIGHT', 'RIGID', 'RIVAL', 'RIVER', 'ROMAN',
            'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE', 'SCENE', 'SCOPE', 'SCORE', 'SENSE',
            'SERVE', 'SETUP', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE', 'SHARP', 'SHEET', 'SHELF', 'SHELL',
            'SHIFT', 'SHINE', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT', 'SHOWN', 'SIGHT', 'SILLY', 'SINCE',
            'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP', 'SLIDE', 'SMALL', 'SMART', 'SMILE', 'SMOKE',
            'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE', 'SPARE', 'SPEAK', 'SPEED', 'SPEND',
            'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE', 'STAKE', 'STAND', 'START', 'STATE',
            'STEAM', 'STEEL', 'STICK', 'STILL', 'STOCK', 'STONE', 'STOOD', 'STORE', 'STORM', 'STORY',
            'STRIP', 'STUCK', 'STUDY', 'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE',
            'TAKEN', 'TASTE', 'TAXES', 'TEACH', 'TEAMS', 'TEETH', 'THANK', 'THEFT', 'THEIR', 'THEME',
            'THERE', 'THESE', 'THICK', 'THING', 'THINK', 'THIRD', 'THOSE', 'THREE', 'THREW', 'THROW',
            'THUMB', 'TIGER', 'TIGHT', 'TIMER', 'TIMES', 'TIRED', 'TITLE', 'TODAY', 'TOPIC', 'TOTAL',
            'TOUCH', 'TOUGH', 'TOWER', 'TRACK', 'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIBE',
            'TRICK', 'TRIED', 'TRIES', 'TRUCK', 'TRULY', 'TRUNK', 'TRUST', 'TRUTH', 'TWICE', 'TWIST',
            'UNDER', 'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USUAL', 'VALUE',
            'VIDEO', 'VIRUS', 'VISIT', 'VITAL', 'VOCAL', 'VOICE', 'WASTE', 'WATCH', 'WATER', 'WHEEL',
            'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WOMEN', 'WORLD', 'WORRY',
            'WORSE', 'WORST', 'WORTH', 'WOULD', 'WRITE', 'WRONG', 'WROTE', 'YIELD', 'YOUNG', 'YOUTH'
        ];
          this.words = [...this.fallbackWords]; // Start with fallback words
        this.apiWords = []; // Store words from API
        
        this.currentWord = '';
        this.currentGuess = '';
        this.currentRow = 0;
        this.gameComplete = false;
        this.score = 0;
        this.currentRound = 1;
        this.wordsGuessed = 0;
        
        this.gameBoard = document.getElementById('gameBoard');
        this.keyboard = document.getElementById('keyboard');
        this.message = document.getElementById('message');        this.scoreElement = document.getElementById('score');
        this.currentRoundElement = document.getElementById('currentRound');
        this.wordsGuessedElement = document.getElementById('wordsGuessed');
        this.statusIndicator = document.getElementById('statusIndicator');
        this.statusText = document.getElementById('statusText');
        
        this.updateAPIStatus('loading', 'Loading words from API...');
        this.loadWordsFromAPI();
        this.initializeGame();
        this.createKeyboard();
        this.addEventListeners();    }
    
    updateAPIStatus(status, text) {
        const indicators = {
            loading: '⏳',
            online: '🌐',
            offline: '📚'
        };
        
        this.statusIndicator.textContent = indicators[status] || '❓';
        this.statusText.textContent = text;
    }
      async loadWordsFromAPI() {
        try {
            this.updateAPIStatus('loading', 'Fetching words from API...');
            
            // Use a word list API that provides random 5-letter words
            const response = await fetch('https://api.datamuse.com/words?sp=?????&max=1000');
            const data = await response.json();
            
            // Filter and format the words
            const apiWords = data
                .map(item => item.word.toUpperCase())
                .filter(word => 
                    word.length === 5 && 
                    /^[A-Z]+$/.test(word) && // Only letters
                    !word.includes('-') && 
                    !word.includes(' ')
                );
            
            if (apiWords.length > 0) {
                this.apiWords = apiWords;
                this.words = [...this.fallbackWords, ...apiWords];
                console.log(`Loaded ${apiWords.length} words from API`);
                this.updateAPIStatus('online', `${apiWords.length} fresh words loaded!`);
                this.showMessage(`Loaded ${apiWords.length} fresh words from API!`, 'success');
            } else {
                throw new Error('No valid words received from API');
            }
        } catch (error) {
            console.warn('Failed to load words from API, using fallback words:', error);
            this.updateAPIStatus('offline', 'Using offline word list');
            this.showMessage('Using offline word list', 'info');
        }
    }
    
    async validateWordWithAPI(word) {
        try {
            // Use Free Dictionary API to validate if it's a real word
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
            return response.ok;
        } catch (error) {
            console.warn('API validation failed, using fallback validation:', error);
            return this.words.includes(word);
        }
    }
    
    initializeGame() {
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        console.log('Target word:', this.currentWord); // For debugging
        
        this.currentGuess = '';
        this.currentRow = 0;
        this.gameComplete = false;
        
        this.createGameBoard();
        this.updateDisplay();
        this.resetKeyboard();
        this.showMessage('New round started! Guess the 5-letter word.', 'info');
    }
    
    createGameBoard() {
        this.gameBoard.innerHTML = '';
        
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            
            for (let j = 0; j < 5; j++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.id = `tile-${i}-${j}`;
                row.appendChild(tile);
            }
            
            this.gameBoard.appendChild(row);
        }
    }
    
    createKeyboard() {
        const keys = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
        ];
        
        this.keyboard.innerHTML = '';
        
        keys.forEach(row => {
            const keyboardRow = document.createElement('div');
            keyboardRow.className = 'keyboard-row';
            
            row.forEach(key => {
                const keyElement = document.createElement('button');
                keyElement.className = 'key';
                keyElement.textContent = key === 'BACKSPACE' ? '⌫' : key;
                keyElement.dataset.key = key;
                
                if (key === 'ENTER' || key === 'BACKSPACE') {
                    keyElement.classList.add('wide');
                }
                
                keyElement.addEventListener('click', () => this.handleKeyPress(key));
                keyboardRow.appendChild(keyElement);
            });
            
            this.keyboard.appendChild(keyboardRow);
        });
    }
    
    addEventListeners() {
        document.addEventListener('keydown', (e) => {
            const key = e.key.toUpperCase();
            
            if (key === 'ENTER') {
                this.handleKeyPress('ENTER');
            } else if (key === 'BACKSPACE') {
                this.handleKeyPress('BACKSPACE');
            } else if (key.match(/^[A-Z]$/)) {
                this.handleKeyPress(key);
            }
        });
    }
    
    handleKeyPress(key) {
        if (this.gameComplete) return;
        
        if (key === 'ENTER') {
            this.submitGuess();
        } else if (key === 'BACKSPACE') {
            this.deleteLetter();
        } else if (this.currentGuess.length < 5) {
            this.addLetter(key);
        }
    }
    
    addLetter(letter) {
        if (this.currentGuess.length < 5) {
            this.currentGuess += letter;
            this.updateCurrentRow();
        }
    }
    
    deleteLetter() {
        if (this.currentGuess.length > 0) {
            this.currentGuess = this.currentGuess.slice(0, -1);
            this.updateCurrentRow();
        }
    }
    
    updateCurrentRow() {
        for (let i = 0; i < 5; i++) {
            const tile = document.getElementById(`tile-${this.currentRow}-${i}`);
            if (i < this.currentGuess.length) {
                tile.textContent = this.currentGuess[i];
                tile.classList.add('filled');
            } else {
                tile.textContent = '';
                tile.classList.remove('filled');
            }
        }
    }
      async submitGuess() {
        if (this.currentGuess.length !== 5) {
            this.showMessage('Word must be 5 letters long!', 'error');
            return;
        }
        
        // Show loading message while validating
        this.showMessage('Validating word...', 'info');
        
        const isValidWord = await this.validateWordWithAPI(this.currentGuess);
        
        if (!isValidWord) {
            this.showMessage('Not a valid word!', 'error');
            return;
        }
        
        this.evaluateGuess();
        this.updateScore();
        
        if (this.currentGuess === this.currentWord) {
            this.gameComplete = true;
            this.wordsGuessed++;
            this.showMessage('Congratulations! You guessed it!', 'success');
            setTimeout(() => this.startNewRound(), 2000);
        } else if (this.currentRow === 5) {
            this.gameComplete = true;
            this.showMessage(`Game Over! The word was: ${this.currentWord}`, 'error');
            setTimeout(() => this.startNewRound(), 3000);
        } else {
            this.currentRow++;
            this.currentGuess = '';
        }
    }
    
    evaluateGuess() {
        const guess = this.currentGuess;
        const target = this.currentWord;
        const result = [];
        const targetLetters = target.split('');
        const guessLetters = guess.split('');
        
        // First pass: check for correct positions
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] === targetLetters[i]) {
                result[i] = 'correct';
                targetLetters[i] = null;
                guessLetters[i] = null;
            }
        }
        
        // Second pass: check for wrong positions
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] !== null) {
                const targetIndex = targetLetters.indexOf(guessLetters[i]);
                if (targetIndex !== -1) {
                    result[i] = 'present';
                    targetLetters[targetIndex] = null;
                } else {
                    result[i] = 'absent';
                }
            }
        }
        
        // Update tiles
        for (let i = 0; i < 5; i++) {
            const tile = document.getElementById(`tile-${this.currentRow}-${i}`);
            setTimeout(() => {
                tile.classList.add(result[i]);
            }, i * 100);
        }
        
        // Update keyboard
        for (let i = 0; i < 5; i++) {
            const letter = guess[i];
            const keyElement = document.querySelector(`[data-key="${letter}"]`);
            if (keyElement) {
                setTimeout(() => {
                    const currentClass = keyElement.className;
                    if (result[i] === 'correct' || 
                        (result[i] === 'present' && !currentClass.includes('correct')) ||
                        (result[i] === 'absent' && !currentClass.includes('correct') && !currentClass.includes('present'))) {
                        keyElement.classList.remove('correct', 'present', 'absent');
                        keyElement.classList.add(result[i]);
                    }
                }, i * 100);
            }
        }
    }
    
    updateScore() {
        this.score += 10; // Award 10 points for each guess
        this.scoreElement.textContent = this.score;
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.currentRoundElement.textContent = this.currentRound;
        this.wordsGuessedElement.textContent = this.wordsGuessed;
    }
      async startNewRound() {
        this.currentRound++;
        
        // Try to get a fresh word from API every few rounds
        if (this.currentRound % 3 === 0) {
            await this.loadFreshWord();
        }
        
        this.initializeGame();
    }
    
    async loadFreshWord() {
        try {
            // Try to get a random word from another API
            const response = await fetch('https://random-words-api.vercel.app/word');
            const data = await response.json();
            
            if (data[0] && data[0].word && data[0].word.length === 5) {
                const newWord = data[0].word.toUpperCase();
                if (/^[A-Z]+$/.test(newWord)) {
                    // Add to our word list if it's not already there
                    if (!this.words.includes(newWord)) {
                        this.words.push(newWord);
                        console.log('Added fresh word from API:', newWord);
                    }
                }
            }
        } catch (error) {
            console.warn('Failed to load fresh word from API:', error);
        }
    }
    
    resetKeyboard() {
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            key.classList.remove('correct', 'present', 'absent');
        });
    }
    
    showMessage(text, type) {
        this.message.textContent = text;
        this.message.className = `message ${type} show`;
        
        setTimeout(() => {
            this.message.classList.remove('show');
        }, 3000);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new WordleGame();
});
