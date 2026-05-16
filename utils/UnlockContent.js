let constructionContent = document.getElementById("ConstructionResetTab")

function unlockContent() {
    constructionContent.style.display = (hasContent("Construction")) ? "block" : "none"
}

setInterval(unlockContent, 100)