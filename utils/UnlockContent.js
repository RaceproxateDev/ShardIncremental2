let constructionContent = document.getElementById("ConstructionResetTab")
let DestructionContent = document.getElementById("DestructionResetTab")

function unlockContent() {
    constructionContent.style.display = (Data.shards.gte(1000) || hasContent("construction")) ? "inline-block" : "none"
    DestructionContent.style.display = (Data.constructionPoints.gte(10) || hasContent("Destruction")) ? "inline-block" : "none"
}

setInterval(unlockContent, 100)