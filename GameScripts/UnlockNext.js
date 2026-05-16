let unlockNextTxt = document.getElementById("UnlockNextTxt")

let gameReqs = {
    Construction: new OmegaNum(1e3), // shards
    Destruction: new OmegaNum(10), // construction points
    Restoration: new OmegaNum(30), // destructions
}

function grantStep(curr, req) {
    let r = gameReqs[req]

    if (OmegaNum.gte(Data[curr], r) && !hasContent(req)) {
        Data.GameProgress = OmegaNum.add(Data.GameProgress, 1)
    }
}

function unlockNext() {
    if (Data.GameProgress.eq(0) && !hasContent("construction")) {
        unlockNextTxt.textContent = `Get ${format(gameReqs.Construction)} Shards [${Data.shards.div(gameReqs.Construction).times(100).floor()}%]`
        grantStep("shards", "Construction")

    } else if (Data.GameProgress.eq(1) && !hasContent("destruction")) {
        unlockNextTxt.textContent = `Get ${format(gameReqs.Destruction)} Construction Points [${Data.constructionPoints.div(gameReqs.Destruction).times(100).floor()}%]`
        grantStep("constructionPoints", "Destruction")

    } else if (Data.GameProgress.eq(2) && !hasContent("restoration")) {
        unlockNextTxt.textContent = `Get ${format(gameReqs.Restoration)} Destructions [${Data.Destructions.div(gameReqs.Restoration).times(100).floor()}%]`
        grantStep("Destructions", "Restoration")
    }
}

setInterval(unlockNext, 100)