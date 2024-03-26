//  ++++++++++++    Sign In   +++++++++

const LoginUrl = `https://backend-todo-wmwo.onrender.com/api/user/check`;
const SignInForm = document.querySelector("#sign-in-form");
const LoginInputs = document.querySelectorAll(".login-inputs");

const SiFormData = {};
LoginInputs.forEach(btn => {
  btn.addEventListener("change", (e) => {
    SiFormData[e.target.name] = e.target.value;
  })
})

SignInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const responce = await fetch(LoginUrl, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await responce.json();
    alert(data.message);

  } catch (error) {
    alert(error);
  }

  LoginInputs.forEach(btn => {
    btn.value = "";
  })
})

//  ++++++++++++    Sign Up   +++++++++

const URL = `https://backend-todo-wmwo.onrender.com/api/user/register`;

const SiInputs = document.querySelectorAll(".SI-inputs");
const SuForm = document.querySelector("#SuForm");

const SuUserData = {};
SiInputs.forEach(input => {
  input.addEventListener("change", (e) => {
    SuUserData[e.target.name] = e.target.value;
  })
})

SuForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const SuUser = document.querySelector("#SuUser");
  if (SuUser.value !== "") {
    try {
      const responce = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SuUserData),
      });
      const Data = await responce.json();
      alert(Data.message);

      if (Data.success) {
        SiInputs.forEach(input => {
          input.value = "";
        })
      }

    } catch (error) {
      alert(error);
    }
  } else {
    alert("Please Enter Corect Information");
  }
})

// ++++++ Creating Workout Cards   ++++++++++++ //

for (let i = 0; i < 15; i++) {
  const card = document.createElement("div");
  card.setAttribute("class", 'card');
  card.style.width = `18rem`;

  card.innerHTML = `<img src="..." class="card-img-top border" alt="...">
                    <div class="card-body">
                      <h5 class=""></h5>
                      <p> Secondary Musles :-  </p>
                      <p class="card-text"></p>
                     </div>`;

  if (i < 3) document.querySelector(".CG1").append(card);
  else if (i > 2 && i < 6) document.querySelector(".CG2").append(card);
  else if (i > 6 && i < 10) document.querySelector(".CG3").append(card);
  else if (i > 9 && i < 13) document.querySelector(".CG4").append(card);
  else document.querySelector(".CG5").append(card);
}


//++++++++++++++ Search Workout (Fetch)  ++++++++++

const ResultBox = document.querySelector('.result');
const SliderImg = document.querySelector('.scroll-img');
const BackHome = document.querySelector("#BackHome");

const SearchWorkOut = document.querySelector("#SearchWorkOut");
const InputWorkOut = document.querySelector("#InputWorkOut");
SearchWorkOut.addEventListener("submit", FetchData);
BackHome.addEventListener("click", ChangeHomePage);
// +++++++  Fetching Data  ++++++
async function FetchData(e) {
  e.preventDefault();
  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${InputWorkOut.value.toLowerCase()}?limit=18`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'aa6651bd56msh52f8279eb9de46dp16e9bdjsne03a02bb8c76',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if(result.error){
      alert(`Sorry ! ${result.error}`); 
    }
    else {
      ShowResult(result);
    }
  } catch (error) {
    console.error(error);
  }
}

//+++++++  Show the Fetched OutPut Workoutes  +++++++++++

const ResultContainer = document.querySelectorAll(".result .card-group"); // All Groupes Of Crad-group
const card = document.querySelectorAll(".result .card");


function ShowResult(result) {
  RefreshBoxes(result);
  ChangeHomePage();
  for (let i = 0; i < card.length; i++) {
    card[i].childNodes[2].childNodes[1].innerHTML = result[i].name; // Ok Done Workout Name
    card[i].childNodes[0].src = result[i].gifUrl;// Ok GIF

    for (let j = 0; j < 2; j++)
      card[i].childNodes[2].childNodes[3].innerHTML += result[i].secondaryMuscles[j] + ",\n"; // Secondary Musles

    for (let j = 0; j < 5; j++)
      card[i].childNodes[2].childNodes[5].innerHTML += `<li>${result[i].instructions[j]}</li>` + '<br>';// Instructions

  }

}

function RefreshBoxes(result) {
  for (let i = 0; i < card.length; i++) {
    card[i].childNodes[2].childNodes[5].innerHTML = "";
    card[i].childNodes[2].childNodes[3].innerHTML = "";
  }
}

//++++++++++++++  Change Home Page  +++++++++++

function ChangeHomePage() {
  ResultBox.classList.toggle("OnSearch")
  SliderImg.classList.toggle('OnSearch');
}