export function numberFormatter(num, digits) {
	const si = [{ value: 1e18, symbol: 'E' }, { value: 1e15, symbol: 'P' }, { value: 1e12, symbol: 'T' }, { value: 1e9, symbol: 'G' }, { value: 1e6, symbol: 'M' }, { value: 1e3, symbol: 'k' }]
	for (let i = 0; i < si.length; i++) {
		if (num >= si[i].value) {
			return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
		}
	}
	return num.toString()
}

export function toThousandFilter(num) {
	return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
export function toHTTPUrl(str) {
	if (!str) {
		return ''
	}
	if (str.indexOf('http') == -1) {
		return `http://${str}`
	} else {
		return str
	}

	return
}
export function parseTimeFormat(time, cFormat) {
	if (arguments.length === 0) {
		return null
	}
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
			time = parseInt(time)
		}
		if (typeof time === 'number' && time.toString().length === 10) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay(),
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}
