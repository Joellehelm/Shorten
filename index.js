window.addEventListener('DOMContentLoaded', (event) => {
    
    const linkList = document.getElementById('linkList')
    const shortenInput = document.getElementById("shorten")
    const shortenButton = document.getElementById("submitBtn")
    const errorMessage = document.getElementById("errorMessage")
    shortenButton.addEventListener("click", shortenLink)
    


    function shortenLink(event){
        event.preventDefault()
        
        if(shortenInput.value === ""){
            throwError()
        }else{
            const url = shortenInput.value
            errorMessage.style.visibility = "hidden"
            shortenInput.classList.remove("colorRed")
            fetchShorterLink(url)
        }

        
    }



    function throwError(){
        errorMessage.style.visibility = "visible"
        shortenInput.classList.add("colorRed")
    }


    function fetchShorterLink(urlToShorten){
       
        fetch("https://rel.ink/api/links/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"url": urlToShorten})
        })
        .then(r => r.json())
        .then(response => {
            if(response.url[0] === 'Enter a valid URL.'){
                throwError()
            }else{
                renderLink(response)
            }
        }) 
    }



    function renderLink(link){
        const oldLink = link.url
        const newLink = `https://rel.ink/${link.hashid}`
        
        const linkContainer = document.createElement('div')
        const oldLinkSpot = document.createElement('span')
        const newLinkSpot = document.createElement('span')
        const copyBtn = document.createElement('button')
        

        linkContainer.classList.add("linkContainer")
        oldLinkSpot.classList.add("oldLinkSpot")
        newLinkSpot.classList.add("newLinkSpot")
        copyBtn.classList.add("copyBtn")
        

        oldLinkSpot.innerText = oldLink
        newLinkSpot.innerText = newLink
        copyBtn.innerHTML = "Copy"
       
        linkContainer.append(oldLinkSpot)
        linkContainer.append(newLinkSpot)
        linkContainer.append(copyBtn)

        linkList.append(linkContainer)

        copyBtn.addEventListener("click", copyText)
        shortenInput.value = ""
    }



    function copyText(event){
        event.preventDefault()

        const copyButton = event.target
        const copyLink = event.target.parentElement.querySelector(".newLinkSpot")
        const textArea = document.createElement("textarea");


        copyButton.classList.add("copied")
        copyButton.innerHTML = "Copied!"

        textArea.value = copyLink.textContent;
        document.body.appendChild(textArea);
    
        textArea.select();
        document.execCommand("copy");

        textArea.remove()
        
    }












    
});


