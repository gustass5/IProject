import { Component, Prop, Event, EventEmitter, h } from "@stencil/core";

@Component({
  tag: "app-container"
})
export class Container {
  @Prop() name: string;

  @Prop() identifier!: number;

  @Event() back: EventEmitter;
  @Event() next: EventEmitter;

  render() {
    return (
      <div class="flex items-center justify-center flex-col mb-2 m-1 bg-white shadow-md">
        <div class="flex w-full px-16 border-b items-center">
          <img class="w-24" src="/assets/icon/pizza.png" />
          <div class="p-6 w-full text-center text-3xl truncate">
            {this.name}
          </div>
        </div>
        <div class="flex w-full justify-around cursor-pointer text-2xl">
          <div
            class="flex items-center justify-center w-full py-2 hover:bg-gray-300"
            onClick={() => this.back.emit(this.identifier)}
          >
            Back
          </div>
          <div
            class="flex items-center justify-center w-full py-2 hover:bg-gray-300"
            onClick={() => this.next.emit(this.identifier)}
          >
            Next
          </div>
        </div>
      </div>
    );
  }
}
