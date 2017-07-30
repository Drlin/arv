class Observer {
  constructor(data) {
    this.data = data
    this.walk(data)
  }

  walk(obj) {
  	Object.keys(obj).forEach(key => {
  		let val = obj[key]
  		if (typeof val === 'object') {
  			new Observer(val)
  		}
  		this.convert(key, val);
  	})
  }

  convert(key, val) {
  	Object.defineProperty(this.data, key, {
  		enumerable: true,
        configurable: true,
        get() {
            return val
        },
        set(newVal) {
            if (newVal === val) {
            	return
            }
            val = newVal
        }
  	})
  }
}

export default Observer