import { Component, State, Host, Listen, h } from "@stencil/core";

@Component({
  tag: "app-home",
  styleUrl: "../app-root/app-root.css"
})
export class AppHome {
  @State() orders: any[] = [];

  @State() inputValue: string = "";

  @Listen("back")
  back(event: CustomEvent) {
    const movedOrder = this.orders.find(order => order.index === event.detail);
    if (movedOrder.collumnId === 0) {
      return;
    }
    this.orders = [
      ...this.orders.filter(order => order.index !== event.detail),
      { name: movedOrder.name, collumnId: movedOrder.collumnId - 1, index: 0 }
    ];

    this.orders = this.orders.map((order, index) => {
      return { name: order.name, collumnId: order.collumnId, index: index };
    });
  }

  @Listen("next")
  next(event: CustomEvent) {
    const movedOrder = this.orders.find(order => order.index === event.detail);
    if (movedOrder.collumnId === 3) {
      return;
    }
    this.orders = [
      ...this.orders.filter(order => order.index !== event.detail),
      { name: movedOrder.name, collumnId: movedOrder.collumnId + 1, index: 0 }
    ];

    this.orders = this.orders.map((order, index) => {
      return { name: order.name, collumnId: order.collumnId, index: index };
    });
  }

  private handleInputChange(event) {
    this.inputValue = event.target.value;
  }

  private handleClick() {
    this.orders = [
      ...this.orders,
      {
        name: this.inputValue === "" ? "Vesuvio" : this.inputValue,
        collumnId: 0,
        index: this.orders.length
      }
    ];
    this.inputValue = "";
  }

  render() {
    const orders = this.orders.filter(order => order.collumnId === 0);
    const progress = this.orders.filter(order => order.collumnId === 1);
    const ready = this.orders.filter(order => order.collumnId === 2);
    const received = this.orders.filter(order => order.collumnId === 3);

    return (
      <Host class="flex font-sans mx-2 h-screen">
        <div class="flex-col w-1/4 h-full bg-gray-100 mx-2">
          <div class="flex items-center text-3xl font-bold justify-center shadow h-16 border-b mb-2">
            New Orders
          </div>
          <div class="flex flex-col">
            <input
              placeholder="Enter pizza name..."
              class="border-b shadow p-1 m-2"
              value={this.inputValue}
              onChange={event => this.handleInputChange(event)}
              type="text"
            />
            <div
              class="flex items-center text-2xl justify-center p-2 bg-gray-400 hover:bg-gray-300 cursor-pointer"
              onClick={() => this.handleClick()}
            >
              New Order
            </div>
          </div>
          {orders.map(order => {
            return <app-container name={order.name} identifier={order.index} />;
          })}
        </div>
        <div class="flex-col w-1/4 h-full bg-gray-100 mx-2">
          <div class="flex items-center text-3xl font-bold justify-center shadow h-16 border-b mb-2">
            In Progress
          </div>

          {progress.map(order => {
            return <app-container name={order.name} identifier={order.index} />;
          })}
        </div>
        <div class="flex-col w-1/4 h-full bg-gray-100 mx-2">
          <div class="flex items-center text-3xl font-bold justify-center shadow h-16 border-b mb-2">
            Ready To Serve
          </div>

          {ready.map(order => {
            return <app-container name={order.name} identifier={order.index} />;
          })}
        </div>
        <div class="flex flex-col w-1/4 h-full bg-gray-100 mx-2">
          <div class="flex items-center text-3xl font-bold justify-center shadow h-16 border-b mb-2">
            Completed
          </div>

          {received.map(order => {
            return <app-container name={order.name} identifier={order.index} />;
          })}
        </div>
      </Host>
    );
  }
}
