var SCREEN_DATA = ["123.xml 화면1",
																					"456.xml 화면2"]

var sp = "\t\n";
var regex = new RegExp(`[${sp}]+`);
var wordCount = new Map();

const text_left = document.getElementById("text_left");
const text_right = document.getElementById("text_right");
const spliter = document.getElementsByName("spliter");
const countFilter = document.getElementById("countFilter");
const view = document.getElementsByName("view");
const print_type = document.getElementsByName("print_type");
const change_type = document.getElementsByName("change_type");
const inputReturnUpper = document.getElementById("inputReturnUpper");
const resultReturnUpper = document.getElementById("resultReturnUpper");
const inputScreenData = document.getElementById("inputScreenData");
const resultScreenData = document.getElementById("resultScreenData");


/*
START SETUP LOGIC
*/
text_left.addEventListener("input", countInspect);
inputScreenData.addEventListener("input", returnScreenData);
setEvent();
/*
END SETUP LOGIC
*/

function setEvent() {
  for(let i = 0; i < splier.length; i++) {
    spliter[i].onchange = countInspect;
  }
  countFilter.onchange = printRight;
  for(let i = 0; i < view.length; i++) {
    view[i].onchange = printRight;
  }
  for(let i = 0; i < print_type.length; i++) {
    print_type[i].onchange = printRight;
}
  for(let i = 0; i < change_type.length; i++) {
    change_type[i].onchange = changeCase;
}
  inputReturnUpper.onchange = changeCase;
}

function changeCase() {
  if(change_type[0].checked == true) {
    returnUpper();
  } else {
    returnLower();
  }
}

function returnUpper() {
  resultReturnUpper.value = inputReturnUpper.value.toUpperCase();
}
function returnLower() {
  resultReturnUpper.value = inputReturnUpper.value.toLowerCase();
}

//화면 매칭 출력
function returnScreenData() {
  resultScreenData.value = "";
  let sp = "\n";
  regex = new RegExp(`[${sp}]+`);
  let lines = inputScreenData.value.split(regex).map(v => v.trim());

  for(let line of lines) {
    if(line == '' || line == '\n')
      continue;
    for(let i of SCREEN_DATA) {
      if(i.includes(line) == true) {
        resultScreenData.value += i + '\n';
      }
    }
  }
}

function countInspect() {
  wordCount.clear();
  sp = "";
  for(let i = 0; i < spliter.length; i++) {
    if(spliter[i].checked) {
      sp += splier[i].value;
    }
  }
  regex = new RegExp(`[${sp}]+`);

  let splits = text_left.value.split(regex).map(v => v.trim());

  for(let i = 0; i < splits.length; i++) {
    let word = splits[i];
    if(wordCount.hase(word) == false) {
      wordCount.set(word, 1);
    } else {
      wordCount.set(word, wordCount.get(word) + 1);
    }
  }
  printRight();
}

function printRight() {
  text_right.value = "";
  wordCount.delete("");

  for(let [key, val] of wordCount) {
    console.log(key + ", " + val + "\n");
    /* 
    view[0] : 갯수
    view[1] : 중복 제거
    */
    if(view[0].checked == true) {
      if(val >= countFilter.value) {
        text_right.value += key + " : " + val + "개\n";
      } else {
        if(print_type[0].checked == true) {
          text_right.value += key + "\t";
        } else {
          text_right.value += key + '\n';
        }
      }
    }
  }
}





















