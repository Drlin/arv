const defineReactive = (obj, key, value)=> {
	const dep = new Dep()

	Object.defineProperty(obj, key, {
		get() {
			if (Dep.target) {
				dep.addSub(Dep.target)
			}
			return value
		},
		set(newValue) {
			if (newValue === value) {
				return
			}
			value = newValue
			dep.notify()
		}
	})
}



function observe(obj, vm) {
	Object.keys(obj).map(key => {
		defineReactive(vm, key, obj[key])
	})
}

