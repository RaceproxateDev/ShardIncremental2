let constructionContent = document.getElementById("ConstructionResetTab")

function unlockContent() {
    constructionContent.style.display = (Data.shards.gte(1000) || hasContent("Construction")) ? "inline-block" : "none"
}

setInterval(unlockContent, 100)