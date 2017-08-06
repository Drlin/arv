class Compile {
	constructor(node, vm) {
		if (node) {
			return this.nodeToFragment(node, vm)
		}
	}

	nodeToFragment(node, vm) {
		let frag = document.createDocumentFragment()
		let child

		while (child = node.firstChild) {
			this.compileElement(child, vm)
			frag.append(child)
		}
		return frag
	}

	compileElement(node, vm) {
		const reg = /\{\{(.*)\}\}/

		if (node.nodeType === 1) {
			const attr = node.attributes
			Array.from(attr).forEach(item => {
				let name = item.nodeValue
				if (item.nodeName === 'v-model') {
					node.addEventListener('input', (e) => {
						vm[name] = e.target.value
					}, false)
					new Watcher(vm, node, name, 'value')
				}
			})
		}

		if (node.nodeType === 3) {
			if (reg.test(node.nodeValue)) {
				let name = RegExp.$1
        name = name.trim()
				new Watcher(vm, node, name, 'nodeValue')
			}
		}
	}
}