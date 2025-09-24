 const showPopup = document.getElementsByClassName("showPopup");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.getElementById("closeBtn");
    const popupTitle=document.getElementById("popupTitle");
    const popupContent=document.getElementById("popupContent");
    console.log(showPopup)
    console.log("ushasu")
    
    for(let i=0; i<showPopup.length; i++){
      showPopup[i].addEventListener("click", () => {
      overlay.style.display = "flex";
      overlay.style.color="black"
      console.log(showPopup[i].getAttribute("data-title"))
      popupTitle.innerText=showPopup[i].getAttribute("data-title")
      popupContent.innerText=showPopup[i].getAttribute("data-content")
      })
    }
    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
    });

    // Optional: Close popup if clicking outside of it
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.style.display = "none";
      }
    });