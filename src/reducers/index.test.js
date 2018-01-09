import {reducer} from './index';
import {generateAuralUpdate, restartGame, makeGuess} from '../actions';

describe('reducer', () => {
	const guesses = [1,2,3];
	const feedback = 'This is a test everybody!';
	const auralStatus = 'This is also a test everybody';
	const correctAnswer = 77;

	it('Should set the initial state when nothing is passed in', () => {
		const state = reducer(undefined, {type: '__UNKNOWN'});
		expect(state).toEqual({
			guesses: [],
		    feedback: 'Make your guess!',
		    auralStatus: '',
		    correctAnswer: state.correctAnswer
		});
	});
});