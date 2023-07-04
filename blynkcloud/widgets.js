

// Sistema para gerar IDs aleatórios
var id_list = []
function generateId() {

  do {
    var id = Math.floor(Math.random() * 100000)
  } while (id_list.indexOf(id) != -1)

  id_list.push(id)
  return id
}

//========================================================================================================
// FUNÇÕES PARA CRIAR WIDGETS ============================================================================

function createSlider(token, streamId, slider_class) {

  const slidercontainer = document.createElement("div")
  slidercontainer.className = "slidercontainer"

  var slider_id = generateId().toString()
  var slider_label_id = generateId().toString()

  const slider_label = document.createElement("p")
  slider_label.className = "slider_lab"
  slider_label.innerHTML = "0"
  slider_label.id = slider_label_id

  const slider = document.createElement("input")
  slider.type = "range"
  slider.min = "0"
  slider.max = "100"
  slider.value = "0"
  slider.className = slider_class
  slider.id = slider_id
  slider.oninput = () => {
    var value = document.getElementById(slider_id).value
    const slider_lab = document.getElementById(slider_label_id)
    slider_lab.innerHTML = value
    fetch(`https://blynk.cloud/external/api/update?token=${token}&dataStreamId=${streamId}&value=${value}`)
  }

  slidercontainer.append(slider)
  slidercontainer.append(slider_label)

  return slidercontainer

}

function createDeviceStatus(token) {

  var device_status_text_id = generateId().toString()
  var device_status_icon_id = generateId().toString()

  const device_status_text = document.createElement("p")
  device_status_text.id = device_status_text_id
  device_status_text.innerHTML = "LOADING STATUS DEVICE..."

  const device_status_icon = document.createElement("div")
  device_status_icon.className = "device_status_conection_icon"
  device_status_icon.id = device_status_icon_id

  const device_status = document.createElement("div")
  device_status.className = "device_status_conection_container"

  device_status.append(device_status_text)
  device_status.append(device_status_icon)

  device_status.onload = loadStatusDevices(device_status_text_id, device_status_icon_id, token)

  return device_status

}

function createButton(token, streamId) {

  button_id = generateId().toString()

  const button_container = document.createElement("div")
  button_container.className = "container_button"

  const button_label = document.createElement("label")
  button_label.className = "container_label"
  
  const button = document.createElement("input")
  button.type = "checkbox"
  button.id = button_id
  button.onload = loadButton(button_id, token, streamId)
  button.onchange = () => {
    if (button.checked) {
      fetch(`https://blynk.cloud/external/api/update?token=${token}&dataStreamId=${streamId}&value=1`)
    } else {
      fetch(`https://blynk.cloud/external/api/update?token=${token}&dataStreamId=${streamId}&value=0`)
    }
  }
    

  const button_span  = document.createElement("span")
  button_span.className = "checkmark_btn"

  button_label.append(button)
  button_label.append(button_span)
  button_container.append(button_label)

  return button_container

}


// =======================================================================================================


// FUNÇÕES DE CONFIGURAÇÕES DOS WIDGETS ==================================================================

function loadStatusDevices(text_id, icon_id, token) {
  fetch(`https://blynk.cloud/external/api/isHardwareConnected?token=${token}`)
    .then((response) => response.json())
    .then((data) => {
      if (data == true) {
        document.getElementById(text_id).innerHTML = "DEVICE ONLINE"
        document.getElementById(icon_id).style.backgroundColor = "#29ca7a"
      } else {
        document.getElementById(text_id).innerHTML = "DEVICE OFFLINE"
        document.getElementById(icon_id).style.backgroundColor = "#ca2929"
      }
    })
}

function loadButton(button_id, token, streamId) {
  fetch(`https://blynk.cloud/external/api/get?token=${token}&dataStreamId=${streamId}`)
    .then((response) => response.json())
    .then((data) => {

      const check = document.getElementById(button_id)

      if (data == 1) {
        check.checked = true;
      } else {
        check.checked = false;
      }
    }
    )
}

// =======================================================================================================




// Função principal que verifica as configurações do arquivo "config.js"
// e chama as funções para criar os Widgets
function Components(config) {

  var devices_count = config[0].length
  console.log(`Quantidade Dispositivos: ${devices_count}`)

  if (devices_count != 0) {

    const devices = document.createElement("div")
    devices.className = "blynkmodule"

    for (let i = 0; i < devices_count; i++) {

      var tokens = config[0][i][0]
      console.log(`  TOKEN: ${tokens}`)

      var widgets = config[0][i][1].length
      console.log(`  Quantidade Widgets: ${widgets}`)

      if (widgets != 0) {

        for (let o = 0; o < widgets; o++) {
          var widget_type = config[0][i][1][o][0]
          var widget_dataStream = config[0][i][1][o][1]
          var widget_class = config[0][i][1][o][2]

          switch (widget_type) {
            case "slider":
              devices.append(createSlider(tokens, widget_dataStream, widget_class))
              break
            case "device_status":
              devices.append(createDeviceStatus(tokens))
              break
            case "button":
              devices.append(createButton(tokens, widget_dataStream))
              break
          }
          console.log(`    Tipo Widget: ${widget_type}`)
        }
      }
    }

    return devices

  } else {
    const na_devices = document.createElement("p")
    na_devices.innerHTML = "NENHUM DISPOSITIVO CONFIGURADO"
    return na_devices
  }
}


