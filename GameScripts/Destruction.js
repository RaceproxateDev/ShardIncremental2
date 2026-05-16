let CalcDestructionReqTxt = document.getElementById("CalcDestructionReqTxt");
let DestructionRLbutton = document.getElementById("DestructionRLbutton");

// Milestones
let DestructionDisplayTxt = document.getElementById("DestructionDisplayTxt");
let DestructionMilestone1 = document.getElementById("DestructionMilestone1");
let DestructionMilestone2 = document.getElementById("DestructionMilestone2");
let DestructionMilestone3 = document.getElementById("DestructionMilestone3");

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

setInterval(() => {
    updateHtml();
    autobuyUpgrades();
}, 100)
