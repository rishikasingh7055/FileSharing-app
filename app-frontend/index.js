const dropZone = document.querySelector(".drop-zone");
const fileInput =document.querySelector("#fileInput");
const browseBtn = document.querySelector(".browseBtn");
const bgProgress = document.querySelector(".bg-progress");
const progressBar = document.querySelector(".progress-bar");
const percentDiv = document.querySelector("#percent");
const progressContainer = document.querySelector(".progress-container");
const fileURLInput = document.querySelector("#fileURL");
const sharingContainer = document.querySelector(".sharing-container");
const copyBtn = document.querySelector("#copyBtn");
const toast = document.querySelector(".toast");

const host = "https://sharein-y.herokuapp.com/"
const uploadURL = `${host}api/files`;

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    if(!dropZone.classList.contains("dragged")){
        dropZone.classList.add("dragged");
    }
});

dropZone.addEventListener("drag leave", () =>{
    dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragged");
    const files = e.dataTransfer.files;
    console.table(files);
    if(files.length){
        fileInput.files = files;
        uploadFile();
    }
    

});

fileInput.addEventListener("change", ()=>{
    uploadFile();
})

browseBtn.addEventListener("click", () =>{
    fileInput.click();
});

copyBtn.addEventListener("click", () =>{
    fileURLInput.select();
    document.execCommand("copy");
    showToast("Link copied");
})

const uploadFile = () => {
    progressContainer.style.display="block";
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("myfile",file);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            console.log(xhr.response);
            showLink(JSON.parse(xhr.response));
        }
        
        
    };

    xhr.upload.onprogress = updateProgress;
    xhr.upload.onerror = ()=>{
        fileInput.value = "";
        showToast(`Error in upload:${xhr.statusText}`)
    }

    xhr.open("POST", uploadURL);
    xhr.send(formData);
}

const updateProgress = (e) =>{
    const percent =Math.round((e.loaded / e.total) * 100);
    bgProgress.style.width = `${percent}%`;
    percentDiv.innerText = percent;
    progressBar.style.transform =`scaleX(${percent/100})`;
};

const showLink =({file : url})=>{
      console.log(url);
      progressContainer.style.display ="none";
      sharingContainer.style.display  ="block";
      fileURLInput.value = url;
}

let toastTimer;
const showToast = (msg) =>{
    toast.innerText = msg;
    toast.style.transform = "translate(-50%,0)";
    clearTimeout(toastTimer);
    toastTimer= setTimeout(() =>{
    toast.style.transform = "translate(-50%,60px)";
    },2000);
};