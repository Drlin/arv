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
		for(var i = 0; i < fns.length; i++) {
            fns[i].apply(this, arguments);
       	}
       	return this;
	}
}