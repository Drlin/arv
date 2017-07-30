class PubSub {
  constructor() {
    this.event = {}
  }

  on(key, fun) {
    if (!this.event[key]) {
      this.event[key] = []
    }
    this.event[key].push(fun)
  }

  emit() {
    let key = Array.prototype.shift.call(arguments),
    fns = this.event[key]
    if (!fns || fns.length < 0) {
      return
    }
    for(var i = 0; i < fns.length; i++) {
      fns[i].apply(this, arguments)
    }
    return this
  }
}

class Observer {
  constructor(data) {
    this.data = data
    this.walk(data)
    this.eventsBus = new PubSub()
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
    let _this = this
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
            _this.eventsBus.emit(key, newVal, val)
            val = newVal
        }
  	})
  }

  $watch(attr, callback) {
    this.eventsBus.on(attr, callback)
  }
}

// export default Observer