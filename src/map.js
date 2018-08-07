ymaps.ready(createMap);

/**
 * Функция построения элемента телефона
 * @param phone - номер телефона для вставки
 * @param className - Имя класса для элемента телефона
 * @return {HTMLParagraphElement} - элемент для вставки в дом
 */
function phoneCreate (phone, className) {
	const phoneElement = document.createElement('p');
	phoneElement.className = className;
	phoneElement.innerText += phone;
	return phoneElement;
}

/**
 * Функция построения элемента графика работы
 * @param schedule - строка с графиком работы для вставки
 * @param className - класс для элемента графика работы
 * @return {HTMLParagraphElement} - элемент для вставки в дом
 */
function scheduleCreate (schedule, className) {
	const phoneElement = document.createElement('p');
	phoneElement.className = className;
	phoneElement.innerText += schedule;
	return phoneElement;
}

/**
 * Функция для создания ссылки
 * @param className - класс
 * @param hrefLink - значение атирибута href
 * @param inner - Текст для отображения
 * @return {HTMLAnchorElement} - готовый элемент ссылки для вставки
 */
function createLink(className, hrefLink, inner) {
	const link = document.createElement('a');
	const text = document.createTextNode(inner);
	link.className = className;
	link.href = hrefLink;
	link.appendChild(text);
	return link;
}

/**
 * Функция для создания элемента карты с одним классом
 * @param teg - Необходимый тег
 * @param className - Имя класса
 * @param inner - Содержимое тега
 * @return {HTMLElement | HTMLSelectElement | HTMLLegendElement | HTMLTableCaptionElement | HTMLTextAreaElement | HTMLModElement | HTMLHRElement | HTMLOutputElement | HTMLPreElement | HTMLEmbedElement | HTMLCanvasElement | HTMLFrameSetElement | HTMLMarqueeElement | HTMLScriptElement | HTMLInputElement | HTMLUnknownElement | HTMLMetaElement | HTMLStyleElement | HTMLObjectElement | HTMLTemplateElement | MSHTMLWebViewElement | HTMLBRElement | HTMLAudioElement | HTMLIFrameElement | HTMLMapElement | HTMLTableElement | HTMLAnchorElement | HTMLMenuElement | HTMLPictureElement | HTMLParagraphElement | HTMLTableDataCellElement | HTMLTableSectionElement | HTMLQuoteElement | HTMLTableHeaderCellElement | HTMLProgressElement | HTMLLIElement | HTMLTableRowElement | HTMLFontElement | HTMLSpanElement | HTMLTableColElement | HTMLOptGroupElement | HTMLDataElement | HTMLDListElement | HTMLFieldSetElement | HTMLSourceElement | HTMLBodyElement | HTMLDirectoryElement | HTMLDivElement | HTMLUListElement | HTMLHtmlElement | HTMLAreaElement | HTMLMeterElement | HTMLAppletElement | HTMLFrameElement | HTMLOptionElement | HTMLImageElement | HTMLLinkElement | HTMLHeadingElement | HTMLVideoElement | HTMLBaseFontElement | HTMLTitleElement | HTMLButtonElement | HTMLHeadElement | HTMLParamElement | HTMLTrackElement | HTMLOListElement | HTMLDataListElement | HTMLLabelElement | HTMLFormElement | HTMLTimeElement | HTMLBaseElement}
 */
function createElementSingleClass (teg, className='', inner = '') {
	const element = document.createElement(teg);
	element.className = className;
	element.innerText = inner;
	return element;
}

function createHeader(data, map) {
	//Создаем коллекцию для добавления меток на карту
	let collection = new ymaps.GeoObjectCollection(null, {});
	let descMap = document.getElementById('DescMap');
	//Создаем элемент для вставки заголовка и последующего контента
	const headerBrand = document.createElement('div');
	headerBrand.className = 'Brand';
	
	//Создаем элемент для логотипа
	const brandLogo = document.createElement('img');
	brandLogo.className = 'Brand-Logo';
	brandLogo.src =  data.brandLogo;
	brandLogo.alt = data.brandName;
	
	//Обертка для информации о бренде
	const brandInfoWrap = createElementSingleClass('div', 'Brand-Wrap');
	
	//Создаем элемент для названия бренда
	const brandName = createElementSingleClass('p', 'Brand-Name', data.brandName);
	
	//Обёртка для телефона и графика работы
	const brandPhoneSch = createElementSingleClass('div', 'Brand-PhoneSch');
	
	//Создаем элемент для глобального графика работы
	const brandSchedule = createElementSingleClass('p', 'Brand-Schedule', 'График работы');
	const schedule = createElementSingleClass('p','', data.brandSchedule);
	brandSchedule.appendChild(schedule);
	
	//Создаем элемент для глобального телефона
	const brandPhone = createElementSingleClass('p', 'Brand-Phone', 'Телефон');
	const phone = createElementSingleClass('p','',data.brandPhone);
	brandPhone.appendChild(phone);
	
	
	
	/** --- Создаем магазины в бренде --- **/
	//Создаем оберку для магазинов
	const brandsWrap = createElementSingleClass('div', 'Brands', '');
	
	//Создаем отдельные адреса и добовляем их в DOM
	for (let i = 0; i < data.brandData.length; i++) {
		const brandsElement = createBrandAddress(data.brandData[i], data.brandName, collection);
		brandsWrap.appendChild(brandsElement);
	}
	
	//Собираем все элементы для вставки в DOM
	descMap.appendChild(brandsWrap);
	headerBrand.appendChild(brandLogo);
	brandInfoWrap.appendChild(brandName);
	brandPhoneSch.appendChild(brandPhone);
	brandPhoneSch.appendChild(brandSchedule);
	brandInfoWrap.appendChild(brandPhoneSch);
	headerBrand.appendChild(brandInfoWrap);
	
	
	//Добавляем коллекцию на карту
	map.geoObjects.add(collection);
	
	return headerBrand;
}

