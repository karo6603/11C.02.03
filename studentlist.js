"use strict";

document.addEventListener("DOMContentLoaded", start);

function start() {
  // filterbutton
  let housebtn = document.querySelector(".housebtn");
  let housecontent = document.querySelector(".housedropdown");

  //   sortingbutton
  let sortbtn = document.querySelector(".sortbtn");
  let sortcontent = document.querySelector(".sortdropdown");

  //   toggle filter dropdown
  housebtn.addEventListener("click", dropHouse);

  function dropHouse() {
    housecontent.classList.toggle("show");
  }

  //   toggle sorting dropdown
  sortbtn.addEventListener("click", dropSort);

  function dropSort() {
    sortcontent.classList.toggle("show");
  }

  let house = "All";

  let allStudents = [];

  let dest = document.querySelector("#list");

  //   get json
  async function getJson() {
    let jsonData = await fetch("http://petlatkea.dk/2019/students1991.json");
    allStudents = await jsonData.json();
    showStudent();
  }

  //   show student list
  function showStudent() {
    dest.innerHTML = "";
    allStudents.forEach(student => {
      if (house == "All" || house == student.house) {
        dest.innerHTML += `
              <div class="student">
                  <h2>${student.fullname}</h2>
                  <p>${student.house}</p>
              </div>`;
      }

      //   add popup
      document.querySelectorAll(".student").forEach(stdnt => {
        stdnt.addEventListener("click", open);
      });

      function open() {
        console.log(student);
        document.querySelector("#indhold").innerHTML = `
                            <div class="students">
                                <h2>${student.fullname}</h2>
                                
                                <p>${student.house}</p>

                                </div>

                            `;
        document.querySelector("#popup").style.display = "block";
      }
    });
  }

  document.querySelector("#luk button").addEventListener("click", () => {
    document.querySelector("#popup").style.display = "none";
  });

  //   filter house when you click button
  document.querySelectorAll(".filter").forEach(elm => {
    elm.addEventListener("click", showHouse);
  });

  function showHouse() {
    house = this.textContent;

    showStudent();
  }

  getJson();
}
