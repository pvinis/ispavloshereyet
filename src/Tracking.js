import push from 'pushsafer-notifications'
import publicIP from 'public-ip'


const p = new push({
	k: process.env.REACT_APP_PUSHSAFER_KEY,
})

if (process.env.REACT_APP_PUSHSAFER_KEY === undefined) {
	console.warn("key?")
}

export const sendMessage = async () => {
	const message = {
		m: await publicIP.v4(),
		t: 'ispavloshereyet visit',
		d: '29625',
	}

	process.env.NODE_ENV === 'production'
	? p.send(message)
	: console.log(message)
}
