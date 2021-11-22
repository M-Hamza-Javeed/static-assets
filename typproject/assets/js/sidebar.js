const creatAudiofile=(file,conn)=>{
    let cardtypingconn=document.createElement("div");
    cardtypingconn.setAttribute("class","card-typing-conn")

    let outerdiv=document.createElement("div");
    let headingdiv=document.createElement("div");
    let icondiv=document.createElement("div");
    let icon=document.createElement("i");
    let footer=document.createElement("div");
    let link=document.createElement("a");
    link.setAttribute("href","course/"+file.fields.category+"/"+file.fields.filename+"/"+file.fields.audiofile)
    link.textContent=file.fields.filename
    outerdiv.setAttribute("class","card border-primary mb-3 card-typing")
    headingdiv.setAttribute("class","card-header card-typing-heading")
    icondiv.setAttribute("class","card-body text-primary card-typing-icon")
    footer.setAttribute("class","card-footer")
    footer.setAttribute("style","text-align: center;")
    icon.setAttribute("class","fa fa-headphones")
    headingdiv.textContent=file.fields.category
    outerdiv.append(headingdiv);
    icondiv.append(icon);
    outerdiv.append(icondiv);
    footer.append(link)
    outerdiv.append(footer);
    cardtypingconn.append(outerdiv);
    conn.append(cardtypingconn);


}

window.addEventListener('load', (event) => {
document.querySelectorAll(".sidebar-lisner").forEach((el)=>{
    el.addEventListener('click',(_el)=>{
        if(document.getElementById("Homepage")){

            var data = new FormData();
            let csrf_token=document.getElementById('casrd_xas_32p3x24sxad')
            data.append("csrfmiddlewaretoken", csrf_token.value);
            data.append("category_id", _el.target.id);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://127.0.0.1:8000/api/getlessons");
            xhr.addEventListener("readystatechange", function (e) {
                if (this.readyState === 4){
                    document.querySelector('.card-typing-conn').remove();
                    let audiofiles = JSON.parse(JSON.parse(this.response).audiofile);
                    audiofiles.forEach((file)=>{
                        creatAudiofile(file,document.querySelector('.audiofile-conn'))
                    })
            }
            });xhr.send(data);
        }
        else{
            document.location.href="/"
        }
        });
    });
    
});
