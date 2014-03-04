Publish events
button.click
button.press
sensor.measure


Publish object
{
	room: 'kitchen',
	source: {
		device: '90:27:e4:e9:13:b4',
		ip: ''
	},
	destination: {
		device: '*' // You can also specify a specific device to send this event to
	},

	// Example 1
	data: {
		category: 'button',
		action: 'click', // doubleclick, tripleclick, press
		value: 10 // In case of press this could be the time the button was pressed
	},

	// Example 2
	data: {
		category: 'sensor',
		action: 'measure',
		label: 'temperature'
		value: 200 // Value the sensor 
	}
}
