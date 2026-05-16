function calcConstructionGain() {
    let exp = 0.4;

    Data.constructionStorage = Data.shards.div(1000).pow(exp)
}

function ConstructReset(force) {
    if (OmegaNum.gte(Data.shards, 1000)) {
        Data.constructionPoints = OmegaNum.add(Data.constructionPoints, Data.constructionStorage)
    }
}