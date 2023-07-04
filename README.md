# Blynk Cloud

### Configuração do arquivo config

    {
	module: 'blynkcloud',
	position: 'top_right',
	config: [
		// Module settings
		]
	}

### Exemplo de configuração

    {
	module: 'blynkcloud',
	position: 'top_right',
	config: [
		devices = [
			device1 = [
				token = "YOUR_DEVICE_TOKEN",
				widgets = [
					widget1 = [
						type = "slider",
						dataStream = "8",
						widget_class = "slider"
					],
					widget2 = [
						type = "slider",
						dataStream = "8",
						widget_class = "slider"
					],
					]
				]
			]
		]
	}
