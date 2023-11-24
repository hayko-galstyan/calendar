class Calendar extends HTMLElement {
	constructor() {
		super();
		this.root = this.attachShadow({mode:'open'})
		this.loadStyle()
		this.bulid()
	}

	loadStyle() {
		let style = document.createElement('style')
		style.innerHTML = `
			.calendar {
				width:371px;
				background:none;
				box-shadow:6px 6px 6px gray;
				margin:20px auto;
			}
			.app-calendar-header {
				width:100%;
				height:50px;
				display:flex;
				flex-wrap:no-wrap;
				align-items:center;
				border-bottom:1px solid gray;
			}
			.app-calendar-header div {
				width:51px;
				text-align:center;
				border:1px solid #eb7b7b;
				padding:16px 0;
			}
			.app-calendar-content {
				width:100%;
				display:flex;
				flex-wrap:wrap;
			}
			.item {
				width:51px;
				text-align:center;
				border:1px solid #eb7b7b;
				padding:16px 0;
				font-size:25px;
			}
			.arrow {
				width:100%;
				display:flex;
				flex-wrap:wrap;
				justify-content:space-between;
				align-items:center;
			}
			.arrow button {
				border:none;
				padding:20px;
				font-size:20px;
				background:none;
			}
			.active {
				background:#eb7b7b !important;
				color:#ffffff !important;
			}
		`
		this.root.append(style)
	}

	daysContent(month,years,content) {
		let daysInMonth = new Date(years, month+1, 0).getDate()
		let firstDay = new Date(years, month, 1).getDay()
		for (let i = 0; i < firstDay-1; i++) {
			console.log(firstDay)
			let div = document.createElement('div')
			div.className = 'item'
			content.append(div)
		}
		for (let i = 1; i <= daysInMonth; i++) {
			let div = document.createElement('div')
			div.className = 'item'
			let d = new Date()
			if(i == d.getDate()) {
				div.classList.add('active')
			}
			div.innerText = i
			content.append(div)
		}
		return content
	}

	bulid() {
		let container = document.createElement('div')
		container.className = 'calendar'

		let days = [
			'Երկ',
			'Երք',
			'Չոր',
			'Հինգ',
			'Ուրբ',
			'Շաբ',
			'Կիր'
		];

		let years =  this.getAttribute('year')
		let month =  this.getAttribute('month')

		let arrowSection = document.createElement('div')
		arrowSection.className = 'arrow'

		let txtYears = document.createElement('div')
		txtYears.style.fontSize = '30px'
		txtYears.innerText = month + '/' + years

		let next = document.createElement('button')
		next.className = 'arrow-item'
		next.innerText = '>'

		let prev = document.createElement('button')
		prev.className = 'arrow-item'
		prev.innerText = '<'


		let content = document.createElement('div')
		content.className = 'app-calendar-content'

		next.onclick = () => {
			content.innerHTML = ''
			if(month == 12) {
				years++
				month = 0
			}else {
				month++
			}
			arrowSection.innerHTML = ''
			arrowSection.append(prev,month+1+'/'+years,next)
			container.append(this.daysContent(month,years,content))
		}

		prev.onclick = () => {
			content.innerHTML = ''
			if(month == 0) {
				years--
				month = 11
			}else {
				month--
			}
			arrowSection.innerHTML = ''
			arrowSection.append(prev,month+1+'/'+years,next)
			container.append(this.daysContent(month,years,content))
		}

		let header = document.createElement('div')
		header.className = 'app-calendar-header'

		days.forEach(day => {
			let div = document.createElement('div')
			div.innerHTML = `<b>${day}</b>`
			header.append(div)
		})

		container.innerHTML = ''

		arrowSection.append(prev,txtYears,next)
		container.append(arrowSection)
		container.append(header)
		container.append(arrowSection)
		container.append(this.daysContent(month-1,years,content))
		this.root.append(container)
	}

}

customElements.define('app-calendar',Calendar)