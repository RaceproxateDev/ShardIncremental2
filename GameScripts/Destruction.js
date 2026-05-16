let CalcDestructionReqTxt = document.getElementById("CalcDestructionReqTxt");
let DestructionRLbutton = document.getElementById("DestructionRLbutton");

// Milestones
let DestructionMilestone1 = document.getElementById("DestructionMilestone1");

function calcDestructionsBulk() {
    let bulk = new OmegaNum(0);

    return bulk;
}

function updateHtml() {
    CalcDestructionReqTxt.textContent = `You need ${format(Data.DestructionReq)} Construction Points to Destroy`
    DestructionRLbutton.textContent = (Data.constructionPoints.gte(Data.DestructionReq)) ? "Destroy" : "Meet the requirement first"

    // Milestones
    DestructionMilestone1.style.backgroundColor = (Data.Destructions.gte(1)) ? "red" : "black"
    DestructionMilestone1.style.borderColor = (Data.Destructions.gte(1)) ? "gray" : "red"
    DestructionMilestone1.style.color = (Data.Destructions.gte(1)) ? "black" : "red"
}

function DestructionReset(force) {
    if (Data.constructionPoints.gte(Data.DestructionReq)) {
        resetStats(5,0);
        resetBuyables(5, 1);

        if (!force) {
            Data.Destructions = Data.Destructions.add(calcDestructionsBulk());
            Data.DestructionReq = Data.DestructionReq.mul(Data.DestructionScale);
        }

        if (!hasContent("destruction")) {
            Data.Unlocks.push("destruction");
        }
    }
}

setInterval(() => {
    updateHtml();
}, 100)
