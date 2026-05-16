let unlockNextTxt = document.getElementById("UnlockNextTxt")

let gameReqs = {
    Construction: new OmegaNum(1e3), // shards
}

function grantStep(curr, req) {
    let r = gameReqs[req]

    if (OmegaNum.gte(Data[curr], r) && !hasContent(req)) {
        Data.GameProgress = OmegaNum.add(Data.GameProgress, 1)
    }
}

function unlockNext() {
    if (Data.GameProgress.eq(0) && !hasContent("Construction")) {
        unlockNextTxt.textContent = `Get ${format(gameReqs.Construction)} Shards [${Data.shards.div(gameReqs.Construction).times(100).floor()}%]`
        grantStep("shards", "Construction")
    }
}

setInterval(unlockNext, 100)