
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


document.querySelector(".form").addEventListener("submit", function (event) {
    event.preventDefault();

    const delay = parseInt(this.elements.delay.value, 10);
    const state = this.elements.state.value;

    new Promise((resolve, reject) => {
        setTimeout(() => {
            state === "fulfilled" ? resolve(delay) : reject(delay);
        }, delay);
    })
    .then(delay => {
        iziToast.success({
            title: "Success",
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: "topRight",
        });
    })
    .catch(delay => {
        iziToast.error({
            title: "Error",
            message: `❌ Rejected promise in ${delay}ms`,
            position: "topRight"
        });
    });
    this.reset();
});
