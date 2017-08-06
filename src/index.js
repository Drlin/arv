function Arv(options) {
	const { data, el } = options
	this.data = data
	observe(data, this)
	var dom = new Compile(document.getElementById(el), this)
	document.getElementById(el).appendChild(dom)
}
