class GameLogic {
    constructor() {
        this.outOfNumber = 10;
    }

    generateAiChoice() {
        let randomNumber = Math.floor(Math.random() * 3);

        if (randomNumber === 0) return 'rock'
        if (randomNumber === 1) return 'paper'
        return 'scissors'
    }

    compareChoices(userChoice) {
        let aiChoice = this.generateAiChoice();
        let resultStats = {
            userWins: false,
            aiWins: false,
            outcomeMessage: ''
        };
        
        switch (userChoice + aiChoice) {
            case 'rockscissors':
            case 'paperrock':
            case 'scissorspaper':
                resultStats.userWins = true;
                resultStats.outcomeMessage = 'You won this one! A.I. is motivated to win! Go again!';
                break;
            case 'rockpaper':
            case 'paperscissors':
            case 'scissorsrock':
                resultStats.aiWins = true;
                resultStats.outcomeMessage = 'You lost this one! Wipe your tears and go again!';
                break;
            default:
                resultStats.outcomeMessage = 'Draw! Someone has to win eventually! Go!';
                break;
        }

        return resultStats;
    }
}

class UI {
    constructor() {
        this.gameLogic = new GameLogic();
        this.userScore = 0;
        this.aiScore = 0;
        this.numberOfPointsToWin_h2 = document.getElementById('numberOfPointsToWin');
        this.scoreBoard_div = document.getElementById('scoreBoard');
        this.userScore_span = document.getElementById('userScore');
        this.aiScore_span = document.getElementById('aiScore');
        this.result_p = document.getElementById('result');
        this.choices_div = document.getElementById('choices');
        this.choicesArr = [
            {
                id: 0,
                name: 'rock',
                imgSrc: './img/rock.png'
            },
            {
                id: 1,
                name: 'paper',
                imgSrc: './img/paper.png'
            },
            {
                id: 2,
                name: 'scissors',
                imgSrc: './img/scissors.png'
            }
        ];
        this.outcomeOverlay_div = document.getElementById('outcomeOverlay');
    }

    initGameUI() {
        this.renderNumberOfPointsToWin();
        this.renderScore();
        this.populateChoices();

        this.choices_div.addEventListener('click', (e) => {
            this.choiceClick(e.target);
        })
        this.outcomeOverlay_div.addEventListener('click', () => {
            location.reload();
        })
    }

    renderNumberOfPointsToWin() {
        let textMarkup = `(out of ${this.gameLogic.outOfNumber})`;
        this.numberOfPointsToWin_h2.insertAdjacentHTML('beforeend', textMarkup);
    }

    renderScore() {
        this.userScore_span.textContent = this.userScore;
        this.aiScore_span.textContent = this.aiScore;
    }

    populateChoices() {
        const choices = this.choicesArr;
        choices.forEach(choice => {
            const choiceMarkup = `
            <li id="choice-${choice.id}" class="choice-item" data-name="${choice.name}">
                <img src="${choice.imgSrc}" alt="${choice.name}">
            </li>
            `;

            this.choices_div.insertAdjacentHTML('beforeend', choiceMarkup);
        })
    }

    choiceClick(clickedElement) {
        let resultStats = this.gameLogic.compareChoices(clickedElement.alt);
        const youWinMarkup = `YOU ARE THE WINNER! <br><br> A.I. looks a bit pissed off, but determined and wants to play again! <br> Wanna try ?`;
        const aiWinsMarkup = `A.I. IS THE WINNER! <br><br> You are a bit pissed off, aren\'t ya ? <br> Don\'t be a baby! <br> Wanna try again ? May be you\'d win this time!`;
        const animationDuration = 300;

        this.result_p.textContent = resultStats.outcomeMessage;

        if (resultStats.userWins) {
            this.userScore_span.textContent++;
            clickedElement.parentElement.classList.add('won');
            setTimeout(() => {
                clickedElement.parentElement.classList.remove('won');
            }, animationDuration);
        }
        else if (resultStats.aiWins) {
            this.aiScore_span.textContent++;
            clickedElement.parentElement.classList.add('lost');
            setTimeout(() => {
                clickedElement.parentElement.classList.remove('lost');
            }, animationDuration);
        }
        else {
            clickedElement.parentElement.classList.add('draw');
            setTimeout(() => {
                clickedElement.parentElement.classList.remove('draw');
            }, animationDuration);
        }

        if (+this.userScore_span.textContent === this.gameLogic.outOfNumber) {
            this.outcomeOverlay_div.style.display = 'flex';
            this.outcomeOverlay_div.insertAdjacentHTML('beforeend', youWinMarkup);
        }
        if (+this.aiScore_span.textContent === this.gameLogic.outOfNumber) {
            this.outcomeOverlay_div.style.display = 'flex';
            this.outcomeOverlay_div.insertAdjacentHTML('beforeend', aiWinsMarkup);
        }
    }
}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.initGameUI();
});