let CalcConstructionGainTxt = document.getElementById("CalcConstructionGainTxt")
let ConstructionRLbutton = document.getElementById("ConstructionRLbutton")

let ConstructionPointsDisplayTxt = document.getElementById("ConstructionPointsDisplayTxt")

let BuyableMoreShardsIIILvlTxt = document.getElementById("BuyableMoreShardsIIILvlTxt")
let MoreShardsIIIPurchaseButton = document.getElementById("MoreShardsIIIPurchaseButton")
let BuyableMoreConstructionILvlTxt = document.getElementById("BuyableMoreConstructionILvlTxt")
let MoreConstructionIPurchaseButton = document.getElementById("MoreConstructionIPurchaseButton")

function updateHTML() {
    CalcConstructionGainTxt.textContent = `You will gain ${format(Data.constructionStorage)} Construction Points after resetting`
    ConstructionRLbutton.innerHTML = (Data.shards.gte(1000)) ? `Construct` : `You need 1,000 Shards`

    ConstructionPointsDisplayTxt.textContent = `Construction Upgrades [You have ${format(Data.constructionPoints)} Construction Points]`

    BuyableMoreShardsIIILvlTxt.textContent = `More Shards III [${format(Data.Buyables[3].amount)}/${format(Data.Buyables[3].max)}]`
    MoreShardsIIIPurchaseButton.innerHTML = (Data.Buyables[3].amount.lt(Data.Buyables[3].max)) ? `${format(Data.Buyables[3].price)} Construction Points` : "Max"

    BuyableMoreConstructionILvlTxt.textContent = `More Construction I [${format(Data.Buyables[4].amount)}/${format(Data.Buyables[4].max)}]`
    MoreConstructionIPurchaseButton.innerHTML = (Data.Buyables[4].amount.lt(Data.Buyables[4].max)) ? `${format(Data.Buyables[4].price)} Construction Points` : "Max"
}

function calcConstructionStorage() {
    let exp = new OmegaNum(0.3)
    let baseDiv = new OmegaNum(1000)

    Data.constructionStorage = Data.shards.div(baseDiv).pow(exp).mul(Data.constructionMult)
}

function constructReset(force) {
    if (Data.shards.gte(1000)) {
        resetStats(2, 0)
        resetBuyables(3, 1)
        
        if (!force) {
            Data.constructionPoints = Data.constructionPoints.add(Data.constructionStorage)
        } 
        
        if (!hasContent("construction")) {
            Data.Unlocks.push("construction")
        }
    }
}

function calcConstructionMult() {
    let mult = new OmegaNum(1)
    mult = mult.times(OmegaNum.add(1, Data.Buyables[4].amount))
    if (Data.Destructions.gte(2)) mult = mult.times(OmegaNum.add(1, OmegaNum.div(Data.Destructions, 2)))

    Data.constructionMult = mult
    return mult
}

setInterval(() => {
    calcConstructionStorage()
    updateHTML()
    calcConstructionMult()
}, 100)