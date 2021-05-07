var Hangman = (function () {
    'use strict';

    class Hangman {
        constructor(id) {
            this.id = id;
            this.wordBank = [
                'tar', 'heels', 'carolina', 'university', 'north', 'computer', 'science', 'kmp'
            ];
        }

        reset() {

            this.word = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
            this.wrong = 0;
            this.guessed = [];
            this.gameEnd = false;

            this.hideElementByClass('h');
            this.showElementByIdWithContent(this.id + "_guessbox", null);
            this.showElementByIdWithContent(this.id + "_word", this.getGuessedWord());
        }

        /*hahaButton() {
            // rick roll here?
            location.href("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        }*/

        guess(letter) {
            letter = letter.charAt(0).toLowerCase();
            // lowercase it

            if (this.gameEnd || this.guessed.indexOf(letter) > -1) {
                return;
            }

            this.guessed.push(letter);
            this.showElementByIdWithContent(this.id + "_word", this.getGuessedWord());
            this.showElementByIdWithContent(this.id + "_guesses", this.guessed.join(''));

            if (this.word.indexOf(letter) < 0) {
                this.wrong++;
                this.showElementByIdWithContent(this.id + "_" + this.wrong, null);
                if (this.wrong === 6) {
                    this.showElementByIdWithContent(this.id + "_end", "FAIL! <br/>The word was: " + this.word + "<br/>Better luck next time!");
                    this.gameEnd = true;
                }
            } else if (this.word.indexOf(this.getGuessedWord()) !== -1) {
                this.showElementByIdWithContent(this.id + "_end", "WINNER!<br/>You guessed it!");
                this.gameEnd = true;
            }
        
        }
        getGuessedWord() {
            var result = "", i;
            for (i = 0; i < this.word.length; i++) {
                result += (this.guessed.indexOf(this.word[i]) > -1) ?
                    this.word[i] : "_";
            }
            return result;
        }
        showElementByIdWithContent(id, content) {
            if (content !== null) {
                document.getElementById(id).innerHTML = content;
            }
            document.getElementById(id).style.opacity = 1;
        }
        hideElementByClass(eclass) {
            var elements = document.getElementsByClassName(eclass), i;
            for (i = 0; i < elements.length; i++) {
                elements[i].style.opacity = 0;
            }
        }

    }

    return new Hangman('hangm');    
}());