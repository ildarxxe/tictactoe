class Game {
    maxLengthToCombination = 9;
    wins = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 5, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [3, 5, 7]
    ];
    answersX = [];
    answersO = [];
    currentPlayer = 0;

    constructor() {
        this.initGame();
        this.initEvents()
    }

    initGame() {
        this.game = document.querySelector(".game");

        this.modalWindow = document.querySelector(".modal-window");
        this.notPlayer = document.querySelector(".step");

        this.winX = document.querySelector(".winX");
        this.loseX = document.querySelector(".loseX");
        this.loseO = document.querySelector(".loseO");
        this.winO = document.querySelector(".winO");
        this.draws = document.querySelector(".draws");

        this.createCells();
        this.checkState();
        this.reset();
        this.resetStat();
    }

    initEvents() {
        this.btnOk();
        this.game.addEventListener("click", (e) => {
            this.cellClick(e)
        });
        this.notPlayer.addEventListener('click', () => {
            if (this.currentPlayer === 0) {
                this.currentPlayer = 1;
                this.notPlayer.innerHTML = "X";
            } else if (this.currentPlayer === 1) {
                this.currentPlayer = 0;
                this.notPlayer.innerHTML = "O";
            }
            this.checkState();
        });

    }

    checkState() {
        const move = document.querySelector(".currentPlayer") || null;
        if (move) {
            move.innerHTML = this.currentPlayer === 1 ? "O" : "X";
            this.notPlayer.innerHTML = this.currentPlayer === 1 ? "X" : "O";
        }
    }

    createCells() {
        for (let i = 0; i < 9; i++) {
            const item = document.createElement('div')
            item.classList.add('cell');
            item.setAttribute("data-index", `${i + 1}`);
            this.game.appendChild(item)
        }
    }

    checkWinner() {
        const winner = document.querySelector('.winner');
        for (let i = 0; i < this.wins.length; i++) {
            const winCombination = this.wins[i];
            const xWin = winCombination.every(index => this.answersX.includes(index.toString()));
            const oWin = winCombination.every(index => this.answersO.includes(index.toString()));

            if (xWin) {
                this.winX.textContent = (parseInt(this.winX.textContent) || 0) + 1;
                this.loseO.textContent = (parseInt(this.loseO.textContent) || 0) + 1;
                this.game.removeEventListener('click', this.cellClick);
                winner.innerHTML = 'Выиграл: X!';
                this.modalWindow.style.display = "block";
                return;
            }

            if (oWin) {
                this.winO.textContent = (parseInt(this.winO.textContent) || 0) + 1;
                this.loseX.textContent = (parseInt(this.loseX.textContent) || 0) + 1;
                this.game.removeEventListener('click', this.cellClick);
                winner.innerHTML = 'Выиграл: O!';
                this.modalWindow.style.display = "block";
                return;
            }
        }

        if (this.answersX.length + this.answersO.length === this.maxLengthToCombination) {
            winner.innerHTML = 'Ничья!';
            this.modalWindow.style.display = "block";
            this.draws.textContent = (parseInt(this.draws.textContent) || 0) + 1;
        }
    }

    cellClick(event) {

        const cell = event.target;

        if (cell.classList.contains("cell") && !cell.classList.contains("x") && !cell.classList.contains("o")) {
            if (this.currentPlayer === 0) {
                cell.classList.add("x");
                this.currentPlayer = 1;
                const cellIndex = cell.getAttribute('data-index');
                this.answersX.push(cellIndex);
                this.notPlayer.style.cursor = "not-allowed";
                this.notPlayer.style.pointerEvents = "none";
            } else {
                cell.classList.add("o");
                this.currentPlayer = 0;
                let cellIndex = cell.getAttribute('data-index');
                this.answersO.push(cellIndex);
                this.notPlayer.setAttribute('disabled', 'true');
                this.notPlayer.style.cursor = "not-allowed";
                this.notPlayer.style.pointerEvents = "none";
            }

            this.checkState();
            this.checkWinner();
        }
    }

    reset() {
        const resetBtn = document.querySelectorAll(".reset");
        resetBtn.forEach(btn => {
            btn.addEventListener("click", () => {
                const cells = document.querySelectorAll('.cell');
                cells.forEach(cell => {
                    cell.classList.remove("x", "o");
                });
                this.answersX = [];
                this.answersO = [];

                this.modalWindow.style.display = "none";

                this.currentPlayer = 0;
                this.notPlayer.style.cursor = "pointer";
                this.notPlayer.style.pointerEvents = "auto";
                this.checkState();

                this.game.addEventListener("click", (e) => {
                    this.cellClick(e)
                });
            });
        });
    }

    resetStat() {
        const resetStat = document.querySelector(".reset-stat");
        resetStat.addEventListener("click", () => {
            this.winX.textContent = 0;
            this.loseO.textContent = 0;
            this.loseX.textContent = 0;
            this.winO.textContent = 0;
            this.draws.textContent = 0;

            this.winX.innerHTML = '';
            this.loseO.innerHTML = '';
            this.loseX.innerHTML = '';
            this.winO.innerHTML = '';
            this.draws.innerHTML = '';
        })
    }

    btnOk() {
        const ok = document.querySelector('.ok');
        ok.addEventListener("click", () => {
            this.modalWindow.style.display = "none";
        })
    }
}