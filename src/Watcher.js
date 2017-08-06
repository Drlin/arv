class Watcher {
	constructor(vm, node, name, type) {
		Dep.target = this
		this.vm = vm
		this.name = name
		this.node = node
		this.type = type
		this.update()
		Dep.target = null
	}
	update() {
		this.get()
		this.node[this.type] = this.value
	}
	get() {
		this.value = this.vm[this.name]; //触发相应属性的get
	}
}