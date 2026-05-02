const QUIZ_QUESTIONS = [
	{
		q: 'Как вы чаще всего носите украшения?',
		options: [
			'Уверенная элегантность: белая рубашка, строгий костюм, лаконичные и ясные линии.',
			'Свободная и чувственная: струящиеся ткани, мягкие силуэты, лёгкость и непринуждённость.',
			'Глубина и статус: сложные оттенки, безупречный крой, акценты, которые говорят сами за себя.',
			'Солнечная и жизнерадостная: яркие краски, воздушные формы, энергия и лёгкость бытия.',
			'Аутентичная и вневременная: винтажные детали, история в каждой вещи, связь с традициями.',
		],
	},
	{
		q: 'Какое высказывание о драгоценностях отзывается вам больше?',
		options: [
			'Украшение должно быть завершающей точкой в образе, его уверенным и строгим акцентом.',
			'Главное — это ощущение: чтобы оно было мягким, естественным и нежным, как вторая кожа.',
			'Оно должно говорить о статусе и вкусе своей безупречной глубиной и ценностью.',
			'Оно должно нести в себе эмоцию: напоминать о море, лете и счастье.',
			'В нём должна быть история — тайный смысл или связь с прошлым, которая делает его уникальным.',
		],
	},
	{
		q: 'Представьте идеальный момент для вашего украшения. Это…',
		options: [
			'Важная презентация, деловая встреча, где ваш образ работает на вас.',
			'Утренний кофе на террасе, прогулка босиком по траве, моменты тихого счастья для себя.',
			'Вечерний приём, гала-ужин, где вы находитесь в центре внимания.',
			'Отпуск на побережье, пикник с друзьями, солнечный день, который хочется продлить.',
			'Любой день, когда вы хотите чувствовать связь с чем-то большим, чем сиюминутный тренд.',
		],
	},
	{
		q: 'Какой материал заставляет ваше сердце биться чаще?',
		options: [
			'Жёлтое или белое золото, его вес и благородный блеск.',
			'Мерцание жемчуга, его органичная и вневременная красота.',
			'Глубокий цвет и исключительная чистота драгоценного камня.',
			'Яркие всплески цвета: коралл, бирюза, лазурит, несущие в себе энергию.',
			'Сочетание золота и истории: металл, несущий на себе отпечаток времени.',
		],
	},
];

const QUIZ_RESULTS = [
	{
		title: 'Chevalier',
		text: 'Вам идеально подойдёт коллекция Chevalier. Сила, статус и наследие. Коллекция Chevalier — это современное прочтение классической печатки. Эти изделия из 18-каратного золота говорят сами за себя, добавляя вашему образу уверенности и завершённости. Это акцент, который не просто украшает, а заявляет о вашей силе.',
	},
	{
		title: 'Perle di mare',
		text: 'Ваша коллекция — Perle di mare. Сдержанная элегантность и вневременная красота. Жемчуг Perle di mare — это как идеально скроенная белая рубашка: он уместен всегда и везде. Эти украшения станут тихим и уверенным спутником вашей повседневности, подчёркивая вашу мягкую и самодостаточную натуру.',
	},
	{
		title: 'Smeraldi',
		text: 'Ваша история начинается с коллекции Smeraldi. Глубина, статус и безупречная ценность. Изумруды коллекции Smeraldi — это выбор тех, кто ценит исключительность и обладает безупречным вкусом. Это не просто украшение, это инвестиция в будущее, драгоценность, которая будет сиять и на будущих поколениях вашей семьи.',
	},
	{
		title: 'Estate Italiana',
		text: 'Ваш выбор — коллекция Estate Italiana. Солнечная энергия и радость жизни. Коллекция Estate Italiana — это гимн лету, лёгкости и средиземноморскому настроению. Эти украшения с редкими кораллами и яркими камнями подарят вашему образу свежесть и тот самый дух наслаждения, который мы все так любим.',
	},
	{
		title: 'Soldo',
		text: 'Ваш выбор — Soldo. История, символизм и уникальность. Коллекция Soldo для тех, кто ищет в украшениях не только красоту, но и смысл. Старинные монеты, оправленные в золото, — это связь с прошлым, ваш личный талисман и символ непрерывного течения жизни и традиций.',
	},
];

const form = document.getElementById('quiz-form');
if (form) {
	const stepEl = form.querySelector('[data-quiz-step]');
	const questionEl = form.querySelector('[data-quiz-question]');
	const progressEl = form.querySelector('[data-quiz-progress]');
	const optionsEl = form.querySelector('[data-quiz-options]');
	const resultEl = form.querySelector('[data-quiz-result]');
	const resultTitleEl = form.querySelector('[data-quiz-result-title]');
	const resultTextEl = form.querySelector('[data-quiz-result-text]');
	const backBtn = form.querySelector('[data-quiz-back]');
	const nextBtn = form.querySelector('[data-quiz-next]');

	const total = QUIZ_QUESTIONS.length;
	const answers = new Array(total).fill(null);
	let current = 0;

	function pad(n) {
		return String(n).padStart(2, '0');
	}

	function render() {
		if (current >= total) {
			renderResult();
			return;
		}
		stepEl.hidden = false;
		resultEl.hidden = true;
		nextBtn.textContent = current === total - 1 ? 'узнать результат' : 'далее';
		backBtn.disabled = current === 0;
		backBtn.style.visibility = current === 0 ? 'hidden' : 'visible';

		const data = QUIZ_QUESTIONS[current];
		questionEl.textContent = data.q;
		progressEl.textContent = `${pad(current + 1)}/${pad(total)}`;
		optionsEl.innerHTML = '';

		data.options.forEach((text, i) => {
			const li = document.createElement('li');
			li.className = 'quiz__option';
			const label = document.createElement('label');
			label.className = 'quiz__label';
			label.innerHTML = `
				<input type="radio" name="quiz-${current}" class="quiz__input" value="${i}" ${answers[current] === i ? 'checked' : ''}>
				<span class="quiz__radio"></span>
				<span class="quiz__text">${text}</span>
			`;
			label.querySelector('input').addEventListener('change', e => {
				answers[current] = Number(e.target.value);
			});
			li.appendChild(label);
			optionsEl.appendChild(li);
		});
	}

	function renderResult() {
		stepEl.hidden = true;
		resultEl.hidden = false;
		nextBtn.textContent = 'пройти заново';
		backBtn.style.visibility = 'visible';
		backBtn.disabled = false;

		const counts = new Array(QUIZ_RESULTS.length).fill(0);
		answers.forEach(a => {
			if (a != null) counts[a] += 1;
		});
		let bestIdx = 0;
		for (let i = 1; i < counts.length; i++) {
			if (counts[i] > counts[bestIdx]) bestIdx = i;
		}
		const r = QUIZ_RESULTS[bestIdx];
		resultTitleEl.textContent = r.title;
		resultTextEl.textContent = r.text;
	}

	nextBtn.addEventListener('click', () => {
		if (current >= total) {
			answers.fill(null);
			current = 0;
			render();
			return;
		}
		if (answers[current] == null) return;
		current += 1;
		render();
	});

	backBtn.addEventListener('click', () => {
		if (current === 0) return;
		if (current > total) current = total;
		current -= 1;
		render();
	});

	render();
}
