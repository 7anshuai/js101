define(['jquery', 'require'], function ($, require) {
	'use strict';

	var data = {};

	// Functions in alphabetical order
	// Functions are declared globally so that eval can access them.

	window.answer = function (expression) {
		data.lastAnswer = expression;

		return 'Answer received';
	};

	window.clear = function () {
		setTimeout(function () {
			$('.console li:not(.input-container)').remove();
		}, 10);
	};

	window.help = function () {
		return [
			'这是一些可以帮助你的命令：',
			'课程命令：',
			'previous() 会返回上一个课程。',
			'showAnswer() 会给你当前课程的答案。' +
				'尽量避免使用它！',
			'控制台命令：',
			'clear() 清除在控制台显示的命令（或者你可以按 ctrl+l).',
			'help() 显示帮助信息。',
			'info() 显示关于小试正则的信息。',
			'reset() 会清空之前所有的命令并返回到教程的开始。'
		].join('\n\n');
	};

	window.info = function () {
		return '小试正则是一个交互式的正则表达式教程，由 Callum Macrae 编写，需要帮助的话可以请教他。';
	};

	window.previous = function () {
		require('lessons').previousLesson();
	};

	window.reset = function () {
		localStorage.removeItem('currentLesson');
		localStorage.removeItem('codeSoFar');

		setTimeout(location.reload.bind(location), 100);

		return 'Resetting…';
	};

	window.setName = function (name) {
		if (data.name) {
			return 'You have already set your name! ' +
				'Type reset() to start again, if you want.';
		}

		var firstName = name.split(' ')[0];

		if (firstName === 'code') {
			return 'Your name isn\'t code! Stop it.';
		}

		window.bio = 'A developer called ' + firstName + ' is learning regex';

		data.name = name;
		data.firstName = firstName;
		data.firstEscaped = firstName.replace(/([$()*+.?\[^|\]])/g, '\\$1');

		return 'Hello, ' + name + '!';
	};

	window.showAnswer = function () {
		// Both modules depend on each other; cannot require as dep
		var answer = require('lessons').getAnswer(),
			$input = $('.regex-input');

		if (answer === null) {
			return 'undefined';
		}

		if (!$input.val()) {
			$input.val(answer);
		} else if ($input.val().slice(0, 11) === 'showAnswer(') {
			// Wait until next cycle or it will be cleared
			setTimeout(function () {
				$input.val(answer);
			});
		}

		return answer;
	};

	// Global vars in order of appearance

	window.num = '123456';

	window.shortStory = 'A regular expression (also regex or regexp) is a string.';

	window.bracketNumbers = '(123) (123456) (123456789)';
	window.shorterStory = window.bracketNumbers;

	window.username = 'BobbyTables';

	window.charTypeTest = 'Approximately 1920';

	window.possibleUrl = 'https://example.com/';

	window.rabbit = 'The rabbit ate';

	window.userData = 'user1=sad;\nuser2=angry;\n' +
		window.username + '=happy;\nuser4=crazy';

	window.boldText = '**bold text!**';

	window.partialSums = '1+1,2+2,3+3=,8+10,10+10+20,6+3=9,5+3';

	return data;
});