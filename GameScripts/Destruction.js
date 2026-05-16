let CalcDestructionReqTxt = document.getElementById("CalcDestructionReqTxt");
let DestructionRLbutton = document.getElementById("DestructionRLbutton");

// Milestones
let DestructionDisplayTxt = document.getElementById("DestructionDisplayTxt");
let DestructionMilestone1 = document.getElementById("DestructionMilestone1");
let DestructionMilestone2 = document.getElementById("DestructionMilestone2");
let DestructionMilestone3 = document.getElementById("DestructionMilestone3");
let DestructionMilestone4 = document.getElementById("DestructionMilestone4");
let DestructionMilestone5 = document.getElementById("DestructionMilestone5");
let DestructionMilestone6 = document.getElementById("DestructionMilestone6");
let DestructionMilestone7 = document.getElementById("DestructionMilestone7");

let ConstructionEnergyDisplayTxt = document.getElementById("ConstructionEnergyDisplayTxt");
let ConstructionEnergyFirstBoosttxt = document.getElementById("ConstructionEnergyFirstBoosttxt")

function calcDestructionsBulk() {
    let bulk = new OmegaNum(1);

    return bulk;
}

function updateHtml() {
    CalcDestructionReqTxt.textContent = `You need ${format(Data.DestructionReq)} Construction Points to Destroy`
    DestructionRLbutton.textContent = (Data.constructionPoints.gte(Data.DestructionReq)) ? "Destroy" : "Meet the requirement first"

    // Milestones
    DestructionDisplayTxt.textContent = `You made ${format(Data.Destructions)} Destructions`

    DestructionMilestone1.style.backgroundColor = (Data.Destructions.gte(1)) ? "red" : "black"
    DestructionMilestone1.style.borderColor = (Data.Destructions.gte(1)) ? "gray" : "red"
    DestructionMilestone1.style.color = (Data.Destructions.gte(1)) ? "black" : "red"

    DestructionMilestone2.style.backgroundColor = (Data.Destructions.gte(2)) ? "red" : "black"
    DestructionMilestone2.style.borderColor = (Data.Destructions.gte(2)) ? "gray" : "red"
    DestructionMilestone2.style.color = (Data.Destructions.gte(2)) ? "black" : "red"

    DestructionMilestone3.style.backgroundColor = (Data.Destructions.gte(3)) ? "red" : "black"
    DestructionMilestone3.style.borderColor = (Data.Destructions.gte(3)) ? "gray" : "red"
    DestructionMilestone3.style.color = (Data.Destructions.gte(3)) ? "black" : "red"

    DestructionMilestone4.style.backgroundColor = (Data.Destructions.gte(4)) ? "red" : "black"
    DestructionMilestone4.style.borderColor = (Data.Destructions.gte(4)) ? "gray" : "red"
    DestructionMilestone4.style.color = (Data.Destructions.gte(4)) ? "black" : "red"
    DestructionMilestone4.style.display = (Data.Destructions.gte(3)) ? "block" : "none"

    DestructionMilestone5.style.backgroundColor = (Data.Destructions.gte(5)) ? "red" : "black"
    DestructionMilestone5.style.borderColor = (Data.Destructions.gte(5)) ? "gray" : "red"
    DestructionMilestone5.style.color = (Data.Destructions.gte(5)) ? "black" : "red"
    DestructionMilestone5.style.display = (Data.Destructions.gte(4)) ? "block" : "none"

    DestructionMilestone6.style.backgroundColor = (Data.Destructions.gte(6)) ? "red" : "black"
    DestructionMilestone6.style.borderColor = (Data.Destructions.gte(6)) ? "gray" : "red"
    DestructionMilestone6.style.color = (Data.Destructions.gte(6)) ? "black" : "red"
    DestructionMilestone6.style.display = (Data.Destructions.gte(5)) ? "block" : "none"

    DestructionMilestone7.style.backgroundColor = (Data.Destructions.gte(7)) ? "red" : "black"
    DestructionMilestone7.style.borderColor = (Data.Destructions.gte(7)) ? "gray" : "red"
    DestructionMilestone7.style.color = (Data.Destructions.gte(7)) ? "black" : "red"
    DestructionMilestone7.style.display = (Data.Destructions.gte(6)) ? "block" : "none"

    ConstructionEnergyDisplayTxt.textContent = `You have ${format(Data.ConstructionEnergy)} Construction Energy [+${format(Data.ConstructionEnergyMult)}/s]`
    ConstructionEnergyFirstBoosttxt.textContent = `${format(CalcConstructionEnergyFirstBoost())}x Shards`
}

function DestructionReset(force) {
    if (Data.constructionPoints.gte(Data.DestructionReq)) {
        if (!force) {
            Data.Destructions = Data.Destructions.add(calcDestructionsBulk());
            Data.DestructionReq = Data.DestructionReq.mul(Data.DestructionScale);
        }

        resetStats(5, 0);
        resetBuyables(5, 1);

        if (!hasContent("destruction")) {
            Data.Unlocks.push("destruction");
        }
    }
}

function autobuyUpgrades() {
    let spendShards = true
    let spendConstructionPoints = true

    if (Data.Destructions.gte(4) && Data.Settings.AutobuyShardUpgs == true) {
        buyUpg(1, "shards", spendShards)
        buyUpg(2, "shards", spendShards)
    }
}

function GenConstructionEnergy() {
    let can = false 
    if (Data.Destructions.gte(5)) can = true

    if (can) {
        Data.ConstructionEnergy = OmegaNum.add(Data.ConstructionEnergy, Data.ConstructionEnergyMult)
    }
}

function calcConstructionEnergyMult() {
    let mult = new OmegaNum(1)
    if (Data.Destructions.gte(8)) mult = mult.times(OmegaNum.add(1, OmegaNum.div(Data.Destructions, 8)))


    Data.ConstructionEnergyMult = mult
    return mult
}

function CalcConstructionEnergyFirstBoost() {
    let exp = new OmegaNum(0.3)
    let base = new OmegaNum(1)

    let boost = Data.ConstructionEnergy.pow(exp).log10().add(base)
    return boost
}

setInterval(() => {
    updateHtml();
    autobuyUpgrades();
    calcConstructionEnergyMult();
    CalcConstructionEnergyFirstBoost();
}, 100)

setInterval(() => {
    GenConstructionEnergy();
}, 1000)