import { r as registerInstance, d as createEvent, h } from './core-97d7b997.js';

const Container = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.back = createEvent(this, "back", 7);
        this.next = createEvent(this, "next", 7);
    }
    render() {
        return (h("div", { class: "flex items-center justify-center flex-col mb-2 m-1 bg-white shadow-md" }, h("div", { class: "flex w-full px-16 border-b items-center" }, h("img", { class: "w-24", src: "/assets/icon/pizza.png" }), h("div", { class: "p-6 w-full text-center text-3xl truncate" }, this.name)), h("div", { class: "flex w-full justify-around cursor-pointer text-2xl" }, h("div", { class: "flex items-center justify-center w-full py-2 hover:bg-gray-300", onClick: () => this.back.emit(this.identifier) }, "Back"), h("div", { class: "flex items-center justify-center w-full py-2 hover:bg-gray-300", onClick: () => this.next.emit(this.identifier) }, "Next"))));
    }
};

export { Container as app_container };