function createBrandAddress(data, brandName, collect) {
	console.log('data', data);
	
	//Создаем оберку для одного адреса
	const singleBrand = createElementSingleClass('div', 'Brands-Element');
	
	//Создаем элемент с адресом магазина
	const address = createLink('Brands-Address', '#', data.address);
	//const address = createElementSingleClass('p', 'Brands-Address', data.address);
	
	/** --- Создаем элемент с телефонами магазина --- **/
	//Создаем обёртку для телефонов магазина
	const phone = createElementSingleClass('div', 'Brands-Phone_Wrap', 'Телефоны');
	
	//Получаем телефоны магазина
	const phoneMass = data.primoryPhone.split('|');
	for (let i = 0; i < phoneMass.length; i++) {
		const phoneInner = phoneCreate(phoneMass[i], 'Brands-Phone');
		phone.appendChild(phoneInner);
	}
	/** --- Создаем элемент для графиков работы магазина --- **/
	//Создаем обёртку для графиков работы магазина
	const schedule = createElementSingleClass('div', 'Brands-Schedule_Wrap', 'График работы');
	
	//Получаем графики работы магазина
	const scheduleMass = data.primoryShedule.split('|');
	for (let i = 0; i < scheduleMass.length; i++) {
		const phoneInner = scheduleCreate(scheduleMass[i], 'Brands-Schedule');
		schedule.appendChild(phoneInner);
	}
	
	//Обёртка для информации с телефонами и графиком работы
	const phoneScheduleWrap = createElementSingleClass('div', 'Brands-Info');
	
	//Собираем все элементы для вставки в DOM
	singleBrand.appendChild(address);
	phoneScheduleWrap.appendChild(schedule);
	phoneScheduleWrap.appendChild(phone);
	singleBrand.appendChild(phoneScheduleWrap);
	
	
	//Разбираем и приводим к числам координаты магазина
	let coordinates = data.coordinates.split(',');
	for (let i = 0; i < coordinates.length; i++) {
		coordinates[i] = Number(coordinates[i]);
	}
	let placemark = new ymaps.Placemark(
		coordinates,
		{
			hintContent: brandName,
			balloonContentHeader: `${brandName} на ${data.address}`,
			balloonContentBody: data.address,
			balloonContentFooter: data.primoryPhone + data.primoryShedule
		},
		{
			iconLayout: 'default#image',
			iconImageHref: 'Item.svg',
			iconImageSize: [35,35],
			iconImageOffset: [-17,-17],
			hideIconOnBalloonOpen: false
		}
	);
	address.addEventListener('mouseenter', function () {
		placemark.balloon.open();
	});
	address.addEventListener('mouseleave', function () {
		placemark.balloon.close();
	});
	placemark.events
		.add('mouseenter', ()=> {
			singleBrand.style.backgroundColor = '#e0e0e0';
		})
		.add('mouseleave', ()=>{
			singleBrand.style.backgroundColor = '';
		});
	collect.add(placemark);
	
	
	return singleBrand;
	
}

/**
 * Функция инициализации и построения карты
 */
function createMap(){
		//Получение данных для обработки
	$.getJSON('MapSource.json', (dataMap) => {
		//Получем элемент, где будут находяться элементы управления картой
		const mapInfo = document.getElementById('DescMap');
		
		//Получаем город
		const city = dataMap.city;
		delete dataMap.city;
		//Обращаемся к яндексу для получения координат центра города в котором показываем информацию
		ymaps.geocode(city).then(
			function (res) {
				//Создаем карту и показываем её на странице
				let myMap = new ymaps.Map(
					'Map',
					{
						center: res.geoObjects.get(0).geometry.getCoordinates(),
						zoom: 10,
						controls: ['zoomControl', 'fullscreenControl'],
						behaviors: ['drag', 'dblClickZoom']
					},
					{
						searchControlProvider: 'yandex#search'
					}
				);
				//Получаем элемент для вставки данных по бренду
				const descMap = document.getElementById('DescMap');
				//
				const mapInfo = createHeader(dataMap, myMap);
				//Добавляем элемент в DOM
				descMap.appendChild(mapInfo);
				
			}
		);
		
	});
	console.groupEnd();
}
