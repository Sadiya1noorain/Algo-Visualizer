var count = 0;
window.addEventListener('resize', function() { positioningAccordion() });
window.addEventListener('DOMContentLoaded', function() { positioningAccordion() }); 
//(re)positioning hidden span for accordion
function positioningAccordion(){
  // remove all hidden span
  var elements = document.getElementsByClassName("spacer");
  while(elements.length > 0){
       elements[0].parentNode.removeChild(elements[0]);
  }
  var windowWidth = window.innerWidth;
  var ulWidth = document.getElementsByClassName("links")[0].offsetWidth;
  var liWidth = document.getElementsByClassName("links")[0].children[0].offsetWidth - 32;
  var perRow = Math.floor( ulWidth / liWidth );
  var maxElem = document.getElementsByClassName("links")[0].children.length;
  var maxRows = parseInt(maxElem / perRow); 
 
  // create hidden span
  for (row=1; row <= maxRows; row++){
      var spacer = document.createElement("SPAN");
      spacer.classList.add("spacer"); 
      spacer.style.height = 0;
      //positioning new span
      if (row == 1) offset = -1; else offset = row-2;//considering the added (span) element adding an offset
      var afterObj = (perRow * row) + offset;
      //console.log(perRow + " - " + row +  " - " + afterObj + " - " + maxRows);
      var referenceNode = document.getElementsByClassName("links")[0].children[afterObj];
      referenceNode.parentNode.insertBefore(spacer, referenceNode.nextSibling);
  } 
  //display selected spacer span
  if (count > 0 ){ //click an object
    var atRow =  parseInt ( count / perRow ) == count / perRow ? parseInt (count / perRow) - 1 : parseInt ( count / perRow ); 
    document.getElementsByClassName("spacer")[atRow].style.height = document.getElementById("section" + count).offsetHeight + "px"; 
    document.getElementsByClassName("spacer")[atRow].style.height = "auto;"
    //repositioning section
    document.getElementById("section" + count).style.top = document.getElementsByClassName("spacer")[atRow].offsetTop + "px"; 
    //repositioning close buttin
    document.getElementsByClassName("close-button")[0].style.top = document.getElementsByClassName("spacer")[atRow].offsetTop + "px"; 
  }
};
//close buttin
document.getElementsByClassName("close-button")[0].addEventListener("click", function(){	
  document.getElementsByClassName("active")[0].classList.remove("active");
  document.getElementById("section" + count).classList.remove("expanded"); 
  document.getElementById("section" + count).style.display = "none";
  document.getElementsByClassName("close-button")[0].classList.remove("expanded"); 
  document.getElementsByClassName("close-button")[0].style.display = "none";
  // resize all spacer span to zero
  [].forEach.call(document.getElementsByClassName("spacer"), function(el) { 
    el.style.height = 0;
  }); 
});
//click element
[].forEach.call(document.getElementsByTagName("li"), function(el) {
		el.addEventListener("click", function(){	
      [].forEach.call(document.getElementsByClassName("spacer"), function(el) { // resize all spacer span to zero
        el.style.height = 0;
      });
      //calculater spacer position
      var childs = this.parentNode.childNodes;
      var yPos = (this.offsetTop + this.offsetHeight);
      //find correct childnode avoiding spaces between elements
      for(i=0; i < this.childNodes.length ; i++){
        var currNode=this.childNodes[i];
        if(currNode.nodeType==1){
            //console.log("childNodes[" + i + "]: " + currNode.tagName);
            break;
        }                
      }
      //open / close the element clicked
      if (currNode.classList.contains("active")){//close the already opened selected element
          currNode.classList.remove("active");
       }else{
          if (document.getElementsByClassName("active").length){// close a open accordion
              document.getElementsByClassName("active")[0].classList.remove("active");
          }
          if (document.getElementsByClassName("expanded").length){
              document.getElementsByClassName("expanded")[0].style.display = "none";
              document.getElementsByClassName("expanded")[0].classList.remove("expanded");
          }     
          currNode.classList.add("active"); 
      }
      //find the index of selected object
      count = 0;
      for (i = 0; i < childs.length; i++) {
        if (childs[i].tagName == "LI") 
          count++;
          if (this == childs[i]){
            break;
          }
      }
      //open / close the relative section
      if(document.getElementById("section" + count).classList.contains("expanded")){//close an already open section
        document.getElementById("section" + count).classList.remove("expanded"); 
        document.getElementById("section" + count).style.display = "none";
        document.getElementsByClassName("close-button")[0].classList.remove("active"); //close the close button
        document.getElementsByClassName("close-button")[0].style.display = "none";
      }else{//open section
        document.getElementById("section" + count).style.height = "auto";
        document.getElementById("section" + count).style.position = "absolute";
        document.getElementById("section" + count).style.left = "0px";
        document.getElementById("section" + count).style.top = yPos + "px"; 
        document.getElementById("section" + count).style.display = "block";
        document.getElementById("section" + count).classList.add("expanded"); 
        //display close button
        document.getElementsByClassName("close-button")[0].classList.add("active"); 
        document.getElementsByClassName("close-button")[0].style.top = yPos + "px"; 
        document.getElementsByClassName("close-button")[0].style.display = "block";
        positioningAccordion();//display accordion
      }
		}); 	
});