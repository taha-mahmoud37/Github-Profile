
const apiUrl = "https://api.github.com/users/";

let form = document.getElementById("form");
let search = document.getElementById("search");
let main = document.getElementById ("main");

async function getUser(userName)
{
    try
    {
        let response= await axios(apiUrl + userName);
        console.log(response.data);
        getInfo(response.data);
        getRepos(userName);
    }
    catch(err)
    {

        if(err.response.status == 404)
        {
            createErrMessage("No profile with username");
        }

    }
};




form.addEventListener("submit" , (e) =>{
    e.preventDefault();

    const user = search.value ;
    
    if (user)
    {
        getUser(user);
        search.value = '';

    }

});

async function getRepos(userName)
{
    try
    {
        let resp = await axios(apiUrl + userName + `/repos?sort=created`);
        
        getRepoToCard(resp.data);

    }
    catch(err)
    {
        createErrMessage("problem matching repos");
        console.log(err)
    }
}


function getInfo(data)
{
    const cardHtml = 
    `<div class="card">
    <div>
        <img src="${data.avatar_url}" class="avater" alt="${data.name}" >
    </div>
    <div class="info">
        <h1>${data.name}</h1>
        <p>${data.bio}
        </p>
        
    
        <ul>
            <li>${data.followers}<strong>followers</strong> </li>
            <li>${data.following}<strong>following</strong> </li>
            <li>${data.public_repos}<strong>repose</strong> </li>
       </ul>

       <div id="repos" class="reposes"></div>
    </div>
   </div>`

    main.innerHTML = cardHtml;

}


function getRepoToCard(repos)
{
    const reposEl = document.getElementById("repos");

    repos.slice(0 , 5)
    .forEach(repo => {
        const repoLink = document.createElement("a");

        repoLink.classList.add("repo");
        repoLink.href = repo.html_url;
        repoLink.target = "_blank";
        repoLink.innerText = repo.name;

        reposEl.appendChild(repoLink); 

        console.log(repo)

    });
}





function createErrMessage(msg)
{
    const cardHtml = 
    `<div class = "card">
         <h1>${msg}</h1>
    </div>`

    main.innerHTML = cardHtml;
}

