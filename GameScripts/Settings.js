let ShardAutomationEnabler = document.getElementById("ShardAutomationEnabler")
let ConstructionAutomationEnabler = document.getElementById("ConstructionAutomationEnabler")

function EnableDisable(automation) {
   Data.Settings[automation] = !Data.Settings[automation];
}

function updateSettingsHtml() {
    ShardAutomationEnabler.style.display = (Data.Destructions.gte(4)) ? "inline-block" : "none"
    ShardAutomationEnabler.textContent = `Autobuy Shard Upgrades: ${(Data.Settings.AutobuyShardUpgs == true) ? "ON" : "OFF"}`
    
    ConstructionAutomationEnabler.style.display = (Data.Destructions.gte(10)) ? "inline-block" : "none"
    ConstructionAutomationEnabler.textContent = `Autobuy Construction Upgrades: ${(Data.Settings.AutobuyConstructionUpgs == true) ? "ON" : "OFF"}`
}

setInterval(() => {
    updateSettingsHtml();
}, 100)