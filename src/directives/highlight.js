//Власнa(користувальницькa) директивa
export default {
    mounted(el) { 
        el.style.color = "white"      
        el.style.backgroundColor = "rgba(42, 41, 41, 0.2)";
        el.style.borderBottom = "0.5px solid white";

        el.addEventListener("mouseover", function (event) {
            el.style.backgroundColor = "rgba(42, 41, 41, 0.5)";
            el.style.borderBottom = "2px solid white";
        });

        el.addEventListener("mouseout", function (event) { 
            el.style.backgroundColor="rgba(42, 41, 41, 0.3)";
            el.style.borderBottom ="0.5px solid white";          
        });
    },
};