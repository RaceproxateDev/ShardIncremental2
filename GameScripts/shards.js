let ShardsTxt = document.getElementById("ShardsTxt")

let MoreShardsIlvlTxt = document.getElementById("BuyableMoreShardsILvlTxt")
let MoreShardsIIlvlTxt = document.getElementById("BuyableMoreShardsIILvlTxt")
let MoreShardsIPurchaseButton = document.getElementById("MoreShardsIPurchaseButton")
let MoreShardsIIPurchaseButton = document.getElementById("MoreShardsIIPurchaseButton")

function genShards() {
    let can = true

    if (can) {
        Data.shards = OmegaNum.add(Data.shards, Data.shardMult)
    }
}

function UpdateHtml() {
    ShardsTxt.textContent = `Shards: ${format(Data.shards)} [+${format(Data.shardMult)}/s]`

    MoreShardsIlvlTxt.textContent = `More Shards I [${format(Data.Buyables[1].amount)}/${format(Data.Buyables[1].max)}]`
    MoreShardsIPurchaseButton.innerHTML = (Data.Buyables[1].amount.lt(Data.Buyables[1].max)) ? `${format(Data.Buyables[1].price)} Shards` : "Max"
    MoreShardsIIlvlTxt.textContent = `More Shards II [${format(Data.Buyables[2].amount)}/${format(Data.Buyables[2].max)}]`
    MoreShardsIIPurchaseButton.innerHTML = (Data.Buyables[2].amount.lt(Data.Buyables[2].max)) ? `${format(Data.Buyables[2].price)} Shards` : "Max"
}

function calcShardMult() {
    let mult = new OmegaNum(1)
    mult = mult.times(OmegaNum.add(1, Data.Buyables[1].amount))
    mult = mult.times(OmegaNum.pow(2, Data.Buyables[2].amount))
    mult = mult.times(OmegaNum.pow(2, Data.Buyables[3].amount))

    Data.shardMult = mult
    return mult
}



setInterval(genShards, 1000)

setInterval(() => {
    UpdateHtml()
    calcShardMult()
}, 100)