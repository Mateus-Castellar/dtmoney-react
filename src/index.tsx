import ReactDOM from "react-dom/client";
import { createServer, Model } from "miragejs";
import { App } from "./App";
import React from "react";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance WebSite",
          type: "deposit",
          category: "Desenvolvimento",
          amount: 6500,
          createdAt: new Date("2023-01-10 08:00:00"),
        },
        {
          id: 2,
          title: "Pagamento Aluguel",
          type: "withdraw",
          category: "Pagamento",
          amount: 935,
          createdAt: new Date("2023-01-05 08:00:00"),
        },
        {
          id: 3,
          title: "Venda periféricos usados",
          type: "deposit",
          category: "Venda",
          amount: 480,
          createdAt: new Date("2023-02-04 08:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create("transaction", data);
    });
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
