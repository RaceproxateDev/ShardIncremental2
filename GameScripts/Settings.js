let ShardAutomationEnabler = document.getElementById("ShardAutomationEnabler")

function EnableDisable(automation) {
   Data.Settings[automation] = !Data.Settings[automation];
}

function updateSettingsHtml() {
    ShardAutomationEnabler.style.display = (Data.Destructions.gte(4)) ? "inline-block" : "none"
    ShardAutomationEnabler.textContent = `Autobuy Shard Upgrades: ${(Data.Settings.AutobuyShardUpgs) ? "ON" : "OFF"}`
}

setInterval(() => {
    updateSettingsHtml();
}, 100)