let ShardsTxt = document.getElementById("ShardsTxt")

let MoreShardsIlvlTxt = document.getElementById("BuyableMoreShardsILvlTxt")
let MoreShardsIPurchaseButton = document.getElementById("MoreShardsIPurchaseButton")

function genShards() {
    let can = true

    if (can) {
        Data.Shards = OmegaNum.add(Data.Shards, Data.shardMult)
    }
}

function UpdateHtml() {
    ShardsTxt.textContent = `Shards: ${format(Data.Shards)} [+${format(Data.shardMult)}/s]`

    MoreShardsIlvlTxt.textContent = `More Shards I [${format(Data.Buyables[1].amount)}/${format(Data.Buyables[1].max)}]`
    MoreShardsIPurchaseButton.innerHTML = (Data.Buyables[1].amount.lt(Data.Buyables[1].max)) ? `${format(Data.Buyables[1].price)} Shards` : "Max"
}

function calcShardMult() {
    let mult = new OmegaNum(1)
    mult = mult.times(OmegaNum.add(1, Data.Buyables[1].amount))

    Data.shardMult = mult
    return mult
}



setInterval(genShards, 1000)

setInterval(() => {
    UpdateHtml()
    calcShardMult()
}, 100)