const list = document.querySelector('.why__list');
const items = document.querySelectorAll('.why__item');
const panelTitle = document.querySelector('.why__panel-title');
const panelDesc = document.querySelector('.why__panel-desc');

function scrollItemToCenter(item) {
	if (!list) return;
	const listRect = list.getBoundingClientRect();
	const itemRect = item.getBoundingClientRect();
	const offset =
		itemRect.top - listRect.top - listRect.height / 2 + itemRect.height / 2;
	list.scrollTo({ top: list.scrollTop + offset, behavior: 'smooth' });
}

items.forEach(item => {
	item.addEventListener('click', () => {
		const isMobile = window.innerWidth <= 768;

		if (isMobile) {
			const isActive = item.classList.contains('why__item--active');
			items.forEach(i => i.classList.remove('why__item--active'));
			if (!isActive) item.classList.add('why__item--active');
		} else {
			items.forEach(i => i.classList.remove('why__item--active'));
			item.classList.add('why__item--active');
			panelTitle.textContent = item.querySelector('.why__item-title').textContent;
			panelDesc.textContent = item.querySelector('.why__item-desc').textContent;
			scrollItemToCenter(item);
		}
	});
});
