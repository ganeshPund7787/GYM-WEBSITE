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


// Search Workout

const SearchWorkOut = document.querySelector("#SearchWorkOut");
SearchWorkOut.addEventListener("submit", name);


async function name(params) {
  const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=10';
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
	console.log(result);
} catch (error) {
	console.error(error);
}
}





