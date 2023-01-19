var id;

  var container = document.querySelector("#container");

  document
    .querySelector("#id_input")
    .addEventListener("input", function_search);

  function function_search() {
    var query = document.querySelector("#id_input").value;

    console.log(query);

    function_query(query);
  }

  function function_query(query) {
    var url = `https://swapi.dev/api/people/?search=${query}`;
    

    async function search_char() {
      try {
        var data = await fetch(url);

        var response = await data.json();

        console.log(response.results);

        display_data(response.results);

        if (response.results.length != 0) {
          document.querySelector("#container").style.display = "block";
          document.querySelector("#error").style.display = "none";
        } else {
          document.querySelector("#container").style.display = "none";
          document.querySelector("#error").style.display = "block";
        }

        if (query == "") {
          document.querySelector("#container").style.display = "none";
          document.querySelector("#error").style.display = "none";
        }
      } catch (error) {
        console.log("No results found. Try again...");
        document.querySelector("#error").style.display = "block";
      }
    }

    Debounce(search_char, 1000);

    
    
  }
  

  function display_data(data) {
    document.querySelector("#container").innerHTML = null;

    data.forEach(function (el) {
      var box = document.createElement("div");
      box.setAttribute("id", "box");
      document.querySelector("#container").append(box);

      var name = document.createElement("h4");
      name.innerText = el.name;

      var gender = document.createElement("p");
      gender.innerText = el.gender;

      box.append(name, gender);
    });
  }

  function Debounce(func, delay) {
    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(function () {
      func();
    }, delay);
  }