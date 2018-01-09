import {hotColdReducer} from './index';
import {generateAuralUpdate, restartGame, makeGuess} from '../actions';

describe('reducer', () => {
	const guesses = [1,2,3];
	const feedback = 'This is a test everybody!';
	const auralStatus = 'This is also a test everybody';
	const correctAnswer = 77;

	it('Should set the initial state when nothing is passed in', () => {
		const state = hotColdReducer(undefined, {type: '__UNKNOWN'});
		expect(state).toEqual({
			guesses: [],
		    feedback: 'Make your guess!',
		    auralStatus: '',
		    correctAnswer: state.correctAnswer
		});
	});

	it('Should return the current state on an unkown action', () => {
		let currentState = {};
		const state = hotColdReducer(currentState, {type: '__UNKNOWN'});
		expect(state).toBe(currentState);
	});

	describe('generateAuralUpdate', () => {
		it('Should show an aural update', () => {
			let state = {
				guesses: guesses
			};
			state = hotColdReducer(state, generateAuralUpdate());
			expect(state).toEqual({ 
				guesses: [ 3, 2, 1 ],
        		auralStatus: 'Here\'s the status of the game right now: undefined You\'ve made 3 guesses. In order of most- to least-recent, they are: 3, 2, 1' });
		});
	});

	describe('restartGame', () => {
		it('Should reset the state to initial state', () => {
			
			const guess = 7;
			let state = {
				guesses: guess,
				correctAnswer: 7
			};
			state = hotColdReducer(state, restartGame());
			expect(state).toEqual({ 
				guesses: [],
		        correctAnswer: state.correctAnswer,
		        feedback: 'Make your guess!',
		        auralStatus: ''
		    }); 
		});

		it('Should reset the state with a new random correct answer', () => {
			const guess = 15;
			const correctAnswer = 15;
			let state = {
				guesses: guess,
				correctAnswer: correctAnswer
			}
			state = hotColdReducer(state, restartGame());
			expect(state.correctAnswer).not.toEqual(correctAnswer);
		});
	});

	describe('makeGuess', () => {
		it('Should add a new guess to state', () => {
			const guess = 12;
			let state = {
				guesses: guesses
			}
			state = hotColdReducer(state, makeGuess(guess));
			expect(state.guesses).toContain(guess);
		});
	});
});