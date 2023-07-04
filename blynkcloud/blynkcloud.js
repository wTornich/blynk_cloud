

Module.register("blynkcloud", {
    
    
    getDom: function () {

        console.log("BLYNK CLOUD STARTED")

        const wrapper = document.createElement("div")
        wrapper.className = "blynk_module"
  
        const components = Components(this.config)
        
        wrapper.append(components)

        return wrapper;

    },

    getStyles: function () {
        return ["panel.css"];
    },

    getScripts: function () {
        return [
            this.file('widgets.js')
        ]
    },


});